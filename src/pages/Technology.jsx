import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Database, 
  Activity, 
  Sliders, 
  CheckCircle2, 
  Zap, 
  ArrowRight,
  GitBranch,
  Lock
} from 'lucide-react';

export default function Technology({ onStartAssessment }) {
  const [interactiveVocalAge, setInteractiveVocalAge] = useState(4);

  // Formant shift calculations based on child vocal tract length
  const f0 = Math.round(350 - (interactiveVocalAge - 2) * 20); // 250 - 350 Hz
  const f1 = Math.round(850 - (interactiveVocalAge - 2) * 35); // 700 - 850 Hz
  const f2 = Math.round(2400 - (interactiveVocalAge - 2) * 80); // 1900 - 2400 Hz

  return (
    <div style={{ padding: '60px 0 90px', background: 'var(--bg-main)' }}>
      <div className="container">
        {/* Title */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
          <span className="badge-pill badge-primary" style={{ marginBottom: '12px' }}>
            <Cpu size={16} /> Neural Architecture & Pediatric Acoustic Science
          </span>
          <h1 style={{ fontSize: '40px', fontWeight: 800 }}>
            Why Standard Voice AI Fails on Children — And How We Solved It
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '17px', marginTop: '14px', lineHeight: 1.6 }}>
            Commercial voice engines (Siri, Alexa, Whisper) are trained on 98% adult voices. A child's vocal tract length is 40% shorter, causing standard speech recognizers to misdiagnose typical pediatric speech.
          </p>
        </div>

        {/* 3 Core Scientific Differences Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '60px' }}>
          <div className="glass-card" style={{ padding: '32px' }}>
            <div style={{ background: '#eff6ff', color: 'var(--primary)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Activity size={24} />
            </div>
            <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '8px' }}>Elevated Fundamental Pitch (F0)</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
              A 4-year-old child speaks with an average fundamental frequency of <strong>280 – 380 Hz</strong>, compared to 110 Hz for adult males. Adult models confuse high harmonics with formant resonances.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '32px' }}>
            <div style={{ background: '#f0fdfa', color: 'var(--tertiary-mint)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Layers size={24} />
            </div>
            <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '8px' }}>Acoustic Formant Up-Shifts</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
              Due to anatomical physical constraints (palate geometry and tongue volume), child vowel formants (F1, F2, F3) are shifted upward by <strong>20% to 35%</strong> across all vowels.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '32px' }}>
            <div style={{ background: '#fef3c7', color: '#b45309', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Sliders size={24} />
            </div>
            <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '8px' }}>High Motoric Coarticulation</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
              Developing neuromuscular coordination introduces natural temporal variability, prolonged transitional durations, and burst delays that adult models falsely flag as stuttering or dysarthria.
            </p>
          </div>
        </div>

        {/* Interactive Pediatric Formant Simulator */}
        <div className="glass-card" style={{ padding: '40px', marginBottom: '60px', background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '28px' }}>
            <div>
              <span className="badge-pill badge-primary" style={{ marginBottom: '8px' }}>Interactive Acoustic Sandbox</span>
              <h2 style={{ fontSize: '26px', fontWeight: 800 }}>Explore Vocal Tract Acoustics by Child Age</h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700 }}>Simulate Child Age:</span>
              <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary)', background: '#fff', padding: '6px 16px', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                {interactiveVocalAge} Years Old
              </span>
            </div>
          </div>

          {/* Age Slider */}
          <div style={{ marginBottom: '32px' }}>
            <input 
              type="range" 
              min="2" 
              max="10" 
              value={interactiveVocalAge} 
              onChange={(e) => setInteractiveVocalAge(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--primary)', height: '8px', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
              <span>2 Years (Toddler)</span>
              <span>4 Years (Preschool)</span>
              <span>6 Years (Kindergarten)</span>
              <span>8 Years (Early Elementary)</span>
              <span>10 Years (Pre-Adolescent)</span>
            </div>
          </div>

          {/* Formant Frequency Visualizer Readout */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
            <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>FUNDAMENTAL PITCH (F0)</div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--primary)', margin: '4px 0' }}>{f0} Hz</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Adult benchmark: ~120 Hz (Male) / ~210 Hz (Female)</div>
            </div>

            <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>FIRST FORMANT (F1 - JAW OPENING)</div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--tertiary-mint)', margin: '4px 0' }}>{f1} Hz</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Calibrated for vowel /æ/ ("cat")</div>
            </div>

            <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>SECOND FORMANT (F2 - TONGUE POSITION)</div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#8b5cf6', margin: '4px 0' }}>{f2} Hz</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Distinguishes front vs back vowels</div>
            </div>
          </div>
        </div>

        {/* Wav2Vec-Peds Model Deep Dive */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
          <div>
            <span className="badge-pill badge-primary" style={{ marginBottom: '10px' }}>Proprietary Neural Model</span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '16px' }}>
              Wav2Vec-Peds: Built for Developmental Phonetics
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15.5px', lineHeight: 1.6, marginBottom: '20px' }}>
              Our model architecture integrates self-supervised acoustic representation learning with a connectionist temporal classification (CTC) head fine-tuned on 45,000+ clinician-annotated pediatric speech sessions.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '14.5px', color: 'var(--text-main)' }}>
                  <strong>Pediatric Multi-Band Filterbank:</strong> Normalized across non-linear vocal tract lengths from ages 2.0 to 10.0.
                </span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '14.5px', color: 'var(--text-main)' }}>
                  <strong>GFTA-3 Correlation:</strong> Strong Pearson correlation (r = 0.94) against standard Goldman-Fristoe clinical scoring.
                </span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '14.5px', color: 'var(--text-main)' }}>
                  <strong>Inference Speed &lt; 500ms:</strong> Lightweight on-device quantization allows instant results on any tablet or smartphone.
                </span>
              </div>
            </div>

            <div style={{ marginTop: '28px' }}>
              <button className="btn-primary" onClick={onStartAssessment}>
                Experience the Model Live <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Privacy & Compliance Architecture Card */}
          <div className="glass-card" style={{ padding: '36px', background: '#0f172a', color: '#f8fafc' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <Lock size={22} color="#38bdf8" />
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>Zero-Retention Privacy Pipeline</h3>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>
              Children's voice data requires the highest ethical and regulatory scrutiny. ChildVoice AI enforces strict privacy primitives:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ borderLeft: '3px solid #38bdf8', paddingLeft: '14px' }}>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#e0f2fe' }}>No Permanent Audio Storage</div>
                <div style={{ fontSize: '12.5px', color: '#94a3b8' }}>Voice stream is converted into anonymous acoustic vectors in RAM and erased immediately.</div>
              </div>

              <div style={{ borderLeft: '3px solid #10b981', paddingLeft: '14px' }}>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#e0f2fe' }}>COPPA & FERPA Certified</div>
                <div style={{ fontSize: '12.5px', color: '#94a3b8' }}>Full parental consent mechanisms with compliant data destruction pipelines for school districts.</div>
              </div>

              <div style={{ borderLeft: '3px solid #f59e0b', paddingLeft: '14px' }}>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#e0f2fe' }}>End-to-End TLS 1.3 Encryption</div>
                <div style={{ fontSize: '12.5px', color: '#94a3b8' }}>Bank-grade encryption in transit with zero third-party telemetry or ad-tracking scripts.</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
