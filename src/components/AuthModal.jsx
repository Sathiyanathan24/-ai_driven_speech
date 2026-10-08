import React, { useState } from 'react';
import { 
  X, 
  User, 
  Lock, 
  Mail, 
  Building, 
  Stethoscope, 
  Heart, 
  CheckCircle2, 
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import { 
  registerUserToGoogleSheet, 
  authenticateWithGoogleSheet,
  getGoogleSheetData
} from '../services/googleSheetsService';

export default function AuthModal({ isOpen, onClose, onLoginSuccess, openGoogleSheetModal }) {
  const [role, setRole] = useState('parent'); // 'parent' | 'clinician'
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      if (isSignUp) {
        // 1. Sign Up: Save into Google Sheet Users Table
        const user = await registerUserToGoogleSheet({
          username: username.trim(),
          email: email.trim(),
          password,
          role,
          clinic: clinicName
        });

        setSuccessMsg(`Account created & saved in Google Sheet! Welcome, @${user.username}`);
        setTimeout(() => {
          setIsLoading(false);
          onLoginSuccess && onLoginSuccess(user.role, user);
          onClose();
        }, 1200);
      } else {
        // 2. Login: Validate credentials directly from Google Sheet Users Table
        const user = await authenticateWithGoogleSheet({
          identifier: username || email,
          password,
          role
        });

        setSuccessMsg(`Google Sheet Verified: Welcome back, @${user.username}!`);
        setTimeout(() => {
          setIsLoading(false);
          onLoginSuccess && onLoginSuccess(user.role, user);
          onClose();
        }, 1200);
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMsg(err.message || 'Authentication error with Google Sheet.');
    }
  };

  const handleQuickDemo = (demoRole) => {
    setErrorMsg('');
    const sheetData = getGoogleSheetData();
    const demoUser = sheetData.users.find(u => u.role === demoRole) || sheetData.users[0];

    if (demoUser) {
      setRole(demoUser.role);
      setUsername(demoUser.username);
      setEmail(demoUser.email);
      setPassword(demoUser.password);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '36px' }}>
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
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '54px',
            height: '54px',
            borderRadius: '16px',
            background: role === 'parent' ? '#eff6ff' : '#f0fdfa',
            color: role === 'parent' ? 'var(--primary)' : 'var(--tertiary-mint)',
            marginBottom: '10px'
          }}>
            {role === 'parent' ? <Heart size={26} /> : <Stethoscope size={26} />}
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 800 }}>
            {isSignUp ? 'Sign Up (Saved to Google Sheet)' : 'Login with Google Sheet Credentials'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', marginTop: '4px' }}>
            {isSignUp 
              ? 'Your username & password will be stored in the Google Sheet'
              : 'Verifies username & password directly from the Google Sheet'}
          </p>
        </div>

        {/* Google Sheet Sync Indicator Pill */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          padding: '8px 14px',
          borderRadius: '10px',
          marginBottom: '18px',
          fontSize: '12.5px'
        }}>
          <span style={{ color: '#166534', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileSpreadsheet size={15} color="#15803d" /> Google Sheet Database Active
          </span>
          <button
            type="button"
            onClick={() => {
              onClose();
              openGoogleSheetModal && openGoogleSheetModal();
            }}
            style={{
              background: '#ffffff',
              border: '1px solid #86efac',
              color: '#15803d',
              fontWeight: 700,
              borderRadius: '6px',
              padding: '3px 10px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            View Sheet Data
          </button>
        </div>

        {/* Role Toggle Selector */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          background: '#f1f5f9',
          padding: '4px',
          borderRadius: '12px',
          marginBottom: '20px'
        }}>
          <button
            type="button"
            onClick={() => setRole('parent')}
            style={{
              padding: '9px 14px',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '13.5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: role === 'parent' ? '#ffffff' : 'transparent',
              color: role === 'parent' ? 'var(--primary)' : 'var(--text-muted)',
              boxShadow: role === 'parent' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <Heart size={15} /> Parent / Family
          </button>
          <button
            type="button"
            onClick={() => setRole('clinician')}
            style={{
              padding: '9px 14px',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '13.5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: role === 'clinician' ? '#ffffff' : 'transparent',
              color: role === 'clinician' ? 'var(--primary)' : 'var(--text-muted)',
              boxShadow: role === 'clinician' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <Stethoscope size={15} /> SLP / Clinician
          </button>
        </div>

        {/* Demo Credential Quick-Fill */}
        {!isSignUp && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#f8fafc',
            border: '1px dashed #cbd5e1',
            padding: '7px 12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '12px'
          }}>
            <span style={{ color: '#64748b' }}>Test with Google Sheet accounts:</span>
            <button
              type="button"
              onClick={() => handleQuickDemo(role)}
              style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                color: 'var(--primary)',
                fontWeight: 700,
                borderRadius: '6px',
                padding: '3px 8px',
                cursor: 'pointer',
                fontSize: '11.5px'
              }}
            >
              Autofill {role === 'parent' ? 'sarah_parent' : 'dr_mitchell'}
            </button>
          </div>
        )}

        {/* Feedback Messages */}
        {errorMsg && (
          <div style={{
            background: '#fef2f2',
            color: '#b91c1c',
            border: '1px solid #fecaca',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 600,
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={16} /> {errorMsg}
          </div>
        )}

        {successMsg && (
          <div style={{
            background: 'var(--success-bg)',
            color: '#065f46',
            border: '1px solid var(--success-border)',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 600,
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle2 size={16} /> {successMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '5px' }}>
              {isSignUp ? 'Choose Username' : 'Username or Email (as saved in Google Sheet)'}
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
              <input 
                type="text" 
                required
                placeholder={isSignUp ? "e.g. emma_mom" : "Username or email"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 36px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {isSignUp && (
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '5px' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          )}

          {role === 'clinician' && isSignUp && (
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '5px' }}>Clinic / Hospital Affiliation</label>
              <div style={{ position: 'relative' }}>
                <Building size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  placeholder="e.g. Children's Speech Health Center"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '5px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
              <input 
                type="password" 
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 36px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isLoading}
            style={{ width: '100%', marginTop: '6px', padding: '11px', fontSize: '14.5px' }}
          >
            {isLoading 
              ? 'Verifying with Google Sheet...' 
              : isSignUp 
                ? 'Sign Up & Save to Google Sheet' 
                : 'Login with Google Sheet'}
          </button>
        </form>

        {/* Footer Toggle */}
        <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '13px', color: '#64748b' }}>
          {isSignUp ? 'Already registered in the Google Sheet? ' : "Not registered in the Google Sheet yet? "}
          <button 
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMsg('');
              setSuccessMsg('');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary)',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {isSignUp ? 'Login Here' : 'Sign Up to Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
