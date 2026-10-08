import React, { useState } from 'react';
import { 
  Sparkles, 
  Mic, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle, 
  Volume2, 
  Play, 
  Award, 
  Heart, 
  Users, 
  Activity, 
  Zap, 
  FileSpreadsheet, 
  ChevronRight,
  Smile,
  Star
} from 'lucide-react';

export default function Home({ onStartAssessment, setCurrentView }) {
  const [activeAnimalSound, setActiveAnimalSound] = useState(null);
  const [selectedAudience, setSelectedAudience] = useState('parent'); // 'parent' | 'clinician'

  const animalPrompts = [
    {
      id: 'lion',
      name: 'Leo the Lion',
      target: '/l/ Sound',
      phrase: 'Look at the lovely yellow lion!',
      icon: '🦁',
      color: '#f59e0b',
      soundKey: 'Leo says: Look at the lovely yellow lion! Roar!'
    },
    {
      id: 'rabbit',
      name: 'Rosie the Rabbit',
      target: '/r/ Sound',
      phrase: 'Rosie the red rabbit runs really fast!',
      icon: '🐰',
      color: '#ec4899',
      soundKey: 'Rosie says: Rosie the red rabbit runs really fast! Hop hop!'
    },
    {
      id: 'sun',
      name: 'Sunny the Sun',
      target: '/s/ Sound',
      phrase: 'Super sunny sunshine smiles softly!',
      icon: '☀️',
      color: '#3b82f6',
      soundKey: 'Sunny says: Super sunny sunshine smiles softly! Sssss!'
    },
    {
      id: 'bear',
      name: 'Benny the Bear',
      target: '/b/ Sound',
      phrase: 'Big brave brown bear bounces blue balls!',
      icon: '🐻',
      color: '#8b5cf6',
      soundKey: 'Benny says: Big brave brown bear bounces blue balls! Boing!'
    }
  ];

  const playAnimalSound = (animal) => {
    setActiveAnimalSound(animal.id);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(animal.soundKey);
      utterance.pitch = 1.3;
      utterance.rate = 0.9;
      utterance.onend = () => setActiveAnimalSound(null);
      utterance.onerror = () => setActiveAnimalSound(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setActiveAnimalSound(null), 2500);
    }
  };

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            {/* Left Content */}
            <div>
              <div className="badge-pill badge-primary animate-float" style={{ marginBottom: '16px' }}>
                <Sparkles size={16} />
                <span>Next-Gen Pediatric Speech Pathology AI</span>
              </div>

              <h1 className="hero-headline">
                Gentle, Playful Voice Assessments Built for <span className="gradient-text">Little Voices</span>.
              </h1>

              <p className="hero-description">
                Clinically validated speech screening combining delightful child-friendly phoneme games with neural acoustic modeling. Empowering parents with clear developmental milestones and speech therapists with objective data.
              </p>

              <div className="hero-cta-group">
                <button 
                  className="btn-kid" 
                  onClick={onStartAssessment}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}
                >
                  <Mic size={20} />
                  Start Free Assessment
                  <ArrowRight size={18} />
                </button>
                <button 
                  className="btn-secondary" 
                  onClick={() => {
                    const el = document.getElementById('playground-section');
                    el && el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Volume2 size={18} />
                  Try Sound Playground
                </button>
              </div>

              {/* Trust Metric Counters */}
              <div className="hero-metrics-bar">
                <div className="metric-item">
                  <span className="metric-number">98.4%</span>
                  <span className="metric-label">Phoneme Alignment Accuracy</span>
                </div>
                <div className="metric-item">
                  <span className="metric-number">3 Min</span>
                  <span className="metric-label">Rapid Screening Flow</span>
                </div>
                <div className="metric-item">
                  <span className="metric-number">45k+</span>
                  <span className="metric-label">Pediatric Audio Samples</span>
                </div>
                <div className="metric-item">
                  <span className="metric-number">100%</span>
                  <span className="metric-label">COPPA / HIPAA Compliant</span>
                </div>
              </div>
            </div>

            {/* Right Visual with AI Generated Child & Floating Interactive Chips */}
            <div className="hero-visual-card">
              <div className="hero-image-wrap">
                <img 
                  src="/images/hero_child.jpg" 
                  alt="Child practicing speech with colorful headphones and microphone" 
                  className="hero-img"
                />
              </div>

              {/* Floating Real-Time Phoneme Chips */}
              <div className="floating-chip chip-1">
                <div style={{ background: '#ecfdf5', color: '#065f46', borderRadius: '50%', padding: '6px' }}>
                  <CheckCircle size={16} />
                </div>
                <div>
                  <div style={{ color: '#0f172a' }}>/r/ Target: Rabbit</div>
                  <div style={{ fontSize: '11px', color: '#10b981' }}>96% Phonetic Mastery</div>
                </div>
              </div>

              <div className="floating-chip chip-2">
                <div style={{ background: '#eff6ff', color: 'var(--primary)', borderRadius: '50%', padding: '6px' }}>
                  <Activity size={16} />
                </div>
                <div>
                  <div style={{ color: '#0f172a' }}>Formant Tracking</div>
                  <div style={{ fontSize: '11px', color: 'var(--primary)' }}>F1: 420Hz • F2: 1850Hz</div>
                </div>
              </div>

              <div className="floating-chip chip-3">
                <div style={{ background: '#fef3c7', color: '#92400e', borderRadius: '50%', padding: '6px' }}>
                  <Star size={16} />
                </div>
                <div>
                  <div style={{ color: '#0f172a' }}>Age Cohort 4.5y</div>
                  <div style={{ fontSize: '11px', color: '#b45309' }}>88th Percentile Intelligibility</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE SOUND PLAYGROUND (CHILD ATTRACTION) */}
      <section id="playground-section" style={{ padding: '70px 0', background: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px' }}>
            <span className="badge-pill badge-tertiary" style={{ marginBottom: '12px' }}>
              <Smile size={16} /> Interactive Speech Playground
            </span>
            <h2 style={{ fontSize: '36px', fontWeight: 800 }}>
              Tap an Animal Friend to Hear Speech Sounds!
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginTop: '10px' }}>
              Children love listening and repeating after playful animal companions. Tap any card below to listen to real speech targets synthesized for little learners:
            </p>
          </div>

          <div className="sound-explorer-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Volume2 size={24} color="var(--primary)" />
                <span style={{ fontWeight: 700, fontSize: '18px' }}>Audio Stimulus & Phoneme Practice</span>
              </div>
              <span style={{ fontSize: '13px', background: '#ffffff', padding: '6px 14px', borderRadius: '9999px', fontWeight: 600, color: 'var(--text-muted)', border: '1px solid #bfdbfe' }}>
                🔊 Click any animal card to hear it aloud
              </span>
            </div>

            <div className="animal-sound-grid">
              {animalPrompts.map((animal) => {
                const isPlaying = activeAnimalSound === animal.id;
                return (
                  <button
                    key={animal.id}
                    className={`animal-sound-btn ${isPlaying ? 'playing' : ''}`}
                    onClick={() => playAnimalSound(animal)}
                  >
                    <div style={{ fontSize: '48px', lineHeight: 1 }}>{animal.icon}</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '18px', color: 'var(--text-main)' }}>
                        {animal.name}
                      </div>
                      <div style={{ 
                        fontSize: '13px', 
                        fontWeight: 700, 
                        color: animal.color,
                        background: '#f8fafc',
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        display: 'inline-block',
                        marginTop: '4px'
                      }}>
                        {animal.target}
                      </div>
                    </div>

                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '6px 0' }}>
                      "{animal.phrase}"
                    </p>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: isPlaying ? '#059669' : 'var(--primary)',
                      marginTop: 'auto'
                    }}>
                      {isPlaying ? (
                        <>
                          <div className="sound-bars-wrap">
                            <span className="sound-bar" style={{ background: '#10b981' }}></span>
                            <span className="sound-bar" style={{ background: '#10b981' }}></span>
                            <span className="sound-bar" style={{ background: '#10b981' }}></span>
                          </div>
                          Speaking...
                        </>
                      ) : (
                        <>
                          <Play size={14} fill="var(--primary)" /> Click to Play
                        </>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div style={{ textAlign: 'center', marginTop: '28px' }}>
              <button 
                className="btn-primary" 
                onClick={onStartAssessment}
                style={{ padding: '14px 28px', fontSize: '16px', borderRadius: 'var(--radius-full)' }}
              >
                <Mic size={18} /> Test Your Child's Pronunciation Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DUAL AUDIENCE VALUE PROPOSITION */}
      <section style={{ padding: '80px 0', background: 'var(--bg-main)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 40px' }}>
            <span className="badge-pill badge-primary" style={{ marginBottom: '12px' }}>
              Designed For Both Caregivers & Clinicians
            </span>
            <h2 style={{ fontSize: '36px', fontWeight: 800 }}>
              Clinical Rigor Meets Parental Warmth
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginTop: '10px' }}>
              Choose your perspective to see how ChildVoice AI provides tailored diagnostic clarity.
            </p>

            {/* Switcher Toggle */}
            <div style={{
              display: 'inline-flex',
              background: '#e2e8f0',
              padding: '4px',
              borderRadius: '9999px',
              marginTop: '20px'
            }}>
              <button
                onClick={() => setSelectedAudience('parent')}
                style={{
                  padding: '10px 24px',
                  borderRadius: '9999px',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  background: selectedAudience === 'parent' ? '#ffffff' : 'transparent',
                  color: selectedAudience === 'parent' ? 'var(--primary)' : 'var(--text-muted)',
                  boxShadow: selectedAudience === 'parent' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Heart size={16} /> For Loving Parents
              </button>
              <button
                onClick={() => setSelectedAudience('clinician')}
                style={{
                  padding: '10px 24px',
                  borderRadius: '9999px',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  background: selectedAudience === 'clinician' ? '#ffffff' : 'transparent',
                  color: selectedAudience === 'clinician' ? 'var(--primary)' : 'var(--text-muted)',
                  boxShadow: selectedAudience === 'clinician' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Award size={16} /> For Speech Pathologists (SLPs)
              </button>
            </div>
          </div>

          {/* Dynamic Content Based on Audience */}
          {selectedAudience === 'parent' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
              <div className="glass-card" style={{ padding: '32px' }}>
                <div style={{ background: '#eff6ff', color: 'var(--primary)', width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Smile size={26} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '10px' }}>Zero-Stress Screenings at Home</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: 1.6 }}>
                  No intimidating clinical doctor appointments. Your child plays with cute animal flashcards and talks naturally into a phone or computer microphone.
                </p>
                <ul style={{ marginTop: '16px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={16} color="#10b981" /> Completed in under 3 minutes
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={16} color="#10b981" /> No complex jargon — easy-to-read reports
                  </li>
                </ul>
              </div>

              <div className="glass-card" style={{ padding: '32px' }}>
                <div style={{ background: '#f0fdfa', color: 'var(--tertiary-mint)', width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Heart size={26} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '10px' }}>Age-Matched Developmental Clarity</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: 1.6 }}>
                  Find out immediately whether a sound substitution (like saying "wabbit" instead of "rabbit") is developmentally typical for your child's exact age.
                </p>
                <ul style={{ marginTop: '16px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={16} color="#10b981" /> Clear percentile benchmark compared to peers
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={16} color="#10b981" /> Red flag indicators on when to see an SLP
                  </li>
                </ul>
              </div>

              <div className="glass-card" style={{ padding: '32px' }}>
                <div style={{ background: '#fef3c7', color: '#b45309', width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Sparkles size={26} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '10px' }}>Playful Daily Speech Routines</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: 1.6 }}>
                  Receive custom games, fun tongue exercises, and bedtime story prompts created by speech therapists specifically for your child's speech goals.
                </p>
                <ul style={{ marginTop: '16px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={16} color="#10b981" /> 5-minute everyday routines
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={16} color="#10b981" /> Printable animal flashcards & reward stickers
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
              <div className="glass-card" style={{ padding: '32px' }}>
                <div style={{ background: '#eff6ff', color: 'var(--primary)', width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Activity size={26} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '10px' }}>Objective IPA Phoneme Alignment</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: 1.6 }}>
                  Automate phonetic transcription. Our Wav2Vec-Peds model tracks acoustic formants (F1-F4), sound omissions, distortions, and lateral lisp patterns with millisecond timestamps.
                </p>
                <ul style={{ marginTop: '16px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={16} color="#10b981" /> 98.4% alignment with GFTA-3 clinical scoring
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={16} color="#10b981" /> Eliminates manual scoring transcription time
                  </li>
                </ul>
              </div>

              <div className="glass-card" style={{ padding: '32px' }}>
                <div style={{ background: '#f0fdfa', color: 'var(--tertiary-mint)', width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <FileSpreadsheet size={26} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '10px' }}>Caseload & EHR Integration</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: 1.6 }}>
                  Manage multiple pediatric patients across clinics and schools. Generate structured clinical progress notes with automatic CPT code recommendations (92523, 92507).
                </p>
                <ul style={{ marginTop: '16px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={16} color="#10b981" /> PDF clinical report export in one click
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={16} color="#10b981" /> Longitudinal treatment tracking charts
                  </li>
                </ul>
              </div>

              <div className="glass-card" style={{ padding: '32px' }}>
                <div style={{ background: '#f5f3ff', color: '#7c3aed', width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <ShieldCheck size={26} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '10px' }}>HIPAA & BAA Secured Pipeline</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: 1.6 }}>
                  Built from the ground up for strict healthcare compliance. All pediatric audio packets undergo edge anonymization and de-identification.
                </p>
                <ul style={{ marginTop: '16px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={16} color="#10b981" /> Signed Business Associate Agreements (BAA)
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={16} color="#10b981" /> School district FERPA certified
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. CLINICAL PHOTO SHOWCASE & HOW IT WORKS */}
      <section style={{ padding: '80px 0', background: '#ffffff', borderTop: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'center' }}>
            <div>
              <span className="badge-pill badge-primary" style={{ marginBottom: '12px' }}>
                Evidence-Based Workflow
              </span>
              <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '16px' }}>
                4 Simple Steps from First Sound to Personalized Plan
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '28px' }}>
                How ChildVoice AI turns a playful 3-minute recording into medical-grade speech pathology insights:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                    1
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700 }}>Choose Child Age & Assessment Mode</h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Select from Articulation, Phonological processing, or Early Word screening.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#0284c7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                    2
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700 }}>Interactive Voice Game Prompts</h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Child speaks words prompted by friendly animal flashcards with live mic feedback.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--tertiary-mint)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                    3
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700 }}>AI Neural Phoneme Alignment</h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Acoustic model extracts formant frequencies and calculates developmental percentiles.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                    4
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700 }}>Results, Diagnostic Insights & Home Games</h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Get actionable therapy exercises, sound mastery scorecards, and printable PDF reports.</p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '32px' }}>
                <button className="btn-primary" onClick={onStartAssessment}>
                  Start Step 1 Now <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Clinician & Child Photo Card */}
            <div>
              <div style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '4px solid #ffffff'
              }}>
                <img 
                  src="/images/clinician_pediatric.jpg" 
                  alt="Speech therapist evaluating young girl with tablet and speech cards" 
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div style={{ 
                marginTop: '16px', 
                background: '#f8fbff', 
                padding: '16px 20px', 
                borderRadius: 'var(--radius-md)', 
                border: '1px solid #bfdbfe',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{ background: '#2563eb', color: '#fff', padding: '8px', borderRadius: '10px' }}>
                  <Award size={20} />
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <strong>Clinically Reviewed:</strong> Designed in collaboration with certified speech-language pathologists (CCC-SLP) across top pediatric hospitals.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MASCOT ECHO BANNER CTA */}
      <section style={{ padding: '70px 0', background: 'linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%)', color: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }}>
            <div>
              <span style={{ 
                background: 'rgba(255, 255, 255, 0.2)', 
                color: '#ffffff', 
                padding: '6px 14px', 
                borderRadius: '9999px', 
                fontSize: '13px', 
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '16px'
              }}>
                <Star size={14} /> Meet Echo, Your Child's Speech Buddy!
              </span>
              <h2 style={{ fontSize: '38px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, marginBottom: '16px' }}>
                Ready to Hear What Your Child's Voice Can Do?
              </h2>
              <p style={{ fontSize: '17px', color: '#e0f2fe', lineHeight: 1.6, marginBottom: '28px' }}>
                Join thousands of families and clinicians transforming speech development with fun, clinically validated voice screenings. No credit card required.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button 
                  onClick={onStartAssessment}
                  style={{
                    background: '#ffffff',
                    color: 'var(--primary)',
                    padding: '14px 28px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '16px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontFamily: 'var(--font-family-kids)'
                  }}
                >
                  <Mic size={20} /> Begin Voice Screening
                </button>
                <button 
                  onClick={() => setCurrentView('parents')}
                  style={{
                    background: 'transparent',
                    border: '2px solid rgba(255,255,255,0.7)',
                    color: '#ffffff',
                    padding: '12px 24px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  View Milestones Guide
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: '280px',
                height: '280px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50%',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                border: '2px solid rgba(255,255,255,0.3)'
              }}>
                <img 
                  src="/images/mascot_echo.jpg" 
                  alt="Echo friendly speech robot mascot" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
