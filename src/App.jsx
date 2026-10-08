import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import ContactModal from './components/ContactModal';
import Home from './pages/Home';
import AssessmentFlow from './pages/AssessmentFlow';
import ParentsGuide from './pages/ParentsGuide';
import ClinicianPortal from './pages/ClinicianPortal';
import Technology from './pages/Technology';
import Resources from './pages/Resources';
import About from './pages/About';
import './styles/components.css';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleStartAssessment = () => {
    setCurrentView('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (role) => {
    setCurrentUser(role);
    if (role === 'clinician') {
      setCurrentView('clinicians');
    }
  };

  return (
    <div className="app-root" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Navigation */}
      <Navbar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        openAuthModal={() => setIsAuthOpen(true)}
        openContactModal={() => setIsContactOpen(true)}
      />

      {/* Main Page Content */}
      <main style={{ flex: 1 }}>
        {currentView === 'home' && (
          <Home 
            onStartAssessment={handleStartAssessment} 
            setCurrentView={setCurrentView} 
          />
        )}

        {currentView === 'assessment' && (
          <AssessmentFlow 
            onReset={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'parents' && (
          <ParentsGuide 
            onStartAssessment={handleStartAssessment} 
          />
        )}

        {currentView === 'clinicians' && (
          <ClinicianPortal 
            onStartAssessment={handleStartAssessment} 
          />
        )}

        {currentView === 'technology' && (
          <Technology 
            onStartAssessment={handleStartAssessment} 
          />
        )}

        {currentView === 'resources' && (
          <Resources 
            onStartAssessment={handleStartAssessment} 
          />
        )}

        {currentView === 'about' && (
          <About 
            onStartAssessment={handleStartAssessment}
            openContactModal={() => setIsContactOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer 
        setCurrentView={setCurrentView} 
        openContactModal={() => setIsContactOpen(true)}
      />

      {/* Global Modals */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
