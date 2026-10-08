# 🗣️ ChildVoice AI --- AI-Driven Speech & Language Development Assessment

> **A child-friendly AI-assisted platform for preliminary speech and
> language development screening.**

ChildVoice AI is a web-based prototype designed to make children's
speech assessment more engaging, structured, and accessible. It combines
a child-friendly assessment experience with speech/audio processing
concepts, acoustic feature analysis, NLP-based language analysis,
machine-learning workflows, progress dashboards, and resources for
parents and professionals.

------------------------------------------------------------------------

## 🌟 Project Overview

Speech and language development are important for a child's cognitive,
social, and educational development. Traditional assessment can require
trained professionals to observe activities, record speech, manually
transcribe responses, and evaluate several developmental
characteristics.

ChildVoice AI proposes an AI-assisted workflow that can collect child
speech through structured activities such as:

-   Word pronunciation
-   Picture description
-   Storytelling
-   Question answering
-   Interactive speech games

The proposed analysis pipeline combines:

**Audio → Preprocessing → ASR → Speech Features → NLP → ML →
Developmental Screening Profile → Dashboard & Progress Tracking**

The academic project document describes the goal as a **preliminary
screening and decision-support system**, not a replacement for a
qualified speech-language professional.

------------------------------------------------------------------------

# ▶️ Live

Run Locally  http://127.0.0.1:5173/

------------------------------------------------------------------------

## 🎯 Problem Statement

Existing child speech assessment workflows can face several challenges:

-   Time-consuming manual assessment
-   Difficulty analysing unclear child speech
-   Manual transcription challenges
-   Evaluator variability
-   Limited scalability
-   Difficulty with continuous progress tracking
-   Reduced performance of speech technologies designed primarily for
    adult speech

These challenges motivate an AI-assisted, structured, child-friendly
assessment platform.

------------------------------------------------------------------------

## 💡 Proposed Solution

ChildVoice AI provides a digital assessment workflow that combines
speech and language analysis.

### Core pipeline

1.  **Child-Friendly Input**
    -   Record speech through interactive activities.
    -   Support audio upload for testing.
2.  **Audio Processing**
    -   Capture and process recorded speech.
    -   Reduce noise and analyse the signal.
3.  **Automatic Speech Recognition**
    -   Convert speech into a transcript using ASR.
4.  **Acoustic Analysis**
    -   Analyse features such as:
        -   MFCC
        -   Pitch
        -   Formants
        -   Energy
        -   Duration
        -   Jitter
        -   Shimmer
5.  **NLP Analysis**
    -   Evaluate language characteristics such as:
        -   Word count
        -   Sentence length
        -   Vocabulary diversity
        -   Parts of Speech
        -   Mean Length of Utterance (MLU)
6.  **Machine Learning**
    -   Combine speech and language features into an interpretable
        developmental screening profile.
7.  **Dashboard & Reporting**
    -   Present results visually.
    -   Support repeated assessments and longitudinal progress tracking.

------------------------------------------------------------------------

# 🎨 Current ChildVoice AI Web Prototype

The current Antigravity/Stitch implementation converts the project
concept into a polished interactive frontend.

### Design System

-   **Primary:** Sky Blue `#2563EB`
-   **Secondary:** Aquamarine/Mint `#0D9488`
-   **Accent:** Soft Sun `#F59E0B`
-   **Surface:** Soft `#FAF8FF`
-   **Fonts:** Plus Jakarta Sans + Fredoka

The interface is designed to feel welcoming for children while remaining
professional for parents and clinicians.

------------------------------------------------------------------------

## 🧩 Implemented Technology

### Frontend

-   Vite 8
-   React 19
-   JavaScript
-   HTML5
-   CSS3
-   `lucide-react`
-   `canvas-confetti`

### Browser Audio APIs

-   Web Audio API
-   `AudioContext`
-   `AnalyserNode`
-   HTML5 Canvas waveform/frequency visualisation
-   Web SpeechSynthesis API

### Planned / Academic AI Stack

The project documentation proposes:

-   Python
-   FastAPI / Flask
-   PyTorch
-   Transformers
-   Scikit-learn
-   Librosa
-   SoundFile
-   Whisper ASR
-   spaCy
-   NLTK
-   SQLite / PostgreSQL
-   Chart.js / Recharts

> **Important:** The current web prototype and the proposed full AI/ML
> architecture are not identical. Some diagnostic behaviour shown in the
> frontend is demonstration/simulation UI. A production clinical system
> would require a validated backend, child-specific datasets, model
> evaluation, privacy controls, and clinical validation.

------------------------------------------------------------------------

