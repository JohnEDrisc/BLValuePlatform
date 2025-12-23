import React, { useState } from 'react';
import { 
  ValueDriverSelection, 
  UIStrings, 
  Persona 
} from './types';
import { 
  VALUE_DRIVERS_SELECTION, 
  INDUSTRIES, 
  UI_STRINGS 
} from './constants';

// Import Components
import { PlatformHub } from './components/PlatformHub';
import { AnalysisResults } from './components/AnalysisResults';
import { SkoExplainer } from './components/SkoExplainer';

function App() {
  // --- STATE MANAGEMENT ---
  // Default to 'sko' so the app lands on the Explainer first
  const [currentView, setCurrentView] = useState<'hub' | 'analysis' | 'sko'>('sko');
  
  // Data State
  const [selectedDrivers, setSelectedDrivers] = useState<ValueDriverSelection[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('manufacturing');
  
  // Localization (Default to English)
  const [language, setLanguage] = useState('EN');
  const t = UI_STRINGS[language] || UI_STRINGS['EN'];

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
    // Only allow analysis if data is valid
    if (selectedPersona && selectedDrivers.length > 0) {
      setCurrentView('analysis');
      window.scrollTo(0, 0);
    }
  };

  // --- RENDER CONTENT ---

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blackline-yellow selection:text-black font-sans">
      
      {/* Simple Header (Restored Original Style) */}
      <header className="pt-8 pb-4 px-6 text-center">
        <div 
          className="inline-flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setCurrentView('sko')} // Logo click returns to Landing
        >
          <div className="w-8 h-8 bg-blackline-yellow rounded flex items-center justify-center text-black font-bold text-xl">
            BL
          </div>
          <span className="font-bold text-lg tracking-tight">Excellence <span className="text-zinc-500">Quantified</span></span>
        </div>
      </header>

      <main className="py-8">
        
        {/* VIEW 1: SKO PLAYBOOK (LANDING) */}
        {currentView === 'sko' && (
          <SkoExplainer 
            // Closing takes you to the Hub (Menu)
            onClose={() => setCurrentView('hub')} 
            t={t}
          />
        )}

        {/* VIEW 2: LEGACY MENU (PLATFORM HUB) */}
        {currentView === 'hub' && (
          <>
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
            
            {/* Footer Link back to Landing */}
            <div className="text-center mt-12 pb-8">
              <button 
                onClick={() => setCurrentView('sko')}
                className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors border-b border-transparent hover:border-zinc-500 pb-1"
              >
                Replay SKO Experience
              </button>
            </div>
          </>
        )}

        {/* VIEW 3: ANALYSIS RESULTS */}
        {/* We use '&& selectedPersona' here to prevent the "No Persona Selected" error screen */}
        {currentView === 'analysis' && selectedPersona && (
          <AnalysisResults
            selectedDrivers={selectedDrivers}
            selectedIndustry={INDUSTRIES.find(i => i.id === selectedIndustry)?.nameKey || selectedIndustry}
            selectedPersona={selectedPersona}
            t={t}
            onBack={() => setCurrentView('hub')}
          />
        )}
      </main>
    </div>
  );
}

export default App;
