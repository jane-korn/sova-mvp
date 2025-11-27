#!/usr/bin/env python3
"""
SOVA Assessment - Excel to Interface Regeneration Script
========================================================

This script automatically regenerates questions-data.js from the Excel file.
Run this EVERY TIME you update Self Assessment Structure.xlsx

Usage:
    python3 regenerate-from-excel.py

What it does:
1. Reads ALL data from Assessment Questions tab
2. Extracts ALL embedded hyperlinks
3. Generates questions-data.js with complete data
4. Validates all 115 questions are present
5. Counts and reports hyperlinks extracted
6. Creates backup of old file

Author: Claude
Last Updated: 2025-11-21
"""

import openpyxl
import json
import shutil
from datetime import datetime
from pathlib import Path

# Configuration
EXCEL_PATH = '/home/janek/sova-mvp/Self Assessment Structure - Master.xlsx'
OUTPUT_PATH = 'questions-data.js'
BACKUP_DIR = 'backups'
EXPECTED_QUESTIONS = 113  # Updated from 115 after row removals

def main():
    print("=" * 80)
    print("SOVA ASSESSMENT - EXCEL TO INTERFACE REGENERATION")
    print("=" * 80)
    print(f"\nStarting at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

    # Create backup directory if it doesn't exist
    Path(BACKUP_DIR).mkdir(exist_ok=True)

    # Backup existing questions-data.js
    if Path(OUTPUT_PATH).exists():
        backup_path = f"{BACKUP_DIR}/questions-data-{datetime.now().strftime('%Y%m%d-%H%M%S')}.js"
        shutil.copy2(OUTPUT_PATH, backup_path)
        print(f"✅ Backed up existing file to: {backup_path}")

    # Load Excel
    print(f"\n📖 Reading Excel file: {EXCEL_PATH}")
    wb = openpyxl.load_workbook(EXCEL_PATH)
    sheet = wb['Assessment Questions']

    # Get headers from first row
    headers = []
    for cell in sheet[1]:
        headers.append(cell.value)

    print(f"✅ Found {len(headers)} columns")

    # Build questions data structure
    questions_by_element = {}
    question_count = 0
    hyperlink_count = 0

    # Process each row (starting from row 2)
    for row_idx, row in enumerate(sheet.iter_rows(min_row=2, values_only=False), start=2):
        # Get cell values and hyperlinks
        row_data = {}
        for col_idx, cell in enumerate(row):
            header = headers[col_idx]
            row_data[header] = {
                'value': cell.value,
                'hyperlink': cell.hyperlink.target if cell.hyperlink else None
            }

            # Count hyperlinks
            if cell.hyperlink:
                hyperlink_count += 1

        element = row_data['Element']['value']
        stage = row_data['Stage']['value']

        if not element or not stage:
            continue

        if element not in questions_by_element:
            questions_by_element[element] = {}

        if stage not in questions_by_element[element]:
            questions_by_element[element][stage] = []

        # Build question object with ALL fields
        question = {
            'Element': element,
            'Stage': stage,
            'Solo': row_data['Solo']['value'] if row_data['Solo']['value'] else None,
            'Team': row_data['Team']['value'] if row_data['Team']['value'] else None,
            'Key Terms Defined': row_data['Key Terms Defined']['value'] if row_data['Key Terms Defined']['value'] else None,
            'Resources': row_data['Resources']['value'] if row_data['Resources']['value'] else None,
            'Tool/Framework 1': row_data['Tool/Framework 1']['value'] if row_data['Tool/Framework 1']['value'] else None,
            'Tool/Framework 2': row_data['Tool/Framework 2']['value'] if row_data['Tool/Framework 2']['value'] else None,
            'Tool/Framework 3': row_data['Tool/Framework 3']['value'] if row_data['Tool/Framework 3']['value'] else None,
            'Tool/Framework 4': row_data['Tool/Framework 4']['value'] if row_data['Tool/Framework 4']['value'] else None,
            'Tool/Framework 5': row_data['Tool/Framework 5']['value'] if row_data.get('Tool/Framework 5') and row_data['Tool/Framework 5']['value'] else None,
            'Tool/Framework 6': row_data['Tool/Framework 6']['value'] if row_data.get('Tool/Framework 6') and row_data['Tool/Framework 6']['value'] else None,
            'Advice': row_data['Advice']['value'] if row_data['Advice']['value'] else None,
            'Article References': row_data['Article References']['value'] if row_data['Article References']['value'] else None,
            'Other Articles': row_data['Other Articles']['value'] if row_data['Other Articles']['value'] else None,
            'VC requirements mapping': row_data['VC requirements mapping']['value'] if row_data['VC requirements mapping']['value'] else None,
            'Book': row_data['Book']['value'] if row_data['Book']['value'] else None,
            'Quote (startup failure)': row_data['Quote (startup failure)']['value'] if row_data['Quote (startup failure)']['value'] else None,
            'Quote (startup failure) 2': row_data['Quote (startup failure) 2']['value'] if row_data['Quote (startup failure) 2']['value'] else None,
            'Quote (best practice)': row_data['Quote (best practice)']['value'] if row_data['Quote (best practice)']['value'] else None,
            'Quote (best practice) 2': row_data['Quote (best practice) 2']['value'] if row_data['Quote (best practice) 2']['value'] else None,
        }

        # Add ALL hyperlinks
        question['Tool/Framework 1Link'] = row_data['Tool/Framework 1']['hyperlink']
        question['Tool/Framework 2Link'] = row_data['Tool/Framework 2']['hyperlink']
        question['Tool/Framework 3Link'] = row_data['Tool/Framework 3']['hyperlink']
        question['Tool/Framework 4Link'] = row_data['Tool/Framework 4']['hyperlink']
        question['Tool/Framework 5Link'] = row_data['Tool/Framework 5']['hyperlink'] if row_data.get('Tool/Framework 5') else None
        question['Tool/Framework 6Link'] = row_data['Tool/Framework 6']['hyperlink'] if row_data.get('Tool/Framework 6') else None
        question['ResourcesLink'] = row_data['Resources']['hyperlink']
        question['VC requirements mappingLink'] = row_data['VC requirements mapping']['hyperlink']
        question['Quote (startup failure)Link'] = row_data['Quote (startup failure)']['hyperlink']
        question['Quote (startup failure) 2Link'] = row_data['Quote (startup failure) 2']['hyperlink']
        question['Quote (best practice)Link'] = row_data['Quote (best practice)']['hyperlink']
        question['Quote (best practice) 2Link'] = row_data['Quote (best practice) 2']['hyperlink']

        questions_by_element[element][stage].append(question)
        question_count += 1

    # Generate JavaScript file with timestamp
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    js_content = f"""// Assessment questions data - Generated from Self Assessment Structure.xlsx
// Organized by Element and Stage for efficient lookups
// Total questions: {question_count}
// Last updated: {timestamp}
// Hyperlinks extracted: {hyperlink_count}

var allQuestionsData = {json.dumps(questions_by_element, indent=2, ensure_ascii=False)};
"""

    # Write to file
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        f.write(js_content)

    print(f"\n✅ Generated {OUTPUT_PATH}")
    print(f"✅ Total questions: {question_count}")
    print(f"✅ Total elements: {len(questions_by_element)}")
    print(f"✅ Total hyperlinks: {hyperlink_count}")

    # Show breakdown
    print(f"\n📊 Breakdown by Element:")
    for element in sorted(questions_by_element.keys()):
        total = sum(len(questions_by_element[element][stage]) for stage in questions_by_element[element])
        print(f"   {element}: {total} questions")

    # Validation
    print(f"\n🔍 VALIDATION:")
    if question_count == EXPECTED_QUESTIONS:
        print(f"   ✅ Question count matches expected ({EXPECTED_QUESTIONS})")
    else:
        print(f"   ⚠️  WARNING: Expected {EXPECTED_QUESTIONS} questions, found {question_count}")

    if hyperlink_count > 400:
        print(f"   ✅ Hyperlinks extracted ({hyperlink_count} total)")
    else:
        print(f"   ⚠️  WARNING: Low hyperlink count ({hyperlink_count})")

    print(f"\n✅ COMPLETE - File ready for use")
    print(f"\nNext steps:")
    print(f"   1. Refresh your browser (Ctrl+Shift+R)")
    print(f"   2. Test the assessment")
    print(f"   3. Verify new/updated questions appear")
    print("=" * 80)

if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        import traceback
        traceback.print_exc()
        exit(1)
