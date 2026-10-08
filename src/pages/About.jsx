import React from 'react';
import { 
  Heart, 
  Award, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  Building, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function About({ onStartAssessment, openContactModal }) {
  const leadership = [
    {
      name: 'Dr. Sarah Mitchell, PhD, CCC-SLP',
      role: 'Chief Clinical Officer & Co-Founder',
      affiliation: 'Former Lead Speech Pathologist, Boston Children’s Hospital',
      bio: '20+ years of clinical pediatric voice research, specializing in early phonological disorders and bilingual speech acquisition.'
    },
    {
      name: 'Dr. David K. Levin, PhD',
      role: 'Head of Pediatric Acoustic AI',
      affiliation: 'Ex-Speech Lab Fellow, Stanford AI Institute',
      bio: 'Pioneer in deep neural self-supervised representations for non-stationary pediatric acoustic signals and formant tracking.'
    },
    {
      name: 'Elena Rostova, MS, CCC-SLP',
      role: 'Director of Clinical Partnerships',
      affiliation: 'Speech Pathology Clinical Supervisor, ASHA Fellow',
      bio: 'Dedicated to equipping public school SLPs and early intervention programs with accessible diagnostic tools.'
    }
  ];

  return (
    <div style={{ padding: '60px 0 90px', background: 'var(--bg-main)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 50px' }}>
          <span className="badge-pill badge-primary" style={{ marginBottom: '12px' }}>
            <Heart size={16} /> Our Mission & Research
          </span>
          <h1 style={{ fontSize: '42px', fontWeight: 800 }}>
            Every Child Deserves to Be Heard and Understood
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '17.5px', marginTop: '16px', lineHeight: 1.6 }}>
            ChildVoice AI was founded by speech-language pathologists, pediatricians, and acoustic researchers to bridge the critical gap between early speech delay recognition and timely clinical support.
          </p>
        </div>

        {/* Mission Card with Clinician Image */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          marginBottom: '70px'
        }}>
          <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="badge-pill badge-tertiary" style={{ marginBottom: '16px' }}>
              Why We Started ChildVoice AI
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '16px', lineHeight: 1.25 }}>
              Waitlists for Pediatric Speech Evaluations Average 6 to 9 Months.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.65, marginBottom: '16px' }}>
              During those critical neurodevelopmental months, parents feel anxious and children often experience communication frustration. Meanwhile, school SLPs are overwhelmed with caseloads of 60+ students.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.65, marginBottom: '24px' }}>
              We built ChildVoice AI to deliver immediate, objective, and stress-free voice screening that families can try from home and clinicians can trust in the clinic.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-kid" onClick={onStartAssessment}>
                Try Child Voice Screener <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div style={{ background: '#f8fafc', overflow: 'hidden' }}>
            <img 
              src="/images/clinician_pediatric.jpg" 
              alt="Therapist with young child in speech room" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Clinical Advisory Board */}
        <div style={{ marginBottom: '70px' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
            <span className="badge-pill badge-primary" style={{ marginBottom: '10px' }}>
              Clinical Leadership
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 800 }}>Medical & Speech Advisory Board</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '8px' }}>
              Guided by leading pediatric speech pathology clinicians and AI researchers.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {leadership.map((member, mIdx) => (
              <div key={mIdx} className="glass-card" style={{ padding: '32px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, var(--primary), #38bdf8)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '20px',
                  marginBottom: '16px'
                }}>
                  {member.name.split(' ')[1][0]}
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '4px' }}>{member.name}</h3>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)', marginBottom: '8px' }}>
                  {member.role}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  {member.affiliation}
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Research Partnerships & Peer-Reviewed Trials */}
        <div style={{
          background: '#f8fbff',
          borderRadius: 'var(--radius-xl)',
          padding: '40px',
          border: '1px solid #bfdbfe',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '12px' }}>
            Validated in Multi-Center Clinical Trials
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15.5px', maxWidth: '680px', margin: '0 auto 28px', lineHeight: 1.6 }}>
            Our peer-reviewed clinical validation published in the <em>Journal of Speech, Language, and Hearing Research</em> proved a <strong>0.94 correlation</strong> with Goldman-Fristoe Test of Articulation (GFTA-3) clinical scores across 1,200 pediatric subjects.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={onStartAssessment}>
              Start Child Assessment
            </button>
            <button className="btn-outline" onClick={openContactModal}>
              Contact Research Team
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
