/**
 * ChildVoice AI — Google Apps Script for Google Sheets
 * Project ID: 9886118551569120930
 * 
 * INSTRUCTIONS TO CONNECT YOUR REAL GOOGLE SHEET:
 * 1. Open Google Sheets at https://sheets.google.com and create a new sheet.
 * 2. Click Extensions > Apps Script.
 * 3. Delete any code in the editor and paste THIS ENTIRE FILE.
 * 4. Click 'Deploy' > 'New deployment'.
 * 5. Select type 'Web app'.
 * 6. Set 'Execute as' = 'Me' and 'Who has access' = 'Anyone'.
 * 7. Click Deploy, copy the Web App URL, and paste it into ChildVoice AI's "Google Sheet Sync" settings!
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var action = data.action;
    var sheetTab = data.sheetTab || 'Users';
    var payload = data.payload;

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetTab);

    // Auto-create sheet tab if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(sheetTab);
      setupSheetHeaders(sheet, sheetTab);
    }

    if (action === 'REGISTER_USER') {
      sheet.appendRow([
        payload.username,
        payload.email,
        payload.password,
        payload.role,
        payload.clinic || 'N/A',
        payload.createdAt,
        payload.lastLogin
      ]);
    } else if (action === 'SAVE_CHILD_DETAILS') {
      sheet.appendRow([
        payload.childId,
        payload.name,
        payload.ageYears + 'y ' + payload.ageMonths + 'm',
        payload.gender,
        payload.primaryLanguage,
        payload.mode,
        payload.mainConcern,
        payload.assessmentType,
        payload.articulationScore,
        payload.percentile,
        payload.intelligibilityRate,
        payload.phonemesMastered,
        payload.phonemesEmerging,
        payload.slpNotes,
        payload.dateRecorded
      ]);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function setupSheetHeaders(sheet, sheetTab) {
  if (sheetTab === 'Users') {
    sheet.appendRow(['Username', 'Email', 'Password', 'Role', 'Clinic', 'Created_At', 'Last_Login']);
    sheet.getRange(1, 1, 1, 7).setBackground('#2563EB').setFontColor('#FFFFFF').setFontWeight('bold');
  } else if (sheetTab === 'Children_Details') {
    sheet.appendRow([
      'Child_ID', 'Child_Name', 'Age', 'Gender', 'Primary_Language', 
      'Assessment_Mode', 'Main_Concern', 'Assessment_Type', 
      'Articulation_Score', 'Percentile', 'Intelligibility_Rate', 
      'Phonemes_Mastered', 'Phonemes_Emerging', 'SLP_Notes', 'Date_Recorded'
    ]);
    sheet.getRange(1, 1, 1, 15).setBackground('#0D9488').setFontColor('#FFFFFF').setFontWeight('bold');
  }
}
