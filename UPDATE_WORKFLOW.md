# SOVA Assessment - Update Workflow
**How to Update the Interface When You Change the Excel File**

---

## Quick Start

When you update `Self Assessment Structure.xlsx`, run this ONE command:

```bash
cd /home/janek/sova-mvp
python3 regenerate-from-excel.py
```

That's it! All your changes will be in the interface.

---

## What Gets Updated Automatically

✅ **ALL Assessment Questions** (Solo & Team variants)
✅ **ALL Key Terms/Definitions**
✅ **ALL Resources**
✅ **ALL Tools/Frameworks (1-4)**
✅ **ALL Advice text**
✅ **ALL Article References**
✅ **ALL VC Requirements mapping**
✅ **ALL Books**
✅ **ALL Quotes (startup failure & best practice)**
✅ **ALL Hyperlinks** (embedded in Excel cells)

---

## Complete Workflow

### Step 1: Update Your Excel File
1. Open `/home/janek/inbox/Allivate/assessment-tool-rebuild/Self Assessment Structure.xlsx`
2. Make changes to the **Assessment Questions** tab:
   - Add new rows
   - Edit existing text
   - Update hyperlinks
   - Change any field
3. Save the file

### Step 2: Regenerate Interface Data
```bash
cd /home/janek/sova-mvp
python3 regenerate-from-excel.py
```

You'll see output like:
```
✅ Generated questions-data.js
✅ Total questions: 115
✅ Total hyperlinks: 461
✅ Question count matches expected (115)
✅ COMPLETE - File ready for use
```

### Step 3: Test Your Changes
```bash
# Start local server (if not already running)
python3 -m http.server 8000
```

Then open: **http://localhost:8000/index.html**

Do a hard refresh: **Ctrl+Shift+R** (or Cmd+Shift+R on Mac)

### Step 4: Verify Everything Works
- Navigate to the element/stage you changed
- Verify text appears correctly
- Click hyperlinks to verify they work
- Check all fields are populated

---

## What the Script Does

1. **Backs up** your current questions-data.js
   - Saved in `/home/janek/sova-mvp/backups/`
   - Timestamped filename

2. **Reads** ALL data from Excel
   - Every row in Assessment Questions tab
   - Every column (19 columns total)
   - Every embedded hyperlink

3. **Extracts** ALL hyperlinks
   - Tool/Framework links (1-4)
   - Resource links
   - Article links
   - VC requirements links
   - Quote links

4. **Generates** new questions-data.js
   - JSON format for fast loading
   - Preserves all data structure
   - Includes timestamp

5. **Validates** the output
   - Checks question count (should be 115)
   - Checks hyperlink count (should be 400+)
   - Reports any warnings

---

## Special Cases

### Adding a New Question
1. Add row in Excel
2. Fill in ALL relevant columns
3. Add hyperlinks where needed
4. Run `python3 regenerate-from-excel.py`
5. **If it's in Discovery/Validation/Efficiency:**
   - Update stage validation questions in `index.html`
   - See section below

### Updating Stage Validation Questions

If you add important questions to **Discovery**, **Validation**, or **Efficiency** stages, you may need to update the validation checks:

**Location:** `/home/janek/sova-mvp/index.html` around line 2897

```javascript
const validationQuestions = {
    'Validation': {
        heading: "Let's quickly check you've completed Discovery foundations",
        questions: [
            // Update these to match key Discovery questions
        ]
    },
    'Efficiency': {
        heading: "Let's quickly check you've completed Validation foundations",
        questions: [
            // Update these to match key Validation questions
        ]
    },
    'Scale': {
        heading: "Let's quickly check you've completed Efficiency foundations",
        questions: [
            // Update these to match key Efficiency questions
        ]
    }
};
```

### Changing Hyperlinks
- Update hyperlink in Excel (right-click cell → Hyperlink → Edit)
- Run regeneration script
- New hyperlink will be extracted automatically

### Deleting Questions
- Delete row from Excel
- Run regeneration script
- Question will be removed from interface
- **Note:** Update validation questions if you delete from Discovery/Validation/Efficiency

---

## Troubleshooting

### "Question count doesn't match"
- Check if you accidentally deleted rows
- Verify Excel has exactly 115 rows of data (after header)
- Check for empty rows

### "Hyperlinks not working"
- Verify hyperlink is set in Excel (cell should show as blue/underlined)
- Right-click cell → Hyperlink to check if link is present
- Re-run regeneration script

### "Changes don't appear in browser"
- Do a **hard refresh**: Ctrl+Shift+R (or Cmd+Shift+R)
- Clear browser cache
- Close browser completely and reopen
- Check console for errors (F12 → Console)

### "Script fails with error"
- Check Excel file path is correct
- Verify Excel file is not open in Excel (close it first)
- Check Python and openpyxl are installed:
  ```bash
  python3 -m pip install openpyxl pandas
  ```

---

## File Locations

**Excel Source:**
`/home/janek/inbox/Allivate/assessment-tool-rebuild/Self Assessment Structure.xlsx`

**Generated Output:**
`/home/janek/sova-mvp/questions-data.js`

**Regeneration Script:**
`/home/janek/sova-mvp/regenerate-from-excel.py`

**Backups:**
`/home/janek/sova-mvp/backups/questions-data-YYYYMMDD-HHMMSS.js`

**HTML Interface:**
`/home/janek/sova-mvp/index.html`

---

## Best Practices

✅ **Always run regeneration after Excel changes**
✅ **Test changes locally before deploying**
✅ **Keep backups** (script does this automatically)
✅ **Update validation questions** if adding to early stages
✅ **Use descriptive hyperlink text** in Excel
✅ **Fill in all relevant fields** (Advice, Key Terms, etc.)

---

## Quick Reference

| Task | Command |
|------|---------|
| Regenerate data | `python3 regenerate-from-excel.py` |
| Start test server | `python3 -m http.server 8000` |
| View backups | `ls backups/` |
| Test interface | `http://localhost:8000/index.html` |

---

**Last Updated:** 2025-11-21
**Maintained by:** Claude
**Questions?** Check the script output for detailed information
