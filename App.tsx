import React, { useState } from 'react';
import { 
  ArrowRight, 
  BarChart2, 
  BookOpen, 
  Layout, 
  Menu, 
  X, 
  Calculator,
  Globe
} from 'lucide-react';

// Import Types and Constants
import { 
  ValueDriverSelection, 
  UIStrings, 
  Persona 
} from './types';
import { 
  VALUE_DRIVERS_SELECTION, 
  INDUSTRIES, 
  UI_STRINGS,
  PERSONAS 
} from './constants';

// Import Components
import { PlatformHub } from './components/PlatformHub';
import { AnalysisResults } from './components/AnalysisResults';
import { SkoExplainer } from './components/SkoExplainer';

function App() {
  // --- STATE MANAGEMENT ---
  // Controls which "Page" is visible
  const [currentView, setCurrentView] = useState<'hub' | 'analysis' | 'sko'>('hub');
  
  // Stores the user's selections from the Platform Hub
  const [selectedDrivers, setSelectedDrivers] = useState<ValueDriverSelection[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('manufacturing');
  
  // Localization (Default to English)
  const [language, setLanguage] = useState('EN');
  const t = UI_STRINGS[language] || UI_STRINGS['EN'];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- HANDLERS ---

  const handleDriverToggle = (driver: ValueDriverSelection) => {
    setSelectedDrivers(prev => {
      const exists = prev.find(d => d.id === driver.id);
      if (exists) {
        return prev.filter(d => d.id !== driver.id);
      }
      return [...prev, driver];
    });
  };

  const handleAnalyze = () => {
    if (selectedPersona && selectedDrivers.length > 0) {
      setCurrentView('analysis');
      window.scrollTo(0, 0);
    }
  };

  // --- RENDER HELPERS ---

  const renderContent = () => {
    switch (currentView) {
      case 'sko':
        return (
          <SkoExplainer 
            onClose={() => setCurrentView('hub')} 
            t={t}
          />
        );
      case 'analysis':
        // Ensure we only render if we have valid data, otherwise fallback to Hub
        if (!selectedPersona) {
            setCurrentView('hub'); 
            return null;
        }
        return (
          <AnalysisResults
            selectedDrivers={selectedDrivers}
            selectedIndustry={INDUSTRIES.find(i => i.id === selectedIndustry)?.nameKey || selectedIndustry}
            selectedPersona={selectedPersona}
            t={t}
            onBack={() => setCurrentView('hub')}
          />
        );
      case 'hub':
      default:
        return (
          <PlatformHub
            onAnalyze={handleAnalyze}
            selectedDrivers={selectedDrivers}
            onDriverToggle={handleDriverToggle}
            selectedPersona={selectedPersona}
            onPersonaSelect={setSelectedPersona}
            selectedIndustry={selectedIndustry}
            onIndustrySelect={setSelectedIndustry}
            t={t}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blackline-yellow selection:text-black font-sans">
      
      {/* GLOBAL NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-xl border-b border-zinc-800 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          
          {/* Logo Area */}
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => setCurrentView('hub')}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blackline-yellow rounded-lg flex items-center justify-center text-black font-black text-lg md:text-xl">
              BL
            </div>
            <div>
              <h1 className="font-bold text-sm md:text-base leading-none tracking-tight">Excellence <span className="text-zinc-400">Quantified</span></h1>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1">
            <button 
              onClick={() => setCurrentView('hub')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${currentView === 'hub' ? 'text-white bg-white/10' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
            >
              Discovery Hub
            </button>
            <button 
              onClick={() => setCurrentView('sko')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${currentView === 'sko' ? 'text-blackline-yellow bg-blackline-yellow/10' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
            >
              <RocketIcon size={16} /> SKO Playbook
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-zinc-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-b border-zinc-800 p-4 absolute w-full left-0 top-16 md:top-20 flex flex-col gap-2">
            <button 
              onClick={() => { setCurrentView('hub'); setIsMobileMenuOpen(false); }}
              className="p-4 rounded-xl bg-black border border-zinc-800 text-left font-bold text-white"
            >
              Discovery Hub
            </button>
            <button 
              onClick={() => { setCurrentView('sko'); setIsMobileMenuOpen(false); }}
              className="p-4 rounded-xl bg-black border border-zinc-800 text-left font-bold text-blackline-yellow flex items-center gap-2"
            >
              <RocketIcon size={16} /> SKO Playbook
            </button>
          </div>
        )}
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="pt-24 md:pt-32 min-h-screen">
        {renderContent()}
      </main>

    </div>
  );
}

// Simple Helper Icon for the Nav Bar
const RocketIcon = ({ size, className }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

export default App;
