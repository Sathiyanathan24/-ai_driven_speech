import React, { useState } from 'react';
import { 
  Sparkles, 
  Mic, 
  Heart, 
  Stethoscope, 
  Cpu, 
  BookOpen, 
  Info, 
  User, 
  Menu, 
  X,
  Volume2
} from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, openAuthModal, openContactModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'assessment', label: 'Take Assessment', icon: Mic, highlight: true },
    { id: 'parents', label: 'For Parents', icon: Heart },
    { id: 'clinicians', label: 'For Clinicians', icon: Stethoscope },
    { id: 'technology', label: 'AI Model & Tech', icon: Cpu },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'about', label: 'About', icon: Info },
  ];

  const handleNavClick = (viewId) => {
    setCurrentView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-wrapper">
      <div className="container">
        <nav className="navbar">
          {/* Brand Logo */}
          <div className="nav-brand" onClick={() => handleNavClick('home')}>
            <div className="brand-icon-box">
              <Mic size={24} />
            </div>
            <div>
              <div className="brand-text-title">ChildVoice <span style={{ color: 'var(--primary)' }}>AI</span></div>
              <div className="brand-text-subtitle">Pediatric Speech Diagnostics</div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <ul className="nav-links">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <li key={item.id}>
                  <button
                    className={`nav-item-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                    style={item.highlight && !isActive ? { color: 'var(--primary)', fontWeight: 700 } : {}}
                  >
                    <Icon size={16} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Action CTAs */}
          <div className="nav-actions">
            <button 
              className="btn-outline" 
              style={{ padding: '8px 16px', fontSize: '13.5px' }}
              onClick={openAuthModal}
            >
              <User size={15} />
              Portal Login
            </button>
            <button 
              className="btn-primary" 
              style={{ padding: '9px 18px', fontSize: '14px', borderRadius: 'var(--radius-full)' }}
              onClick={() => handleNavClick('assessment')}
            >
              <Mic size={15} />
              Start Screening
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px',
                color: 'var(--text-main)',
              }}
              className="mobile-toggle"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div style={{
            padding: '16px 0 24px',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  className={`nav-item-btn ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                  style={{ width: '100%', justifyContent: 'flex-start', padding: '12px 16px' }}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
              <button 
                className="btn-outline" 
                style={{ flex: 1, padding: '10px' }}
                onClick={() => { setMobileMenuOpen(false); openAuthModal(); }}
              >
                Portal Login
              </button>
              <button 
                className="btn-primary" 
                style={{ flex: 1, padding: '10px' }}
                onClick={() => handleNavClick('assessment')}
              >
                Screen Now
              </button>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .nav-links { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
