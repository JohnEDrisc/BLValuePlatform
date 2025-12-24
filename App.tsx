
import React, { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown, X, Loader2, Menu } from 'lucide-react';
import { VisualNav } from './components/VisualNav';
import { ValueCalculator } from './components/ValueCalculator';
import { AnalysisResults } from './components/AnalysisResults';
import { CustomerBenchmarks } from './components/CustomerBenchmarks';
import { PlatformHub } from './components/PlatformHub';
import { OutsideInGenerator } from './components/OutsideInGenerator';
import { SkoExplainer } from './components/SkoExplainer';
import { RightRail } from './components/RightRail';
import { RubiksCube } from './components/Icons';
import { generateValueAnalysis } from './services/geminiService';
import { AnalysisResult, DealContext } from './types';
import { SUPPORTED_LANGUAGES, UI_STRINGS } from './constants';

/**
 * Main application component for the BlackLine Value Delivery Platform.
 * Features a smart, hide-on-scroll floating command dock.
 */
function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'discovery' | 'outside_in' | 'calculator' | 'benchmarks' | 'hub' | 'sko'>('sko');
  const [query, setQuery] = useState('');
  
  // Visibility States
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  
  // Analysis State
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Panel Control
  const [activePanel, setActivePanel] = useState<'chat' | 'pivot' | null>(null);

  // Global Deal Context
  const [dealContext, setDealContext] = useState<DealContext>({});

  // Internationalization
  const [currentLang, setCurrentLang] = useState('EN');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  const t = { ...UI_STRINGS['EN'], ...(UI_STRINGS[currentLang] || {}) };

  // Smart Scroll Logic for Footer
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      const isAtTop = currentScrollY < 100;

      if (isAtTop || isAtBottom) {
        setIsVisible(true);
      } else if (isScrollingDown && currentScrollY > 150) {
        setIsVisible(false);
      } else if (!isScrollingDown) {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // UX: Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsVisible(true);
  }, [activeTab]);

  const goHome = () => {
    setActiveTab('discovery'); 
    setHasSearched(false);
    setResult(null);
    setQuery('');
    setActivePanel(null);
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
      console.error("Search error:", err);
      setIsLoading(false);
    });
  };
  
  const handleBackToDiscovery = () => {
      setResult(null);
      setHasSearched(false);
      setQuery('');
      setActiveTab('discovery');
  };

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    setIsLangMenuOpen(false);
    if (hasSearched && query && activeTab === 'discovery') {
      handleSearch(query, langCode);
    }
  };

  const getContextString = () => {
    const contextMap: Record<string, string> = {
      discovery: hasSearched ? `Analyzing value for: ${query}` : "Narrative selection menu.",
      outside_in: "Outside-In Value Generator.",
      calculator: "BVA ROI Calculator.",
      benchmarks: "Global Customer Benchmarks.",
      hub: "Sales Coaching and Intelligence Hub.",
      sko: "SKO 26 Sales Playbook.",
    };
    return contextMap[activeTab] || "Value Delivery Platform";
  };

  const handlePivot = (newContext: Partial<DealContext> & { problem?: string }) => {
    setDealContext(prev => ({ ...prev, ...newContext }));
    if (activeTab === 'discovery') {
      let pivotQuery = query || "Financial Close Transformation";
      const pivotParts = [];
      if (newContext.persona) pivotParts.push(`${newContext.persona}`);
      if (newContext.industry) pivotParts.push(`${newContext.industry}`);
      if (newContext.problem) pivotParts.push(`Solving for ${newContext.problem}`);
      if (pivotParts.length > 0) {
        pivotQuery = pivotParts.join(', ');
        handleSearch(pivotQuery);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-blackline-yellow selection:text-black">
      
      {/* Header: Dynamic Titles based on Tab */}
      <header className="bg-black/95 backdrop-blur-md text-white py-4 border-b border-zinc-800 sticky top-0 z-[60] pr-[60px]">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={goHome}>
            <div className="flex items-center justify-center w-10 h-10 bg-blackline-yellow rounded-sm group-hover:bg-white transition-colors duration-300">
              <span className="text-black font-extrabold text-2xl tracking-tighter">BL</span>
            </div>
            <div className="h-8 w-px bg-zinc-800"></div>
            <h1 className="text-lg font-medium tracking-wide text-gray-200 group-hover:text-white transition-colors">
              {activeTab === 'sko' ? (
                <>Value Driver <span className="font-bold text-white uppercase tracking-tighter">Enablement Platform</span></>
              ) : (
                <>Value Delivery <span className="font-bold text-white uppercase tracking-tighter">Execution Platform</span></>
              )}
            </h1>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            {dealContext.opportunityName && (
               <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 bg-zinc-900 rounded-full border border-zinc-800 animate-fade-in">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mr-1">Deal:</span>
                  <span className="text-xs font-bold text-white max-w-[150px] truncate">{dealContext.opportunityName}</span>
                  <button onClick={(e) => { e.stopPropagation(); setDealContext({}); }} className="ml-2 p-1 hover:bg-zinc-800 rounded-full text-zinc-600 hover:text-white transition-all"><X size={14} /></button>
               </div>
            )}

            <div className="flex items-center gap-2 md:gap-3">
              <button 
                onClick={() => setActivePanel(activePanel === 'chat' ? null : 'chat')}
                className={`p-3 rounded-xl transition-all duration-300 border flex items-center gap-2 ${activePanel === 'chat' ? 'bg-white border-white text-black scale-105 shadow-lg' : 'bg-blackline-yellow border-blackline-yellow text-black hover:bg-yellow-400'}`}
              >
                <RubiksCube size={20} className={activePanel === 'chat' ? 'animate-spin-once' : ''} />
                <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Assistant</span>
              </button>
            </div>
            
            <div className="relative">
              <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="flex items-center gap-2 text-gray-300 hover:text-blackline-yellow transition-colors py-2 font-medium">
                <Globe size={18} />
                <span className="text-xs font-bold hidden sm:inline">{currentLang}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {isLangMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsLangMenuOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-48 bg-zinc-900 rounded-lg shadow-xl py-2 z-50 border border-zinc-800 animate-fade-in">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button key={lang.code} onClick={() => handleLanguageChange(lang.code)} className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-zinc-800 transition-colors ${lang.code === currentLang ? 'text-blackline-yellow font-bold bg-zinc-800/50' : 'text-gray-300'}`}>
                        <span className="text-lg">{lang.flag}</span><span>{lang.label}</span>
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
      <main className="flex-grow container mx-auto px-4 pt-8 pb-32 relative pr-[60px]">
        {activeTab === 'discovery' && !hasSearched && (
          <div className="animate-fade-in">
             <div className="text-center mb-12">
               <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-2">Value Narratives</h2>
               <p className="text-gray-500 font-medium">Select a scope to generate strategic value analysis and talk tracks.</p>
             </div>
             <VisualNav onSelect={(q) => handleSearch(q)} t={t} />
          </div>
        )}

        {activeTab === 'discovery' && hasSearched && result && (
          <AnalysisResults data={result} query={query} onBack={handleBackToDiscovery} onNavigateToCalculator={() => setActiveTab('calculator')} t={t} />
        )}

        {isLoading && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-[100] animate-fade-in">
            <Loader2 className="w-20 h-20 text-blackline-yellow animate-spin mb-8" />
            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">{t.loading_title}</h2>
            <p className="text-gray-400 text-lg font-medium mt-2">{t.loading_desc}</p>
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="animate-fade-in">
             <ValueCalculator t={t} dealContext={dealContext} onSetDealContext={setDealContext} />
          </div>
        )}

        {activeTab === 'outside_in' && (
          <OutsideInGenerator t={t} onSetDealContext={setDealContext} dealContext={dealContext} />
        )}

        {activeTab === 'benchmarks' && (
          <CustomerBenchmarks t={t} />
        )}

        {activeTab === 'hub' && (
          <PlatformHub t={t} dealContext={dealContext} onSetDealContext={setDealContext} />
        )}

        {activeTab === 'sko' && (
          <SkoExplainer onClose={() => setActiveTab('discovery')} t={t} />
        )}
      </main>

      <RightRail contextString={getContextString()} dealContext={dealContext} onPivot={handlePivot} activePanelProp={activePanel} onPanelChange={setActivePanel} />

      {/* Smart Command Dock Footer */}
      <div className={`fixed bottom-6 left-0 w-full flex justify-center z-50 transition-all duration-500 pr-[60px] no-print ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}>
        <nav className="bg-zinc-900/90 backdrop-blur-xl p-2 rounded-2xl border border-zinc-700/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-1 md:gap-2 max-w-[95vw] overflow-x-auto scrollbar-hide">
          {[
            { id: 'sko', label: t.tab_sko },
            { id: 'discovery', label: t.tab_discovery },
            { id: 'outside_in', label: t.tab_outside_in },
            { id: 'calculator', label: t.tab_calculator },
            { id: 'benchmarks', label: t.tab_benchmarks },
            { id: 'hub', label: t.tab_hub }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                if (tab.id === 'discovery') setHasSearched(false);
              }} 
              className={`px-4 py-2.5 md:px-6 md:py-3 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] rounded-xl transition-all border whitespace-nowrap
                ${activeTab === tab.id 
                  ? 'bg-blackline-yellow text-black border-blackline-yellow shadow-[0_0_20px_rgba(249,183,52,0.3)] scale-105' 
                  : 'bg-transparent text-gray-400 border-transparent hover:border-zinc-700 hover:text-white hover:bg-zinc-800'}`}
            >
              {tab.label}
            </button>
          ))}
          <div className="h-6 w-px bg-zinc-800 mx-1 md:mx-2"></div>
          <div className="px-4 py-2 hidden lg:flex flex-col items-start min-w-[120px]">
             <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">{t.footer_internal}</span>
             <span className="text-[9px] font-bold text-gray-300 uppercase italic">V3.6 READY</span>
          </div>
        </nav>
      </div>

      <footer className="bg-black py-12 border-t border-zinc-900 mt-auto no-print pr-[60px]">
        <div className="container mx-auto px-6 flex flex-col items-center gap-4">
           <p className="text-[10px] text-zinc-700 font-bold uppercase tracking-[0.4em]">Value Delivery Intelligence System</p>
           <p className="text-[9px] text-zinc-800 uppercase tracking-widest">{t.footer_rights}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
