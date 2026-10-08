import React, { useState, useEffect } from 'react';
import { 
  X, 
  Table, 
  Users, 
  FileSpreadsheet, 
  ExternalLink, 
  Copy, 
  Check, 
  RefreshCw, 
  Save, 
  Download,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { 
  getGoogleSheetData, 
  getGoogleSheetsConfig, 
  saveGoogleSheetsConfig 
} from '../services/googleSheetsService';

export default function GoogleSheetModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('children'); // 'children' | 'users' | 'setup'
  const [sheetData, setSheetData] = useState({ users: [], children: [] });
  const [config, setConfig] = useState({ webhookUrl: '', sheetId: '' });
  const [copiedScript, setCopiedScript] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSheetData(getGoogleSheetData());
      setConfig(getGoogleSheetsConfig());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveConfig = () => {
    saveGoogleSheetsConfig({
      ...config,
      isLiveConnected: !!config.webhookUrl,
      lastSyncTime: new Date().toLocaleTimeString()
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const copyScriptCode = () => {
    fetch('/google_apps_script.js')
      .then(res => res.text())
      .then(code => {
        navigator.clipboard.writeText(code);
        setCopiedScript(true);
        setTimeout(() => setCopiedScript(false), 2500);
      });
  };

  const exportCsv = (type) => {
    const data = getGoogleSheetData();
    let csvContent = "data:text/csv;charset=utf-8,";

    if (type === 'users') {
      csvContent += "Username,Email,Password,Role,Created_At,Last_Login\n";
      data.users.forEach(u => {
        csvContent += `"${u.username}","${u.email}","${u.password}","${u.role}","${u.createdAt}","${u.lastLogin || ''}"\n`;
      });
    } else {
      csvContent += "Child_ID,Name,Age,Gender,Mode,Concern,Score,Intelligibility,Phonemes_Mastered,Date\n";
      data.children.forEach(c => {
        csvContent += `"${c.childId}","${c.name}","${c.ageYears}y ${c.ageMonths}m","${c.gender}","${c.mode}","${c.mainConcern}","${c.articulationScore}","${c.intelligibilityRate}","${c.phonemesMastered}","${c.dateRecorded}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `google_sheet_${type}_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '860px', padding: '32px' }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#64748b'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{
            background: '#10b981',
            color: '#fff',
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FileSpreadsheet size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Google Sheets Data Center</h2>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Real-time persistent synchronization for Children Details & Authentication credentials
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid var(--border-light)',
          paddingBottom: '12px',
          marginBottom: '20px'
        }}>
          <button
            onClick={() => setActiveTab('children')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 700,
              fontSize: '13.5px',
              cursor: 'pointer',
              background: activeTab === 'children' ? '#eff6ff' : 'transparent',
              color: activeTab === 'children' ? 'var(--primary)' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Table size={15} /> Children Details Sheet ({sheetData.children.length})
          </button>

          <button
            onClick={() => setActiveTab('users')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 700,
              fontSize: '13.5px',
              cursor: 'pointer',
              background: activeTab === 'users' ? '#eff6ff' : 'transparent',
              color: activeTab === 'users' ? 'var(--primary)' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Users size={15} /> Users & Auth Sheet ({sheetData.users.length})
          </button>

          <button
            onClick={() => setActiveTab('setup')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 700,
              fontSize: '13.5px',
              cursor: 'pointer',
              background: activeTab === 'setup' ? '#eff6ff' : 'transparent',
              color: activeTab === 'setup' ? 'var(--primary)' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginLeft: 'auto'
            }}
          >
            <ExternalLink size={15} /> Webhook & Live Connection
          </button>
        </div>

        {/* TAB 1: CHILDREN DETAILS SHEET */}
        {activeTab === 'children' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Showing all children whose full records are saved in the Google Sheet.
              </span>
              <button 
                className="btn-outline" 
                style={{ padding: '6px 12px', fontSize: '12px' }}
                onClick={() => exportCsv('children')}
              >
                <Download size={13} /> Export Sheet to CSV
              </button>
            </div>

            <div style={{ maxHeight: '380px', overflowY: 'auto', border: '1px solid var(--border-light)', borderRadius: '10px' }}>
              <table className="data-table" style={{ fontSize: '13px' }}>
                <thead>
                  <tr>
                    <th>Child ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Score</th>
                    <th>Intelligibility</th>
                    <th>Phonemes Mastered</th>
                    <th>Date Saved</th>
                  </tr>
                </thead>
                <tbody>
                  {sheetData.children.map((child, cIdx) => (
                    <tr key={cIdx}>
                      <td><code style={{ color: 'var(--primary)', fontWeight: 700 }}>{child.childId}</code></td>
                      <td><strong>{child.name}</strong></td>
                      <td>{child.ageYears}y {child.ageMonths}m</td>
                      <td><span style={{ fontWeight: 800, color: 'var(--primary)' }}>{child.articulationScore}/100</span></td>
                      <td>{child.intelligibilityRate}</td>
                      <td><span style={{ fontSize: '12px', color: '#059669' }}>{child.phonemesMastered}</span></td>
                      <td style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{child.dateRecorded}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: USERS & AUTH SHEET */}
        {activeTab === 'users' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Usernames & Passwords saved in the Google Sheet. Login validates against these rows!
              </span>
              <button 
                className="btn-outline" 
                style={{ padding: '6px 12px', fontSize: '12px' }}
                onClick={() => exportCsv('users')}
              >
                <Download size={13} /> Export Users to CSV
              </button>
            </div>

            <div style={{ maxHeight: '380px', overflowY: 'auto', border: '1px solid var(--border-light)', borderRadius: '10px' }}>
              <table className="data-table" style={{ fontSize: '13px' }}>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Password in Sheet</th>
                    <th>Role</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {sheetData.users.map((usr, uIdx) => (
                    <tr key={uIdx}>
                      <td><strong>{usr.username}</strong></td>
                      <td>{usr.email}</td>
                      <td>
                        <code style={{ background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', color: '#b45309' }}>
                          {usr.password}
                        </code>
                      </td>
                      <td>
                        <span className={`badge-pill ${usr.role === 'clinician' ? 'badge-primary' : 'badge-tertiary'}`}>
                          {usr.role}
                        </span>
                      </td>
                      <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{usr.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: SETUP & WEBHOOK CONFIGURATION */}
        {activeTab === 'setup' && (
          <div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '8px' }}>
                Connect Your Personal Google Sheet (Optional)
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                Paste your deployed Google Apps Script Web App URL below to automatically append new signups and assessments directly into your real live Google Spreadsheet!
              </p>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                <input 
                  type="text" 
                  placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                  value={config.webhookUrl}
                  onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13.5px',
                    outline: 'none'
                  }}
                />
                <button 
                  className="btn-primary" 
                  onClick={handleSaveConfig}
                  style={{ padding: '10px 20px', fontSize: '13.5px' }}
                >
                  <Save size={15} /> Save Webhook URL
                </button>
              </div>

              {saveSuccess && (
                <div style={{ color: '#059669', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={16} /> Google Sheet Webhook URL saved successfully!
                </div>
              )}
            </div>

            <div style={{ border: '1px solid var(--border-light)', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700 }}>Google Apps Script Copy-Paste Code</h4>
                <button 
                  className="btn-secondary" 
                  style={{ padding: '6px 14px', fontSize: '12.5px' }}
                  onClick={copyScriptCode}
                >
                  {copiedScript ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                  {copiedScript ? 'Copied to Clipboard!' : 'Copy Script Code'}
                </button>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                In Google Sheets, go to <strong>Extensions &gt; Apps Script</strong>, paste this code, and click <strong>Deploy &gt; New deployment (Web app)</strong>.
              </p>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-light)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#10b981', fontWeight: 700 }}>
            <ShieldCheck size={16} /> Live Persistent Storage Active
          </div>
          <button className="btn-outline" onClick={onClose} style={{ padding: '8px 20px' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
