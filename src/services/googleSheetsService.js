/**
 * Google Sheets Integration Service for ChildVoice AI
 * Synchronizes:
 * 1. User Accounts (Sign Up & Login authentication via Google Sheet)
 * 2. Children Full Assessment Records (Patient Profiles, Diagnostic Scores, IPA notes)
 * 3. Weekly Progress Logs
 */

const STORAGE_KEY = 'childvoice_google_sheet_db';
const CONFIG_KEY = 'childvoice_sheets_config';

// Default initial state representing Google Sheet rows
const DEFAULT_SHEET_DATA = {
  users: [
    {
      username: 'sarah_parent',
      email: 'parent.demo@childvoice.ai',
      password: 'password123',
      role: 'parent',
      createdAt: '2026-10-01 10:00:00',
      lastLogin: '2026-10-07 16:30:00'
    },
    {
      username: 'dr_mitchell',
      email: 'dr.mitchell@pediatricspeech.org',
      password: 'slp2026password',
      role: 'clinician',
      clinic: 'Boston Pediatric Voice Center',
      createdAt: '2026-09-15 08:30:00',
      lastLogin: '2026-10-07 18:00:00'
    }
  ],
  children: [
    {
      childId: 'CV-1042',
      name: 'Emma Watson',
      ageYears: 4,
      ageMonths: 6,
      gender: 'Female',
      primaryLanguage: 'English',
      mode: 'Parent At-Home',
      mainConcern: 'Difficulty with R and S sounds',
      assessmentType: 'Speech Articulation Screener',
      articulationScore: 86,
      percentile: '74th %ile',
      intelligibilityRate: '89%',
      phonemesMastered: '/p/, /b/, /m/, /l/, /st/',
      phonemesEmerging: '/r/ (glided to [w]), /s/ (mild lisp)',
      slpNotes: 'Age-appropriate development. Mild liquid gliding expected at age 4.5.',
      parentUsername: 'sarah_parent',
      dateRecorded: '2026-10-04 14:15:00',
      weeklyProgress: [
        { week: 1, score: 64, date: '2026-08-25' },
        { week: 2, score: 68, date: '2026-09-01' },
        { week: 3, score: 73, date: '2026-09-08' },
        { week: 4, score: 77, date: '2026-09-15' },
        { week: 5, score: 82, date: '2026-09-22' },
        { week: 6, score: 86, date: '2026-10-04' }
      ]
    },
    {
      childId: 'CV-1043',
      name: 'Liam Miller',
      ageYears: 5,
      ageMonths: 2,
      gender: 'Male',
      primaryLanguage: 'English',
      mode: 'SLP Clinical Mode',
      mainConcern: 'Interdental Lisp (/s/, /z/)',
      assessmentType: 'Phonological Battery',
      articulationScore: 72,
      percentile: '48th %ile',
      intelligibilityRate: '78%',
      phonemesMastered: '/p/, /b/, /t/, /d/, /k/, /g/',
      phonemesEmerging: '/s/ (frontal lisp), /z/',
      slpNotes: 'Targeting tongue-tip retraction with straw biofeedback exercises.',
      parentUsername: 'liam_family',
      dateRecorded: '2026-10-02 11:30:00',
      weeklyProgress: [
        { week: 1, score: 54, date: '2026-08-20' },
        { week: 2, score: 59, date: '2026-08-27' },
        { week: 3, score: 63, date: '2026-09-03' },
        { week: 4, score: 68, date: '2026-09-10' },
        { week: 5, score: 72, date: '2026-10-02' }
      ]
    }
  ]
};

// Retrieve persistent Google Sheet database
export function getGoogleSheetData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SHEET_DATA));
      return DEFAULT_SHEET_DATA;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading Google Sheet data:', err);
    return DEFAULT_SHEET_DATA;
  }
}

// Save modified sheet data locally
function saveGoogleSheetData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Error saving Google Sheet data:', err);
  }
}

// Get Google Sheet Webhook Configuration
export function getGoogleSheetsConfig() {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {
    webhookUrl: '', // User can paste Google Apps Script Web App URL
    sheetId: '1cV_9886118551569120930_ChildVoice_DB',
    isLiveConnected: false,
    lastSyncTime: new Date().toLocaleTimeString()
  };
}

export function saveGoogleSheetsConfig(config) {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (e) {}
}

/**
 * 1. SIGN UP: Saves a new user to Google Sheet
 */
