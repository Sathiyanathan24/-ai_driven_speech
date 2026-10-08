import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Award, 
  Heart, 
  Mic, 
  Mail, 
  ArrowRight,
  Phone,
  FileText
} from 'lucide-react';

export default function Footer({ setCurrentView, openContactModal }) {
  return (
    <footer style={{ background: '#0f172a', color: '#f8fafc', paddingTop: '70px', paddingBottom: '30px' }}>
      <div className="container">
        {/* Compliance & Trust Badges Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          paddingBottom: '50px',
          borderBottom: '1px solid #1e293b',
          marginBottom: '50px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ background: 'rgba(37, 99, 235, 0.2)', padding: '12px', borderRadius: '12px', color: '#60a5fa' }}>
              <ShieldCheck size={28} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px' }}>HIPAA & COPPA Compliant</div>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>Child voice data encrypted & anonymized</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ background: 'rgba(13, 148, 136, 0.2)', padding: '12px', borderRadius: '12px', color: '#2dd4bf' }}>
              <Award size={28} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px' }}>ASHA Normative Standards</div>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>Aligned with Gold standard clinical protocols</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '12px', borderRadius: '12px', color: '#fbbf24' }}>
              <Lock size={28} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px' }}>Zero-Audio Retention</div>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>Processed on edge with neural anonymization</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.2)', padding: '12px', borderRadius: '12px', color: '#f87171' }}>
              <Heart size={28} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px' }}>Pediatric Gentle Care</div>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>Stress-free gamified audio testing</div>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Col 1: About Platform */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #2563eb, #38bdf8)',
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>
                <Mic size={20} />
              </div>
              <span style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-family-kids)' }}>
                ChildVoice <span style={{ color: '#60a5fa' }}>AI</span>
              </span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
              The clinically-validated pediatric speech assessment platform providing early speech screening, phonological acoustic modeling, and personalized therapy routines for kids aged 2–10.
            </p>
            <div style={{ fontSize: '13px', color: '#cbd5e1' }}>
              Project ID: <code style={{ color: '#60a5fa', background: '#1e293b', padding: '2px 8px', borderRadius: '4px' }}>9886118551569120930</code>
            </div>
          </div>

          {/* Col 2: Clinical & Parents Navigation */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.04em' }}>Explore Solutions</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li>
                <a href="#assessment" onClick={(e) => { e.preventDefault(); setCurrentView('assessment'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#94a3b8'}>
                  Child Speech Screening
                </a>
              </li>
              <li>
                <a href="#parents" onClick={(e) => { e.preventDefault(); setCurrentView('parents'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#94a3b8'}>
                  Parents Milestone Guide
                </a>
              </li>
              <li>
                <a href="#clinicians" onClick={(e) => { e.preventDefault(); setCurrentView('clinicians'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#94a3b8'}>
                  SLP Clinician Caseload Portal
                </a>
              </li>
              <li>
                <a href="#technology" onClick={(e) => { e.preventDefault(); setCurrentView('technology'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#94a3b8'}>
                  Acoustic Neural Architecture
                </a>
              </li>
              <li>
                <a href="#resources" onClick={(e) => { e.preventDefault(); setCurrentView('resources'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#94a3b8'}>
                  Free Speech Therapy Worksheets
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Clinical Trust */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.04em' }}>Clinical Partners</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px', color: '#94a3b8' }}>
              <li>Boston Children's Speech Lab</li>
              <li>Stanford Pediatric Audiology</li>
              <li>Johns Hopkins Communication Sciences</li>
              <li>National Speech Pathology Institute</li>
              <li>Goldman-Fristoe Correlation Study</li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Contact */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: 700, marginBottom: '16px' }}>Stay In The Loop</h4>
            <p style={{ color: '#94a3b8', fontSize: '13.5px', marginBottom: '14px' }}>
              Get monthly evidence-based pediatric speech developmental guides and fun play tips.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <input 
                type="email" 
                placeholder="parent or clinician email" 
                style={{
                  background: '#1e293b',
                  border: '1px solid #334155',
                  color: '#fff',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '13.5px',
                  flex: 1,
                  outline: 'none'
                }}
              />
              <button 
                className="btn-primary" 
                style={{ padding: '10px 16px', fontSize: '13.5px' }}
                onClick={() => alert("Thank you! You're subscribed to ChildVoice AI updates.")}
              >
                <ArrowRight size={16} />
              </button>
            </div>
            <button 
              className="btn-outline" 
              style={{ width: '100%', borderColor: '#334155', color: '#cbd5e1', fontSize: '13.5px' }}
              onClick={openContactModal}
            >
              <Mail size={14} /> Request School / Clinic Pilot
            </button>
          </div>
        </div>

        {/* Bottom Legal & Disclaimer */}
        <div style={{
          borderTop: '1px solid #1e293b',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '13px',
          color: '#64748b'
        }}>
          <div>
            © 2026 ChildVoice AI Platform. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>HIPAA Notice</span>
            <span>COPPA Parental Consent</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
