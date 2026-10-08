import React, { useState } from 'react';
import { BookOpen, Download, Search, Tag, FileText, CheckCircle2, Sparkles, Filter } from 'lucide-react';

export default function Resources({ onStartAssessment }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const resources = [
    {
      id: 1,
      title: 'ASHA Speech Sound Normative Chart (Ages 2 to 7)',
      category: 'guides',
      type: 'PDF Guide • 4 Pages',
      downloads: '14,200+',
      description: 'The definitive American Speech-Language-Hearing Association timeline of age-of-mastery for English consonants and blends.',
      tag: 'Clinician & Parent Essential'
    },
    {
      id: 2,
      title: 'Rosie the Rabbit /r/ Sound Home Adventure Kit',
      category: 'worksheets',
      type: 'Printable Activity • 12 Flashcards',
      downloads: '9,800+',
      description: 'Color-in flashcards and playful carrier phrase board games designed to elicit initial, medial, and vocalic /r/ sounds.',
      tag: 'Playful Practice'
    },
    {
      id: 3,
      title: 'Sunny the Sun /s/ and /z/ Lisp Intervention Cards',
      category: 'worksheets',
      type: 'Interactive Cards • 8 Pages',
      downloads: '11,400+',
      description: 'Visual cues for central airflow and teeth positioning to transition away from interdental or lateral lisp patterns.',
      tag: 'Popular'
    },
    {
      id: 4,
      title: 'Pediatric Early Language Milestone Checklist (18m–36m)',
      category: 'guides',
      type: 'Screening Rubric • 2 Pages',
      downloads: '18,500+',
      description: 'Helpful for tracking late talkers, word combinations, receptive comprehension, and natural gesture milestones.',
      tag: 'Toddler Milestone'
    },
    {
      id: 5,
      title: 'Speech Sound Bingo Game (Lion, Rabbit, Bear & Sun)',
      category: 'games',
      type: 'Printable Game • 6 Boards',
      downloads: '8,300+',
      description: 'Family bingo cards pairing speech targets with silly animal actions to reinforce auditory discrimination.',
      tag: 'Family Game'
    },
    {
      id: 6,
      title: 'School SLP Billing & CPT Coding Quick Reference',
      category: 'guides',
      type: 'Clinical Sheet • 1 Page',
      downloads: '5,100+',
      description: 'Updated 2026 reimbursement coding guide for speech screening (92523), articulation (92522), and treatment (92507).',
      tag: 'Clinician Only'
    }
  ];

  const filtered = resources.filter(r => {
    const matchesCategory = activeCategory === 'all' || r.category === activeCategory;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ padding: '60px 0 90px', background: 'var(--bg-main)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
          <span className="badge-pill badge-primary" style={{ marginBottom: '12px' }}>
            <BookOpen size={16} /> Clinical Worksheets & Printables
          </span>
          <h1 style={{ fontSize: '38px', fontWeight: 800 }}>
            Free Pediatric Speech Therapy Resources
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16.5px', marginTop: '12px' }}>
            Download evidence-based articulation worksheets, milestone charts, and animal flashcards reviewed by certified speech-language pathologists.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '36px' }}>
          {/* Categories */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Resources' },
              { id: 'worksheets', label: 'Flashcards & Worksheets' },
              { id: 'guides', label: 'Developmental Guides' },
              { id: 'games', label: 'Speech Games' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  border: activeCategory === cat.id ? '2px solid var(--primary)' : '1px solid #cbd5e1',
                  background: activeCategory === cat.id ? 'var(--primary)' : '#ffffff',
                  color: activeCategory === cat.id ? '#ffffff' : 'var(--text-main)',
                  fontWeight: 700,
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search worksheets..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '13.5px',
                outline: 'none',
                background: '#fff'
              }}
            />
          </div>
        </div>

        {/* Resource Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '60px' }}>
          {filtered.map(res => (
            <div key={res.id} className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <span className="badge-pill badge-primary">
                  {res.tag}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {res.downloads} downloads
                </span>
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>
                {res.title}
              </h3>
              <div style={{ fontSize: '12.5px', color: 'var(--primary)', fontWeight: 600, marginBottom: '12px' }}>
                {res.type}
              </div>

              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px', flex: 1 }}>
                {res.description}
              </p>

              <button 
                className="btn-outline"
                style={{ width: '100%', justifyContent: 'center', borderColor: '#bfdbfe', color: 'var(--primary)', fontWeight: 700 }}
                onClick={() => alert(`Starting download for "${res.title}"...`)}
              >
                <Download size={15} /> Download Free PDF
              </button>
            </div>
          ))}
        </div>

        {/* Animal Card Visual Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '36px',
          border: '2px solid #bfdbfe',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '30px',
          alignItems: 'center'
        }}>
          <div>
            <span className="badge-pill badge-tertiary" style={{ marginBottom: '10px' }}>
              Kid-Favorite Illustrated Cards
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '10px' }}>
              Want the Printable Animal Flashcard Pack?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '20px', lineHeight: 1.5 }}>
              Featuring Leo the Lion, Rosie the Rabbit, and Sunny the Sun! Perfect for refrigerator speech practice and preschool classrooms.
            </p>
            <button 
              className="btn-kid"
              onClick={() => alert("Downloading printable 30-card Animal Phoneme Flashcard Deck...")}
            >
              <Download size={18} /> Download 30 Animal Flashcards (PDF)
            </button>
          </div>

          <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
            <img 
              src="/images/speech_fun_games.jpg" 
              alt="Leo Rosie and Sunny speech flashcards" 
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