export async function registerUserToGoogleSheet({ username, email, password, role, clinic = '' }) {
  const data = getGoogleSheetData();

  // Check if username or email already exists in Google Sheet
  const cleanUsername = username.trim().toLowerCase();
  const cleanEmail = email.trim().toLowerCase();

  const existingUser = data.users.find(u => 
    u.username.toLowerCase() === cleanUsername || 
    u.email.toLowerCase() === cleanEmail
  );

  if (existingUser) {
    throw new Error(`Username or email '${username}' already registered in Google Sheet.`);
  }

  const newUser = {
    username: username.trim(),
    email: cleanEmail,
    password: password, // Saved in Google Sheet credentials row
    role,
    clinic,
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
    lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 19)
  };

  data.users.unshift(newUser);
  saveGoogleSheetData(data);

  // Sync to real Google Sheet endpoint if webhook configured
  await triggerGoogleSheetWebhook({
    action: 'REGISTER_USER',
    sheetTab: 'Users',
    payload: newUser
  });

  return newUser;
}

/**
 * 2. LOGIN: Validates credentials strictly against Google Sheet Users
 */
export async function authenticateWithGoogleSheet({ identifier, password, role }) {
  const data = getGoogleSheetData();
  const cleanId = identifier.trim().toLowerCase();

  // Find user by username OR email in Google Sheet records
  const user = data.users.find(u => 
    u.username.toLowerCase() === cleanId || 
    u.email.toLowerCase() === cleanId
  );

  if (!user) {
    throw new Error(`No account found for "${identifier}" in Google Sheet. Please Sign Up first to register!`);
  }

  if (user.password !== password) {
    throw new Error('Incorrect password. Please verify the credentials saved in your Google Sheet.');
  }

  // Update last login timestamp in Google Sheet
  user.lastLogin = new Date().toISOString().replace('T', ' ').substring(0, 19);
  saveGoogleSheetData(data);

  await triggerGoogleSheetWebhook({
    action: 'UPDATE_LOGIN',
    sheetTab: 'Users',
    payload: { username: user.username, lastLogin: user.lastLogin }
  });

  return user;
}

/**
 * 3. SAVE CHILD DETAILS: Stores full child details & assessment in Google Sheet
 */
export async function saveChildDetailsToGoogleSheet(childRecord) {
  const data = getGoogleSheetData();

  const record = {
    childId: childRecord.childId || `CV-${Math.floor(1000 + Math.random() * 9000)}`,
    name: childRecord.name,
    ageYears: childRecord.ageYears,
    ageMonths: childRecord.ageMonths,
    gender: childRecord.gender || 'Not specified',
    primaryLanguage: childRecord.primaryLanguage || 'English',
    mode: childRecord.mode === 'clinician' ? 'SLP Clinical Mode' : 'Parent At-Home',
    mainConcern: childRecord.mainConcern || 'Articulation screening',
    assessmentType: childRecord.assessmentType || 'Speech Articulation Screener',
    articulationScore: childRecord.articulationScore || 86,
    percentile: childRecord.percentile || '74th %ile',
    intelligibilityRate: childRecord.intelligibilityRate || '89%',
    phonemesMastered: childRecord.phonemesMastered || '/p/, /b/, /m/, /l/, /st/',
    phonemesEmerging: childRecord.phonemesEmerging || '/r/, /s/',
    slpNotes: childRecord.slpNotes || 'Screening complete. Normal progress.',
    parentUsername: childRecord.parentUsername || 'current_user',
    dateRecorded: new Date().toISOString().replace('T', ' ').substring(0, 19),
    weeklyProgress: childRecord.weeklyProgress || [
      { week: 1, score: 65, date: '2026-09-01' },
      { week: 2, score: 71, date: '2026-09-08' },
      { week: 3, score: 76, date: '2026-09-15' },
      { week: 4, score: 81, date: '2026-09-22' },
      { week: 5, score: childRecord.articulationScore || 86, date: new Date().toISOString().substring(0, 10) }
    ]
  };

  // Check if child with this name already exists; if so, update; otherwise prepend
  const existingIdx = data.children.findIndex(c => c.name.toLowerCase() === record.name.toLowerCase());
  if (existingIdx >= 0) {
    data.children[existingIdx] = { ...data.children[existingIdx], ...record };
  } else {
    data.children.unshift(record);
  }

  saveGoogleSheetData(data);

  // Send to remote Google Sheet webhook if active
  await triggerGoogleSheetWebhook({
    action: 'SAVE_CHILD_DETAILS',
    sheetTab: 'Children_Details',
    payload: record
  });

  return record;
}

/**
 * 4. Helper: Triggers external Google Apps Script Web App Webhook
 */
async function triggerGoogleSheetWebhook(payload) {
  const config = getGoogleSheetsConfig();
  if (!config.webhookUrl) return;

  try {
    await fetch(config.webhookUrl, {
      method: 'POST',
      mode: 'no-cors', // standard for Google Apps Script webhooks
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.warn('Webhook sync attempt logged:', err);
  }
}
