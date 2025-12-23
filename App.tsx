import React, { useState, useEffect } from 'react';
import { 
  Globe, ChevronDown, BarChart2, Calculator, Users, Layers, Zap, 
  Trophy, ArrowRight, X, HelpCircle, Info, Video, Sparkles 
} from 'lucide-react';

// --- COMPONENT IMPORTS ---
import { VisualNav } from './components/VisualNav';
import { ValueCalculator } from './components/ValueCalculator';
import { CustomerBenchmarks } from './components/CustomerBenchmarks';
import { OutsideInGenerator } from './components/OutsideInGenerator';
import { Tooltip } from './components/Tooltip';
import { RightRail } from './components/RightRail';

import { PlatformHub } from './components/PlatformHub';
import { AnalysisResults } from './components/AnalysisResults';
import { SkoExplainer } from './components/SkoExplainer';

import { AnalysisResult, DealContext, ValueDriverSelection, Persona, ValueDriver } from './types';
import { SUPPORTED_LANGUAGES, UI_STRINGS, INDUSTRIES } from './constants';
import { generateValueAnalysis } from './services/geminiService';

// Custom Rubik's Cube Icon for Pivot
export const RubiksCube = ({ size = 20, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
    <line x1="3" y1="16.5" x2="12" y2="12" />
    <line x1="21" y1="16.5" x2="12" y2="12" />
    <line x1="12" y1="7" x2="12" y2="2" />
    <line x1="7.5" y1="4.5" x2="16.5" y2="9.5" />
    <line x1="7.5" y1="19.5" x2="16.5" y2="14.5" />
  </svg>
);

function App() {
  // Initial landing state
  const [activeTab, setActiveTab] = useState<'discovery' | 'outside_in' | 'calculator' | 'benchmarks' | 'hub' | 'sko'>('sko');
  const [showDiscoveryMenu, setShowDiscoveryMenu] = useState(false);
  const [query, setQuery] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // --- HUB STATE (Video Coaching) ---
  const [selectedDrivers, setSelectedDrivers] = useState<ValueDriverSelection[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('manufacturing');
  const [showAnalysis, setShowAnalysis] = useState(false);

  // Panel Control
  const [activePanel, setActivePanel] = useState<'chat' | 'pivot' | null>(null);
  const [showGuidance, setShowGuidance] = useState(false);

  // Deal Context
  const [dealContext, setDealContext] = useState<DealContext>({});

  // Language State
  const [currentLang, setCurrentLang] = useState('EN');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  // Safe Translation Logic
  const t = { ...UI_STRINGS['EN'], ...(UI_STRINGS[currentLang] || {}) };

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab, hasSearched, showDiscoveryMenu, showAnalysis]);

  // Function to return to the root landing page (6 buttons)
  const goHome = () => {
    setActiveTab('discovery'); 
    setShowDiscoveryMenu(false);
    setHasSearched(false);
    setResult(null);
    setQuery('');
    setShowGuidance(false);
    setActivePanel(null);
    setShowAnalysis(false); // Reset Hub state
  };

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
        // Construct Hub Results
        const mockResult: AnalysisResult = {
            talkTrack: `Strategic analysis for ${selectedPersona.name} focusing on ${selectedDrivers.map(d => d.value).join(', ')}.`,
            valueDriverImpacts: {}, 
            cfoPunchline: "Accelerate financial transformation with unified automation.",
            caoPunchline: "Ensure compliance and accuracy with every close.",
            cioPunchline: "Simplify the tech stack with a single financial platform.",
            valueChain: [],
            businessScenarios: [],
            objectionHandling: [],
            discoveryQuestions: ["What are your key bottlenecks today?", "How do you measure success?"],
            references: [],
            personaAnalysis: {
                role: selectedPersona.name,
                topConcerns: ["Efficiency", "Risk", "Talent"],
                keepsThemUpAtNight: "Audit failure or missed deadlines.",
                personalWins: ["Strategic Partner", "Automation Hero"],
                businessProblems: ["Manual work", "Disconnected systems"]
            }
        };

        // Populate dynamic drivers for display
        selectedDrivers.forEach(d => {
            mockResult.valueDriverImpacts[d.value] = {
                message: "High impact strategic capability.",
                metric: "Significant ROI",
                relevance: "High"
            };
        });

        // Use the same "Result" object but with special flags if needed
        setResult(mockResult);
        setQuery(`${selectedPersona.name} Analysis`);
        setShowAnalysis(true);
        window.scrollTo(0, 0);
    }
  };

  const handleSearch = (searchQuery: string = query, lang: string = currentLang) => {
    if (!searchQuery.trim()) return;
    
    setHasSearched(true);
    setQuery(searchQuery);
    setIsLoading(true);

    generateValueAnalysis(searchQuery, lang).then((data) => {
      setResult(data);
      setIsLoading(false);
    }).catch(err => {
      console.error(err);
      setIsLoading(false);
    });
  };
  
  const handleBackToDiscovery = () => {
      setResult(null);
      setHasSearched(false);
      setQuery('');
      setShowAnalysis(false);
      setActiveTab('discovery');
      setShowDiscoveryMenu(true);
  };

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    setIsLangMenuOpen(false);
    
    if (hasSearched && query && activeTab === 'discovery') {
      handleSearch(query, langCode);
    }
  };

  const getContextString = () => {
    if (activeTab === 'discovery') return hasSearched ? `Results for "${query}".` : "Discovery.";
    return "BlackLine Value";
  };

  const handlePivot = (newContext: Partial<DealContext> & { problem?: string }) => {
    setDealContext(prev => ({ ...prev, ...newContext }));
  };

  const showHero = activeTab === 'discovery' && !hasSearched && !showDiscoveryMenu;

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-blackline-yellow selection:text-black">
      
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-md text-white py-4 border-b border-zinc-800 sticky top-0 z-50 pr-[60px]">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={goHome}>
            <div className="flex items-center justify-center w-10 h-10 bg-blackline-yellow rounded-sm group-hover:bg-white transition-colors duration-300">
              <span className="text-black font-extrabold text-2xl tracking-tighter">BL</span>
            </div>
            <div className="h-8 w-px bg-zinc-800"></div>
            <h1 className="text-lg font-medium tracking-wide text-gray-200 group-hover:text-white transition-colors">
              {t.subtitle} <span className="font-bold text-white">{t.subtitle_bold}</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            {dealContext.opportunityName && (
               <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-zinc-900 rounded-full border border-zinc-800 animate-fade-in">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Active:</span>
                  <span className="text-xs font-bold text-white max-w-[150px] truncate">{dealContext.opportunityName}</span>
               </div>
            )}

            <div className="flex items-center gap-2 md:gap-3">
              <button 
                onClick={() => setShowGuidance(!showGuidance)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 border ${showGuidance ? 'bg-blackline-yellow border-blackline-yellow text-black scale-105 shadow-[0_0_15px_rgba(249,183,52,0.4)]' : 'bg-zinc-900/50 border-zinc-800 text-gray-300 hover:text-white hover:bg-zinc-800'}`}
              >
                <HelpCircle size={18} className={!showGuidance ? "text-blackline-yellow animate-pulse" : ""} />
                <span className="text-[10px] font-black uppercase tracking-widest">Help</span>
              </button>

              <button 
                onClick={() => setActivePanel(activePanel === 'pivot' ? null : 'pivot')}
                className={`p-2 rounded-xl transition-all duration-300 border ${activePanel === 'pivot' ? 'bg-zinc-100 border-white text-black scale-105 shadow-lg' : 'bg-zinc-900/50 border-zinc-800 text-gray-400 hover:text-white hover:bg-zinc-800'}`}
              >
                <RubiksCube size={20} />
              </button>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 text-gray-300 hover:text-blackline-yellow transition-colors py-2 font-medium"
              >
                <Globe size={18} />
                <span className="text-xs font-bold hidden sm:inline">{currentLang}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsLangMenuOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-48 bg-zinc-900 rounded-lg shadow-xl py-2 z-50 border border-zinc-800 animate-fade-in">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-zinc-800 transition-colors ${lang.code === currentLang ? 'text-blackline-yellow font-bold bg-zinc-800/50' : 'text-gray-300'}`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 pt-12 pb-20 relative pr-[60px]">
        {!hasSearched && (activeTab === 'discovery' || activeTab === 'sko') && (
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blackline-yellow/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        )}

        {/* Hero Section */}
        <div className={`transition-all duration-700 ease-in-out ${!showHero ? 'hidden' : 'translate-y-0 opacity-100'}`}>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight drop-shadow-sm">
              {t.hero_title} <span className="text-blackline-yellow">{t.hero_title_accent}</span>
            </h2>
            <p className="text-2xl text-gray-300 font-normal max-w-2xl mx-auto leading-relaxed text-left md:text-center">
              {t.hero_desc}
            </p>
            
            <div className="flex flex-col items-center mt-10 mb-8 gap-4">
                 
                 {/* Main Focused SKO Button */}
                 <div className="w-full max-w-md">
                    <button 
                      onClick={() => { setActiveTab('sko'); setShowDiscoveryMenu(false); }}
                      className="w-full flex items-center justify-center gap-3 px-6 py-5 rounded-2xl text-xl font-bold transition-all bg-zinc-900 border border-zinc-700 text-white hover:border-blackline-yellow hover:text-blackline-yellow active:scale-95 group shadow-xl"
                    >
                      <Trophy size={24} className="text-blackline-yellow" /> 
                      <span>{t.tab_sko}</span>
                      <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                    </button>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                    <button 
                      onClick={() => { setActiveTab('discovery'); setShowDiscoveryMenu(true); }}
                      className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-lg font-bold transition-all bg-zinc-900 text-gray-300 hover:text-white hover:bg-zinc-800 border border-zinc-800 shadow-md"
                    >
                      <BarChart2 size={20} /> {t.tab_discovery}
                    </button>
                    <button 
                      onClick={() => { setActiveTab('outside_in'); setShowDiscoveryMenu(false); }}
                      className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-lg font-bold transition-all bg-zinc-900 text-gray-300 hover:text-white hover:bg-zinc-800 border border-zinc-800 shadow-md"
                    >
                      <Zap size={20} /> {t.tab_outside_in}
                    </button>
                 </div>

                 <div className="flex flex-wrap justify-center gap-3 w-full max-w-2xl">
                    <button 
                      onClick={() => { setActiveTab('calculator'); setShowDiscoveryMenu(false); }}
                      className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all bg-zinc-900 text-gray-300 hover:text-white hover:bg-zinc-800 border border-zinc-800`}
                    >
                      <Calculator size={16} /> {t.tab_calculator}
                    </button>
                    <button 
                      onClick={() => { setActiveTab('benchmarks'); setShowDiscoveryMenu(false); }}
                      className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all bg-zinc-900 text-gray-300 hover:text-white hover:bg-zinc-800 border border-zinc-800`}
                    >
                      <Users size={16} /> {t.tab_benchmarks}
                    </button>
                    <button 
                      onClick={() => { setActiveTab('hub'); setShowDiscoveryMenu(false); }}
                      className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all bg-zinc-900 text-gray-300 hover:text-white hover:bg-zinc-800 border border-zinc-800`}
                    >
                      <Video size={16} /> {t.tab_hub}
                    </button>
                 </div>
              </div>
          </div>
        </div>

        {/* --- APP SECTIONS --- */}

        {activeTab === 'sko' && (
           <SkoExplainer onClose={goHome} t={t} />
        )}
        
        {activeTab === 'discovery' && (
          <>
            {!hasSearched && showDiscoveryMenu && (
              <div className="animate-fade-in-up delay-200">
                <div className="max-w-[1000px] mx-auto flex justify-between items-center mb-6 px-6">
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-black text-white flex items-center gap-3 uppercase italic tracking-tighter">
                      <BarChart2 size={28} className="text-blackline-yellow" /> {t.tab_discovery}
                    </h3>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Multi-Contextual Enablement</p>
                  </div>
                  <button onClick={goHome} className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 text-gray-500 hover:text-white transition-all group">
                    <X size={24} className="group-hover:scale-110" />
                  </button>
                </div>
                
                <VisualNav onSelect={(q: string) => handleSearch(q)} t={t} />
              </div>
            )}

            {isLoading && hasSearched && (
              <div className="flex flex-col items-center justify-center py-32 animate-fade-in">
                <div className="relative">
                  <div className="w-24 h-24 border-4 border-zinc-800 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-24 h-24 border-4 border-blackline-yellow border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mt-10 tracking-tight">{t.loading_title}</h3>
                <p className="text-gray-300 mt-2 font-medium text-lg">{t.loading_desc}</p>
              </div>
            )}

            {!isLoading && result && (
              <div className="animate-fade-in">
                  <div className="max-w-[1400px] mx-auto flex justify-between items-center mb-6 px-6 no-print">
                    <div className="flex items-center gap-3">
                      <BarChart2 size={20} className="text-blackline-yellow" />
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                        Generated Enablement Brief
                      </h3>
                    </div>
                    <button onClick={handleBackToDiscovery} className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 text-gray-500 hover:text-white transition-all">
                      <X size={24} />
                    </button>
                  </div>
                  <AnalysisResults 
                    data={result}
                    query={query}
                    onBack={handleBackToDiscovery}
                    onNavigateToCalculator={() => setActiveTab('calculator')}
                    t={t}
                  />
              </div>
            )}
          </>
        )}

        {activeTab === 'outside_in' && (
          <OutsideInGenerator 
            t={t} 
            onSetDealContext={setDealContext} 
            dealContext={dealContext}
          />
        )}

        {activeTab === 'calculator' && (
           <ValueCalculator t={t} dealContext={dealContext} onSetDealContext={setDealContext} />
        )}

        {activeTab === 'benchmarks' && (
           <CustomerBenchmarks t={t} />
        )}

        {activeTab === 'hub' && (
          <>
            <div className="max-w-[1200px] mx-auto flex justify-between items-center px-4 mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 uppercase italic tracking-tighter">
                  <Video size={20} className="text-blackline-yellow" /> {t.tab_hub}
                </h3>
                <button onClick={goHome} className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 text-gray-500 hover:text-white transition-all">
                   <X size={24} />
                </button>
            </div>
            
            {/* The FIX: Properly passing props for Hub Mode */}
            {showAnalysis && result ? (
                <AnalysisResults
                    data={result}
                    query={query}
                    onBack={() => setShowAnalysis(false)}
                    onNavigateToCalculator={() => setActiveTab('calculator')}
                    t={t}
                />
            ) : (
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
          </>
        )}

      </main>

      <RightRail 
        contextString={getContextString()}
        dealContext={dealContext}
        onPivot={handlePivot}
        activePanelProp={activePanel}
        onPanelChange={(p: any) => setActivePanel(p)}
      />

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-900 py-10 mt-auto pr-[60px] no-print">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-4 opacity-70">
             <div className="w-6 h-6 bg-blackline-yellow rounded-sm flex items-center justify-center">
              <span className="text-black font-bold text-xs">BL</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 font-medium">{t.footer_rights}</p>
          <p className="mt-2 text-xs text-zinc-500 font-mono uppercase tracking-widest">{t.footer_internal}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
