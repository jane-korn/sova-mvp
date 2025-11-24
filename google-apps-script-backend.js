/**
 * Google Apps Script Backend for SOVA UAT Survey
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Delete any code in Code.gs and paste this entire file
 * 4. Click Deploy > New deployment
 * 5. Select type: Web app
 * 6. Execute as: Me
 * 7. Who has access: Anyone
 * 8. Click Deploy and copy the Web App URL
 * 9. Paste that URL into the HTML file where indicated
 */

function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);

    // Check if this is the first submission (no headers yet)
    if (sheet.getLastRow() === 0) {
      // Create headers
      const headers = [
        'Timestamp',
        'Q1: Understood what Sova does',
        'Q1: Follow-up',
        'Q2: Assessment questions relevant',
        'Q2: Follow-up',
        'Q3: Gap analysis identified weaknesses',
        'Q3: Follow-up',
        'Q4: Would take action',
        'Q4: Follow-up',
        'Q5: Would recommend Sova',
        'Q5: Follow-up',
        'Q6: Willingness to pay',
        'Q6: Follow-up',
        'Q7: Technical problems',
        'Q7: Follow-up',
        'Q8: What liked most',
        'Q9: What would make more valuable',
        'Respondent Name'
      ];
      sheet.appendRow(headers);

      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#C4FF00');
      headerRange.setFontColor('#3D2517');
    }

    // Prepare the row data
    const row = [
      data.timestamp || new Date().toISOString(),
      data.q1 || '',
      data.q1_followup || '',
      data.q2 || '',
      data.q2_followup || '',
      data.q3 || '',
      data.q3_followup || '',
      data.q4 || '',
      data.q4_followup || '',
      data.q5 || '',
      data.q5_followup || '',
      data.q6 || '',
      data.q6_followup || '',
      data.q7 || '',
      data.q7_followup || '',
      data.q8 || '',
      data.q9 || '',
      data.respondent_name || 'Anonymous'
    ];

    // Append the row to the sheet
    sheet.appendRow(row);

    // Auto-resize columns for better readability (only on first few submissions)
    if (sheet.getLastRow() <= 5) {
      sheet.autoResizeColumns(1, row.length);
    }

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Response recorded successfully',
        row: sheet.getLastRow()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: GET endpoint to verify the script is working
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ready',
      message: 'SOVA UAT Survey backend is operational',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
