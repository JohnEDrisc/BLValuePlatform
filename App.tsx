import React, { useState } from 'react';
import { 
  BarChart2, 
  BookOpen, 
  Layout, 
  Video, 
  Calculator, 
  Globe,
  Rocket,
  ArrowRight,
  MessageSquare
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
  UI_STRINGS 
} from './constants';

// Import Components
import { PlatformHub } from './components/PlatformHub';
import { AnalysisResults } from './components/AnalysisResults';
import { SkoExplainer } from './components/SkoExplainer';

function App() {
  // --- STATE MANAGEMENT ---
  // Views: 'landing' (SKO), 'menu' (Dashboard), 'hub' (Selector), 'analysis' (Results)
  const [currentView, setCurrentView] = useState<'landing' | 'menu' | 'hub' | 'analysis'>('landing');
  
  // Data State for Narrative Explainer
  const [selectedDrivers, setSelectedDrivers] = useState<ValueDriverSelection[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('manufacturing');
  
  // Localization
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
    if (selectedPersona && selectedDrivers.length > 0) {
      setCurrentView('analysis');
      window.scrollTo(0, 0);
    }
  };

  // --- RENDER HELPERS ---

  const renderMainMenu = () => (
    <div className="w-full max-w-6xl mx-auto px-6 py-12 animate-fade-in">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 text-xs font-bold uppercase tracking-widest mb-6">
           <Layout size={14} /> Main Menu
        </div>
        <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
           Value <span className="text-zinc-600">Platform</span>
        </h1>
        <p className="text-xl text-zinc-400">Select a tool to begin.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 1. SKO Playbook */}
        <MenuCard 
          title="SKO 26 Playbook" 
          desc="The definitive guide to strategic selling and value drivers."
          icon={Rocket}
          color="text-blackline-yellow"
          onClick={() => setCurrentView('landing')}
        />

        {/* 2. Narrative Explainer (The Hub Flow) */}
        <MenuCard 
          title="Narrative Explainer" 
          desc="Build tailored business cases by Persona and Industry."
          icon={MessageSquare}
          color="text-blue-400"
          onClick={() => setCurrentView('hub')}
        />

        {/* 3. Outside-In Generator */}
        <MenuCard 
          title="Outside-In Generator" 
          desc="Generate hypotheses based on public 10-K data."
          icon={Globe}
          color="text-purple-400"
          onClick={() => console.log("Outside-In clicked")} // Placeholder
          wip
        />

        {/* 4. BVA Calculator */}
        <MenuCard 
          title="BVA Calculator" 
          desc="Quantify ROI with detailed financial modeling."
          icon={Calculator}
          color="text-green-400"
          onClick={() => console.log("BVA clicked")} // Placeholder
          wip
        />

        {/* 5. Customer Benchmarks */}
        <MenuCard 
          title="Customer Benchmarks" 
          desc="Compare metrics against anonymized peer data."
          icon={BarChart2}
          color="text-orange-400"
          onClick={() => console.log("Benchmarks clicked")} // Placeholder
          wip
        />

        {/* 6. Video Coach */}
        <MenuCard 
          title="Video Coach" 
          desc="AI-driven roleplay and pitch practice."
          icon={Video}
          color="text-pink-400"
          onClick={() => console.log("Video Coach clicked")} // Placeholder
          wip
        />

      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blackline-yellow selection:text-black font-sans">
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-md border-b border-zinc-800 z-50 px-6 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setCurrentView('menu')}
        >
          <div className="w-8 h-8 bg-blackline-yellow rounded flex items-center justify-center text-black font-bold text-lg">BL</div>
          <span className="font-bold tracking-tight">Excellence <span className="text-zinc-500">Quantified</span></span>
        </div>
        
        {currentView !== 'menu' && (
          <button 
            onClick={() => setCurrentView('menu')}
            className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
          >
            Back to Menu
          </button>
        )}
      </header>

      <main className="pt-20">
        {currentView === 'landing' && (
          <SkoExplainer 
            onClose={() => setCurrentView('menu')} 
            t={t}
          />
        )}

        {currentView === 'menu' && renderMainMenu()}

        {currentView === 'hub' && (
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
        )}

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

// --- Helper Component for Menu Cards ---
const MenuCard = ({ title, desc, icon: Icon, color, onClick, wip }: any) => (
  <button 
    onClick={onClick}
    disabled={wip}
    className={`group relative bg-zinc-900 border border-zinc-800 p-8 rounded-3xl text-left transition-all hover:-translate-y-1 hover:shadow-2xl ${wip ? 'opacity-50 cursor-not-allowed' : 'hover:border-zinc-600'}`}
  >
    <div className={`w-12 h-12 rounded-2xl bg-zinc-950 flex items-center justify-center mb-6 border border-zinc-800 group-hover:border-zinc-600 transition-colors ${color}`}>
      <Icon size={24} />
    </div>
    <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
    <p className="text-zinc-400 leading-relaxed">{desc}</p>
    
    {!wip && (
      <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
        <ArrowRight className="text-white" />
      </div>
    )}
    
    {wip && (
      <div className="absolute top-4 right-4 px-2 py-1 bg-zinc-800 rounded text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
        Coming Soon
      </div>
    )}
  </button>
);

export default App;
