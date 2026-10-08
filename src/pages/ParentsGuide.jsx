import React, { useState } from 'react';
import { 
  Heart, 
  CheckCircle2, 
  HelpCircle, 
  AlertCircle, 
  Sparkles, 
  BookOpen, 
  Smile, 
  ChevronDown, 
  ChevronUp,
  ArrowRight
} from 'lucide-react';

export default function ParentsGuide({ onStartAssessment }) {
  const [activeAgeTab, setActiveAgeTab] = useState('4-5');
  const [openFaq, setOpenFaq] = useState(0);

  const ageMilestones = {
    '2-3': {
      title: 'Ages 2 to 3 Years',
      headline: 'The Language Explosion Stage',
      speechTargets: ['/p/', '/b/', '/m/', '/h/', '/w/', '/t/', '/d/'],
      intelligibility: '50% to 75% clear to family members',
      skills: [
        'Uses 200+ spoken words and begins 2-to-3 word combinations ("want blue ball")',
        'Asks "what" and "where" questions',
        'Follows 2-step directions ("Pick up the teddy and put it on the bed")',
        'Names common body parts, animals, and household objects'
      ],
      redFlags: [
        'Fewer than 50 spontaneous spoken words by age 2',
        'Not combining 2 words together by 24–30 months',
        'Difficulty imitating actions or words'
      ]
    },
    '3-4': {
      title: 'Ages 3 to 4 Years',
      headline: 'Storytelling & Conversational Curiosity',
      speechTargets: ['/k/', '/g/', '/f/', '/y/', '/ng/'],
      intelligibility: '75% to 80% clear to unfamiliar listeners',
      skills: [
        'Speaks in 4-to-5 word sentences',
        'Answers simple "who", "what", and "why" questions',
        'Understands opposites (big/little, up/down, hot/cold)',
        'Can talk about events that happened earlier in the day'
      ],
      redFlags: [
        'Speech is very unclear to strangers or teachers',
        'Frequent repeating of whole words or blocks with physical tension',
        'Struggles to answer simple questions'
      ]
    },
    '4-5': {
      title: 'Ages 4 to 5 Years',
      headline: 'Complex Sentences & Phonological Refinement',
      speechTargets: ['/s/', '/z/', '/l/', '/v/', '/ch/', '/j/'],
      intelligibility: '90%+ clear to strangers',
      skills: [
        'Uses complex grammatically complete sentences with details',
        'Tells simple sequential stories with a beginning, middle, and end',
        'Can identify simple rhyming words (cat / bat / hat)',
        'Understands spatial concepts (behind, next to, under)'
      ],
      redFlags: [
        'Leaving off starting or ending sounds of simple words',
        'Difficulty following 3-step directions in preschool',
        'Frustration or withdrawal when not understood by peers'
      ]
    },
    '5-6': {
      title: 'Ages 5 to 6+ Years',
      headline: 'Kindergarten Articulation & Pre-Reading Phonemic Awareness',
      speechTargets: ['/r/', '/th/ (voiced & voiceless)', '/zh/', 'consonant clusters'],
      intelligibility: '100% conversational intelligibility',
      skills: [
        'Pronounces almost all speech sounds correctly in everyday conversation',
        'Can sound out letters and recognize syllables in words',
        'Can sustain long back-and-forth conversational topics',
        'Uses past tense and future words correctly'
      ],
      redFlags: [
        'Persistent lisp or sound substitutions after 6th birthday',
        'Unable to tell a coherent story or retell a school event',
        'Struggling significantly with rhyming or letter sounds'
      ]
    }
  };

  const current = ageMilestones[activeAgeTab];

  const faqs = [
    {
      q: "My 4-year-old says 'wabbit' instead of 'rabbit'. Should I worry?",
      a: "No! Substituting /w/ for /r/ (called 'gliding of liquids') is completely normal and expected in 4-year-olds. The /r/ sound is one of the most acoustically complex in the English language and typically matures between ages 5 and 6. Our assessment screener can confirm if other speech sounds are tracking on time."
    },
    {
      q: "How does ChildVoice AI analyze my child's voice safely?",
      a: "We do not store or sell your child's raw voice recordings. Our acoustic neural engine processes the audio in real-time right inside your browser session to extract phonetic formant values, and then discards the audio stream immediately in compliance with COPPA and HIPAA privacy standards."
    },
    {
      q: "How long does the speech assessment take?",
      a: "Most children complete the 4 animal word game prompts in just 2 to 3 minutes! It's designed to feel like an entertaining cartoon game with zero pressure."
    },
    {
      q: "Can this report be shared with my child's pediatrician or school SLP?",
      a: "Yes! Every assessment generates a printable PDF report featuring standard ASHA developmental percentiles, phonetic transcriptions (IPA), and clinical observations that pediatricians and therapists find immediately useful."
    }
  ];

  return (
    <div style={{ padding: '60px 0 90px', background: 'var(--bg-main)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          <span className="badge-pill badge-primary" style={{ marginBottom: '12px' }}>
            <Heart size={16} /> Parental Guidance & Milestones
          </span>
          <h1 style={{ fontSize: '40px', fontWeight: 800 }}>
            Every Child Blooms on Their Own Timeline
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '17px', marginTop: '12px' }}>
            Understand what speech milestones to celebrate, what sounds are still developing, and when to consult a pediatric speech specialist.
          </p>
        </div>

        {/* Age Tab Selector */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '36px',
          flexWrap: 'wrap'
        }}>
          {Object.keys(ageMilestones).map((ageKey) => {
            const isSelected = activeAgeTab === ageKey;
            return (
              <button
                key={ageKey}
                onClick={() => setActiveAgeTab(ageKey)}
                style={{
                  padding: '12px 28px',
                  borderRadius: '9999px',
                  border: isSelected ? '2px solid var(--primary)' : '1px solid #cbd5e1',
                  background: isSelected ? 'var(--primary)' : '#ffffff',
                  color: isSelected ? '#ffffff' : 'var(--text-main)',
                  fontWeight: 800,
                  fontSize: '15px',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 4px 14px rgba(37, 99, 235, 0.25)' : 'none',
                  transition: 'all 0.2s',
                  fontFamily: 'var(--font-family-kids)'
                }}
              >
                {ageMilestones[ageKey].title}
              </button>
            );
          })}
        </div>

        {/* Milestone Detail Card */}
        <div className="glass-card" style={{ padding: '40px', marginBottom: '60px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '28px' }}>
            <div>
              <span className="badge-pill badge-tertiary" style={{ marginBottom: '8px' }}>
                {current.title}
              </span>
              <h2 style={{ fontSize: '28px', fontWeight: 800 }}>{current.headline}</h2>
              <div style={{ fontSize: '15px', color: 'var(--primary)', fontWeight: 700, marginTop: '4px' }}>
                Overall Intelligibility Benchmark: {current.intelligibility}
              </div>
            </div>

            <button className="btn-kid" onClick={onStartAssessment} style={{ padding: '10px 22px', fontSize: '15px' }}>
              Screen For This Age <ArrowRight size={16} />
            </button>
          </div>

          {/* Target Sounds Badges */}
          <div style={{ background: '#f8fbff', padding: '18px 24px', borderRadius: '14px', border: '1px solid #dbeafe', marginBottom: '32px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Mastered / Emerging Sound Targets at this Stage:
            </span>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
              {current.speechTargets.map((target, tIdx) => (
                <span 
                  key={tIdx} 
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #bfdbfe',
                    color: 'var(--text-main)',
                    fontFamily: 'var(--font-family-kids)',
                    fontWeight: 700,
                    fontSize: '18px',
                    padding: '6px 16px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
                  }}
                >
                  {target}
                </span>
              ))}
            </div>
          </div>

          {/* Grid: Expected Skills vs Red Flags */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '32px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#065f46' }}>
                <CheckCircle2 size={20} color="#10b981" /> Expected Speech & Language Milestones
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {current.skills.map((skill, sIdx) => (
                  <li key={sIdx} style={{ display: 'flex', gap: '10px', fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    <span style={{ color: '#10b981', fontWeight: 700 }}>•</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: '#fffbeb', padding: '24px', borderRadius: '16px', border: '1px solid #fde68a' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', color: '#92400e' }}>
                <AlertCircle size={20} color="#f59e0b" /> Red Flags: When to Consult an SLP
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {current.redFlags.map((flag, fIdx) => (
                  <li key={fIdx} style={{ display: 'flex', gap: '10px', fontSize: '13.5px', color: '#78350f', lineHeight: 1.5 }}>
                    <span style={{ color: '#f59e0b', fontWeight: 700 }}>⚠️</span>
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Fun Everyday Home Speech Activities */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800 }}>Playful Daily Speech Routines</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15.5px', marginTop: '8px' }}>
              Turn everyday moments into speech-stimulating fun without boring drills or pressure.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div className="glass-card" style={{ padding: '28px' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🚗</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>The "I Spy Sounds" Car Ride</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Pick one target sound of the day (like /b/) and take turns finding objects out the window: "I spy a Blue Bus! Bbb-bus!"
              </p>
            </div>

            <div className="glass-card" style={{ padding: '28px' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🛁</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Bath Time Bubble Sounds</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Practice bilabial sounds (/p/, /b/, /m/) popping bubbles: "Pop! Pop! Pop! Big bubble bye-bye!" Great for oral motor coordination.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '28px' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🥞</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Snack Time Choice Expansion</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Instead of guessing what they want, offer two choices: "Do you want juicy apple slices or crunchy crackers?" Encourages expressive naming.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, textAlign: 'center', marginBottom: '28px' }}>
            Frequently Asked Questions by Parents
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--border-light)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.2s'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '18px 24px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      fontSize: '16px',
                      fontWeight: 700,
                      color: 'var(--text-main)',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={20} color="var(--primary)" /> : <ChevronDown size={20} color="#94a3b8" />}
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 24px 20px', fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
