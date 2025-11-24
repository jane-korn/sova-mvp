# SOVA UAT Survey - Google Sheets Setup Instructions

## Overview
This setup allows your HTML survey to submit responses directly to a Google Sheet, bypassing Google Forms entirely. You get full control over the data and can create custom trend analysis.

## What You'll Have
- Raw survey responses in Google Sheets (one row per submission)
- Full access to create charts, pivot tables, and trend analysis
- Individual response viewing
- Exportable data (CSV, Excel, etc.)

---

## Setup Steps (10 minutes)

### Step 1: Create a New Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Rename it to "SOVA UAT Survey Responses" (click on "Untitled spreadsheet" at the top)

### Step 2: Add the Apps Script Backend
1. In your Google Sheet, go to **Extensions > Apps Script**
2. You'll see a code editor with a default `function myFunction() {}`
3. **Delete all the default code**
4. Open the file `google-apps-script-backend.js` (in the same folder as this file)
5. **Copy ALL the code** from that file
6. **Paste it** into the Apps Script editor (replacing everything)
7. Click the **Save** icon (disk icon) or press `Ctrl+S` / `Cmd+S`
8. Rename the project to "SOVA Survey Backend" (click "Untitled project" at the top)

### Step 3: Deploy as Web App
1. In the Apps Script editor, click **Deploy > New deployment**
2. Click the gear icon next to "Select type" and choose **Web app**
3. Fill in the deployment settings:
   - **Description**: "SOVA UAT Survey Backend"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click **Deploy**
5. You may need to authorise the script:
   - Click **Authorise access**
   - Choose your Google account
   - Click **Advanced** (if you see a warning)
   - Click **Go to SOVA Survey Backend (unsafe)** (it's safe - it's your own script)
   - Click **Allow**
6. **Copy the Web App URL** - it will look like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```
   **Keep this URL - you'll need it in the next step**

### Step 4: Connect the HTML Survey to Your Sheet
1. Open the file `sova-uat-survey.html` in a text editor
2. Find this line (around line 526):
   ```javascript
   const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE'` with the URL you copied in Step 3
4. It should look like:
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```
5. **Save the file**

### Step 5: Test It!
1. Open `sova-uat-survey.html` in a web browser
2. Fill out the survey with test data
3. Click **Submit Feedback**
4. Go back to your Google Sheet
5. You should see:
   - Headers in row 1 (with yellow background and brown text)
   - Your test response in row 2

**If it worked**: Congratulations! Your survey is now live and collecting data.

**If it didn't work**: See the Troubleshooting section below.

---

## How to Use Your Response Data

### Viewing Individual Responses
- Each row in the sheet is one complete survey response
- Scroll through rows to see individual submissions
- Use filters to find specific responses (Data > Create a filter)

### Creating Trend Analysis

#### Example 1: Chart showing Q1 responses
1. Select columns B (Q1 responses)
2. Click **Insert > Chart**
3. Choose **Pie chart** or **Bar chart**
4. This shows distribution of "Strongly Agree", "Agree", etc.

#### Example 2: Willingness to Pay Analysis
1. Select column L (Q6: Willingness to pay)
2. Insert chart as above
3. Visualise pricing preferences

#### Example 3: Recommendation Score Over Time
1. Select columns A (Timestamp) and K (Q5: Would recommend)
2. Insert a **Line chart** or **Timeline**
3. See how recommendations trend over time

### Using Pivot Tables for Advanced Analysis
1. Select all your data (click cell A1, then Ctrl+Shift+End)
2. Go to **Insert > Pivot table**
3. Example: Cross-reference Q5 (recommendation) with Q6 (willingness to pay)
   - Add Q5 to Rows
   - Add Q6 to Columns
   - Add Timestamp to Values (COUNTA)

### Exporting Data
- **File > Download > Microsoft Excel (.xlsx)**
- **File > Download > Comma Separated Values (.csv)**

---

## Making the Survey Public

### Option 1: Simple File Hosting (Quick)
1. Upload `sova-uat-survey.html` to a hosting service:
   - **Netlify Drop**: [https://app.netlify.com/drop](https://app.netlify.com/drop) (drag & drop, instant URL)
   - **GitHub Pages**: Create a repo, upload the file, enable Pages
   - **Google Drive**: Upload, right-click > Share > Get link (must open in browser)

### Option 2: Custom Domain
- Use Netlify, Vercel, or your own hosting
- Point your domain to the hosted HTML file

---

## Troubleshooting

### Test responses aren't appearing in the sheet
1. Check the browser console (F12 > Console tab) for errors
2. Verify the SCRIPT_URL in the HTML file is correct
3. Make sure you deployed the Apps Script as "Anyone" can access
4. Try re-deploying the Apps Script (Deploy > Manage deployments > Edit > New version)

### "Authorization required" error
- You need to authorise the script (see Step 3, point 5)
- The script needs permission to write to your Sheet

### Responses are delayed
- Google Apps Script can take 1-2 seconds to process
- Refresh your Sheet to see new responses

### I need to modify the questions
1. Edit the HTML file question text
2. If you change question field names (q1, q2, etc.), update the Apps Script backend to match
3. Re-deploy the Apps Script

### I want to add more questions
1. Add them to the HTML
2. Update the Apps Script `headers` array and `row` array to include new fields
3. Re-deploy

---

## Data Privacy Note
- Responses are stored in YOUR Google Sheet
- Only people with access to your Google Sheet can see responses
- The survey itself (HTML file) collects no data unless connected to your Sheet
- Share the Sheet carefully - anyone with edit access can modify/delete responses

---

## Next Steps

Once you have responses:
1. Review individual feedback
2. Create visualisations for trends
3. Export data for presentations or reports
4. Share read-only access with stakeholders (Share > Viewer)

---

## Need Help?
If you encounter issues:
1. Check the browser console for JavaScript errors
2. Check the Apps Script execution log (Apps Script editor > Executions)
3. Verify all URLs are correctly pasted
4. Test with the Apps Script URL directly in browser (should show "ready" status)