# 🧠 AI / ML Architecture

The academic architecture separates the system into input, processing,
and output layers.

``` text
                 ┌───────────────────────┐
                 │      Child Input      │
                 │ Speech / Audio Record │
                 └───────────┬───────────┘
                             ↓
                 ┌───────────────────────┐
                 │  Speech Processing   │
                 │ Noise Reduction      │
                 │ Feature Extraction   │
                 └───────────┬───────────┘
                             ↓
                 ┌───────────────────────┐
                 │        ASR            │
                 │ Speech → Text         │
                 │ Whisper / ASR Model   │
                 └───────────┬───────────┘
                             ↓
                 ┌───────────────────────┐
                 │       NLP             │
                 │ Vocabulary / MLU /    │
                 │ Sentence / POS        │
                 └───────────┬───────────┘
                             ↓
                 ┌───────────────────────┐
                 │      ML Layer         │
                 │ Feature Fusion        │
                 │ Classification        │
                 └───────────┬───────────┘
                             ↓
                 ┌───────────────────────┐
                 │ Developmental Profile │
                 │ Dashboard / Reports   │
                 └───────────────────────┘
```

------------------------------------------------------------------------

# 🧪 Assessment Workflow

``` text
1. Select Assessment
        ↓
2. Enter Child Details
        ↓
3. Record / Upload Speech
        ↓
4. Process Audio
        ↓
5. Analyse Speech & Language
        ↓
6. Generate Developmental Profile
        ↓
7. View Results
        ↓
8. Review Detailed Report
        ↓
9. Track Progress
```

------------------------------------------------------------------------

# 📊 Assessment Features

### Speech

-   Pronunciation
-   Speech clarity
-   Fluency
-   Acoustic characteristics
-   Phoneme-focused activities

### Language

-   Vocabulary
-   Sentence length
-   Parts of Speech
-   Mean Length of Utterance
-   Language-development indicators

### Progress

-   Assessment results
-   Visual dashboards
-   Repeated assessment comparison
-   Longitudinal tracking

------------------------------------------------------------------------

# 🛡️ Privacy, Safety & Clinical Scope

ChildVoice AI deals with children's speech data, so privacy and consent
are important.

The project should be treated as an **AI-assisted preliminary
screening/prototype**, not as an autonomous medical diagnosis system.

Important considerations for future production development:

-   Parent/guardian consent
-   Secure audio storage
-   Data minimisation
-   Access control
-   Encryption
-   Child-specific datasets
-   Bias and language/accent evaluation
-   Clinical validation
-   False-positive/false-negative analysis
-   Human professional review

The academic project explicitly recognises that AI-generated results
should support rather than replace professional clinical assessment.

------------------------------------------------------------------------

# 🔮 Future Enhancements

Potential future development includes:

-   Multilingual child speech analysis
-   Child-specific ASR
-   Improved pronunciation/mispronunciation detection
-   Multimodal assessment
-   Personalised recommendations
-   Real-time evaluation
-   Secure cloud/backend architecture
-   Clinician review workflow
-   Longitudinal analytics
-   Larger clinically labelled datasets

------------------------------------------------------------------------

# 📖 References

The academic project references include work on SpeechMark syllabic
analysis, LENA-based child speech analysis, articulation/phonology
development, Wav2Vec-based mispronunciation detection, longitudinal
preschool speech studies, pediatric ASR, multitask ASR and
mispronunciation detection, acoustic feature analysis, and Korean ASD
speech corpora.

See the project presentation/report for the complete reference list and
literature-survey table.

------------------------------------------------------------------------

# 🏆 Project Highlights

### For Children

🎮 Interactive speech activities\
🐾 Animal speech characters\
🎙️ Friendly recording experience\
🔊 Listen-first pronunciation support\
🎉 Positive visual feedback

### For Parents

📊 Easy-to-understand results\
📚 Developmental guidance\
🏠 At-home speech activities\
📈 Progress tracking

### For Professionals

🩺 Clinician-oriented dashboard\
👥 Caseload management UI\
📝 Notes and reporting workflow\
📊 Assessment overview

------------------------------------------------------------------------

# ⭐ Final Project Statement

**ChildVoice AI aims to transform child speech assessment from a
time-intensive, manually driven workflow into an engaging, structured
and AI-assisted digital experience.**

The prototype demonstrates how modern web technologies can provide
child-friendly interaction, real-time audio visualisation, structured
assessment workflows, reporting interfaces and a foundation for future
AI/ML integration.

> **ChildVoice AI is an academic/prototype project. It is not a medical
> diagnosis tool and should not replace assessment by a qualified
> speech-language professional.**
