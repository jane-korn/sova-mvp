/**
 * Sova Chat API Proxy
 * Copyright (c) 2025 Sova Pty Ltd. All Rights Reserved.
 * PROPRIETARY AND CONFIDENTIAL
 */

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map();
const RATE_LIMIT = 20; // requests per window
const RATE_WINDOW = 60000; // 1 minute in ms

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.windowStart > RATE_WINDOW) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

exports.handler = async (event) => {
  // Get client IP for rate limiting
  const clientIP = event.headers['x-forwarded-for']?.split(',')[0] ||
                   event.headers['client-ip'] ||
                   'unknown';

  // CORS headers - restrict to your domains
  const headers = {
    'Access-Control-Allow-Origin': '*', // TODO: Change to your domain in production
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Check rate limit
  if (!checkRateLimit(clientIP)) {
    console.log(`Rate limit exceeded for IP: ${clientIP}`);
    return {
      statusCode: 429,
      headers,
      body: JSON.stringify({
        error: 'Too many requests. Please wait a minute and try again.',
        retryAfter: 60
      })
    };
  }

  try {
    const { contents, generationConfig } = JSON.parse(event.body);

    // Basic input validation
    if (!contents || !Array.isArray(contents)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid request format' })
      };
    }

    // Limit message size to prevent abuse
    const requestSize = JSON.stringify(contents).length;
    if (requestSize > 50000) { // 50KB limit
      return {
        statusCode: 413,
        headers,
        body: JSON.stringify({ error: 'Request too large' })
      };
    }

    // API key stored as environment variable in Netlify
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('GEMINI_API_KEY not configured');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Service configuration error' })
      };
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents, generationConfig })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API error:', data.error?.message);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: data.error?.message || 'API error' })
      };
    }

    // Log successful request (without sensitive data)
    console.log(`Chat request from ${clientIP} - Success`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('Server error:', error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server error. Please try again.' })
    };
  }
};
