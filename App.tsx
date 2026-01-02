import React, { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown, X, Loader2, Menu, ChevronUp } from 'lucide-react';
import { VisualNav } from './components/VisualNav';
import { ValueCalculator } from './components/ValueCalculator';
import { AnalysisResults } from './components/AnalysisResults';
import { CustomerBenchmarks } from './components/CustomerBenchmarks';
import { PlatformHub } from './components/PlatformHub';
import { OutsideInGenerator } from './components/OutsideInGenerator';
import { SkoExplainer } from './components/SkoExplainer';
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
  const [isDockMinimized, setIsDockMinimized] = useState(false);
  
  // Refs for Scroll and Timer
  const lastScrollY = useRef(0);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);
  const isHoveringDock = useRef(false); // New Ref to track hover state
  
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

  // --- SMART SCROLL & MOUSE LOGIC ---
  useEffect(() => {
    // Unified function to handle "User Activity" (Mouse move or Scroll Up)
    const handleActivity = () => {
      setIsVisible(true);
      
      // Clear existing timer
      if (hideTimer.current) clearTimeout(hideTimer.current);

      // Start a new timer to hide after 3 seconds of inactivity
      // BUT only if we aren't currently hovering over the dock itself
      if (!isHoveringDock.current) {
        hideTimer.current = setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      
      // If scrolling down significantly, hide immediately (override timer)
      if (isScrollingDown && currentScrollY > 10) {
         setIsVisible(false);
         if (hideTimer.current) clearTimeout(hideTimer.current);
      } else {
         // If scrolling up, treat it as activity
         handleActivity();
      }
      
      lastScrollY.current = currentScrollY;
    };

    // Attach Listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleActivity); 

    // Initial Trigger
    handleActivity();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleActivity);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  // UX: Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsVisible(true);
  }, [activeTab]);

  // Handlers to prevent auto-hide while using the menu
  const handleNavMouseEnter = () => {
    isHoveringDock.current = true;
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setIsVisible(true);
  };

  const handleNavMouseLeave = () => {
    isHoveringDock.current = false;
    // Resume auto-hide timer when mouse leaves
    hideTimer.current = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

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
      
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-md text-white py-4 border-b border-zinc-800 sticky top-0 z-[60]">
        <div className="container mx-auto px-6 flex items-center justify-between relative">
          
          {/* Header Left: Logo only */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 bg-blackline-yellow rounded-sm">
              <span className="text-black font-extrabold text-2xl tracking-tighter">BL</span>
            </div>
          </div>

          {/* Header Center: Title Text (Centered Absolutely) */}
          <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-medium tracking-wide text-gray-200 text-center whitespace-nowrap hidden md:block">
            {activeTab === 'sko' ? (
              <>Value Driver <span className="font-bold text-white uppercase tracking-tighter">Enablement Platform</span></>
            ) : (
              <>Value Delivery <span className="font-bold text-white uppercase tracking-tighter">Execution Platform</span></>
            )}
          </h1>
          
          {/* Header Right */}
          <div className="flex items-center gap-4 md:gap-6">
            {dealContext.opportunityName && (
               <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 bg-zinc-900 rounded-full border border-zinc-800 animate-fade-in">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mr-1">Deal:</span>
                  <span className="text-xs font-bold text-white max-w-[150px] truncate">{dealContext.opportunityName}</span>
                  <button onClick={(e) => { e.stopPropagation(); setDealContext({}); }} className="ml-2 p-1 hover:bg-zinc-800 rounded-full text-zinc-600 hover:text-white transition-all"><X size={14} /></button>
               </div>
            )}

            {/* PreSales Mirror Badge */}
            <div className="flex items-center gap-4">
              <div className="hidden md:block h-8 w-px bg-zinc-800"></div>
              <div className="flex items-center justify-center px-4 h-10 bg-blackline-yellow rounded-sm">
                <span className="text-black font-extrabold text-lg tracking-tighter">PreSales</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 pt-8 pb-32 relative">
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

      {/* Smart Command Dock Footer - Collapsible & Auto-Hiding */}
      <div 
        className={`fixed bottom-6 left-0 w-full flex justify-center z-50 transition-all duration-500 no-print ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}
        onMouseEnter={handleNavMouseEnter}
        onMouseLeave={handleNavMouseLeave}
      >
        <nav 
          className={`bg-zinc-900/90 backdrop-blur-xl p-2 rounded-2xl border border-zinc-700/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center transition-all duration-300 ${isDockMinimized ? 'gap-0 px-3' : 'gap-1 md:gap-2 max-w-[95vw] overflow-x-auto scrollbar-hide'}`}
        >
          {/* Collapsible Content */}
          {!isDockMinimized && (
            <>
              {[
                { id: 'sko', label: t.tab_sko },
                { id: 'discovery', label: t.tab_discovery },
                { id: 'outside_in', label: t.tab_outside_in },
                { id: 'calculator', label: t.tab_calculator },
                { id: 'benchmarks', label: t.tab_benchmarks },
                { id: 'hub', label: t.tab_hub }
              ].map((tab) => (
                <React.Fragment key={tab.id}>
                  {/* INJECT BETA LABEL BEFORE 'DISCOVERY' TAB */}
                  {tab.id === 'discovery' && (
                    <div className="flex items-center px-3">
                      <span className="text-[10px] font-black text-blackline-yellow/80 tracking-widest">BETA <span className="text-white">→</span></span>
                    </div>
                  )}
                  
                  <button 
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
                </React.Fragment>
              ))}
              <div className="h-6 w-px bg-zinc-800 mx-1 md:mx-2"></div>
              <div className="px-4 py-2 hidden lg:flex flex-col items-start min-w-[120px]">
                  <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">{t.footer_internal}</span>
              </div>
            </>
          )}

          {/* Dock Minimize Toggle */}
          <button 
            onClick={() => setIsDockMinimized(!isDockMinimized)}
            className={`p-2 text-zinc-500 hover:text-white transition-colors ${!isDockMinimized ? 'border-l border-zinc-800 pl-3 ml-1' : ''}`}
            title={isDockMinimized ? "Expand Menu" : "Minimize Menu"}
          >
            {isDockMinimized ? (
              <div className="flex items-center gap-2 px-2">
                <Menu size={16} className="text-blackline-yellow" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Menu</span>
              </div>
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
        </nav>
      </div>

      <footer className="bg-black py-12 border-t border-zinc-900 mt-auto no-print">
        <div className="container mx-auto px-6 flex flex-col items-center gap-4">
           <p className="text-[10px] text-zinc-700 font-bold uppercase tracking-[0.4em]">Value Delivery Execution Platform</p>
           <p className="text-[9px] text-zinc-800 uppercase tracking-widest">{t.footer_rights}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
