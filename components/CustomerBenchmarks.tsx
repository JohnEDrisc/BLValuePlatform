import React, { useState } from 'react';
import { 
  Building2, 
  Filter, 
  TrendingUp, 
  DollarSign, 
  Briefcase, 
  Users, 
  Search,
  Factory,
  ShoppingBag,
  Landmark,
  HeartPulse,
  Zap,
  Cpu,
  Scale,
  Construction
} from 'lucide-react';
import { UIStrings } from '../types';
import { MOCK_BENCHMARK_DATA, INDUSTRIES, VALUE_DRIVERS_SELECTION } from '../constants';

interface CustomerBenchmarksProps {
  t: UIStrings;
}

export const CustomerBenchmarks: React.FC<CustomerBenchmarksProps> = ({ t }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [selectedDriver, setSelectedDriver] = useState<string>('All');
  const [selectedAccount, setSelectedAccount] = useState<string>('All');
  
  // Search state for Opportunity ID or Context
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique accounts for dropdowns
  const uniqueAccounts = Array.from(new Set(MOCK_BENCHMARK_DATA.map(item => item.companyName))).sort();

  const filteredData = MOCK_BENCHMARK_DATA.filter(item => {
    const matchIndustry = selectedIndustry === 'All' || item.industry === selectedIndustry;
    const matchDriver = selectedDriver === 'All' || item.primaryValueDriver === selectedDriver;
    const matchAccount = selectedAccount === 'All' || item.companyName === selectedAccount;
    
    // Search logic: checks ID, Name, or Opportunity Name
    const lowerQuery = searchQuery.toLowerCase();
    const matchSearch = searchQuery === '' || 
        (item.opportunityId && item.opportunityId.toLowerCase().includes(lowerQuery)) ||
        item.opportunityName.toLowerCase().includes(lowerQuery) ||
        item.companyName.toLowerCase().includes(lowerQuery);

    return matchIndustry && matchDriver && matchAccount && matchSearch;
  });

  // Calculate Aggregate Stats
  const totalCases = filteredData.length;
  const avgRoi = totalCases > 0 
    ? filteredData.reduce((acc, curr) => acc + curr.roiMultiple, 0) / totalCases 
    : 0;
  const totalSavings = filteredData.reduce((acc, curr) => acc + curr.annualSavings, 0);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const getIndustryIcon = (industryName: string) => {
     const ind = INDUSTRIES.find(i => i.id === industryName.toLowerCase() || t[i.nameKey] === industryName);
     if (!ind) return <Building2 size={24} className="text-gray-400" />;
     
     // Mapping generic names back to icons if needed, though simple switch works
     switch(industryName) {
        case 'Manufacturing': return <Factory size={24} className="text-blue-400" />;
        case 'Retail': return <ShoppingBag size={24} className="text-pink-400" />;
        case 'Financial Services': return <Landmark size={24} className="text-green-400" />;
        case 'Healthcare': return <HeartPulse size={24} className="text-red-400" />;
        case 'Energy': return <Zap size={24} className="text-yellow-400" />;
        case 'Technology': return <Cpu size={24} className="text-indigo-400" />;
        default: return <Building2 size={24} className="text-gray-400" />;
     }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto pb-20 animate-fade-in px-4">
      
      {/* Header */}
      <div className="mb-10 text-center relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blackline-yellow/20 border border-blackline-yellow/50 text-blackline-yellow text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
          <Construction size={14} />
          {t.bench_wip_badge || "Work in Progress"}
        </div>
        <h2 className="text-4xl font-bold text-white tracking-tight mb-3">
          {t.bench_title}
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg font-medium">
          {t.bench_subtitle}
        </p>
      </div>

      {/* MAIN SEARCH BAR - EMPHASIZED LINKAGE FIELD */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="relative group">
           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
             <Search size={22} className="text-gray-400 group-focus-within:text-blackline-yellow transition-colors" />
           </div>
           <input 
             type="text" 
             className="w-full bg-zinc-900/80 border border-zinc-700 text-white pl-12 pr-6 py-4 rounded-2xl focus:ring-2 focus:ring-blackline-yellow focus:border-transparent outline-none transition-all shadow-xl text-lg placeholder-zinc-500 font-medium"
             placeholder="Search by Opportunity ID (e.g. OPP-2026-001) or Context..."
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
           />
           <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
             <span className="bg-zinc-800 text-gray-300 text-xs px-2 py-1 rounded border border-zinc-700 font-mono">
               LINKAGE ID
             </span>
           </div>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex items-center gap-6">
           <div className="p-4 bg-blackline-yellow/10 rounded-full text-blackline-yellow">
              <TrendingUp size={32} />
           </div>
           <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{t.bench_stat_avg_roi}</p>
              <p className="text-4xl font-extrabold text-white">{avgRoi.toFixed(1)}x</p>
           </div>
        </div>
        
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex items-center gap-6">
           <div className="p-4 bg-green-500/10 rounded-full text-green-500">
              <DollarSign size={32} />
           </div>
           <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{t.bench_stat_total_sav}</p>
              <p className="text-4xl font-extrabold text-white">{formatCompactNumber(totalSavings)}</p>
           </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex items-center gap-6">
           <div className="p-4 bg-blue-500/10 rounded-full text-blue-500">
              <Briefcase size={32} />
           </div>
           <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{t.bench_stat_cases}</p>
              <p className="text-4xl font-extrabold text-white">{totalCases}</p>
           </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 bg-black/40 p-4 rounded-xl border border-zinc-800">
         <div className="flex items-center gap-2 text-gray-400 mr-4">
            <Filter size={18} />
            <span className="text-sm font-bold uppercase tracking-wider">Filters:</span>
         </div>
         
         <select 
            className="bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded-lg text-sm focus:ring-1 focus:ring-blackline-yellow outline-none"
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
         >
            <option value="All">{t.bench_filter_industry} (All)</option>
            {INDUSTRIES.map(i => <option key={i.id} value={t[i.nameKey] || i.id}>{t[i.nameKey] || i.id}</option>)}
         </select>

         <select 
            className="bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded-lg text-sm focus:ring-1 focus:ring-blackline-yellow outline-none"
            value={selectedDriver}
            onChange={(e) => setSelectedDriver(e.target.value)}
         >
            <option value="All">{t.bench_filter_driver} (All)</option>
            {VALUE_DRIVERS_SELECTION.map(d => <option key={d.id} value={d.value}>{d.value}</option>)}
         </select>

         <select 
            className="bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded-lg text-sm focus:ring-1 focus:ring-blackline-yellow outline-none"
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
         >
            <option value="All">{t.bench_filter_account} (All)</option>
            {uniqueAccounts.map(a => <option key={a} value={a}>{a}</option>)}
         </select>
      </div>

      {/* Data Table/Cards */}
      <div className="space-y-4">
         {filteredData.length > 0 ? (
           filteredData.map((item) => (
             <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-blackline-yellow/50 transition-all flex flex-col md:flex-row gap-6 group">
                {/* Icon & Industry */}
                <div className="flex flex-col items-center justify-center p-4 bg-black rounded-lg w-full md:w-32 text-center shrink-0 border border-zinc-800">
                   <div className="mb-2 p-2 bg-zinc-900 rounded-full">
                     {getIndustryIcon(item.industry)}
                   </div>
                   <span className="text-xs font-bold text-gray-500 uppercase">{item.industry}</span>
                </div>

                {/* Content */}
                <div className="flex-grow">
                   <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-blackline-yellow transition-colors">{item.companyName}</h3>
                      {item.opportunityId && <span className="text-xs font-mono text-gray-600 bg-black px-2 py-1 rounded border border-zinc-800">{item.opportunityId}</span>}
                   </div>
                   <div className="text-sm text-gray-400 font-medium mb-4 flex items-center gap-2">
                      <span className="text-gray-500">{item.opportunityName}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                      <span>{item.revenueBand}</span>
                   </div>
                   <p className="text-gray-300 italic mb-4">"{item.description}"</p>
                   
                   <div className="flex flex-wrap gap-2">
                      {item.products.map(p => (
                         <span key={p} className="text-xs bg-black border border-zinc-700 px-2 py-1 rounded text-gray-400">{p}</span>
                      ))}
                   </div>
                </div>

                {/* Metrics */}
                <div className="w-full md:w-48 flex flex-row md:flex-col justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-zinc-800 pt-4 md:pt-0 md:pl-6 shrink-0">
                   <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">{t.bench_stat_avg_roi}</p>
                      <p className="text-2xl font-extrabold text-blue-400">{item.roiMultiple}x</p>
                   </div>
                   <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">{t.bench_stat_total_sav}</p>
                      <p className="text-2xl font-extrabold text-green-500">{formatCompactNumber(item.annualSavings)}</p>
                   </div>
                </div>
             </div>
           ))
         ) : (
           <div className="text-center py-20 bg-zinc-900/50 rounded-xl border border-zinc-800 border-dashed">
              <Search size={48} className="text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No benchmarks found</h3>
              <p className="text-gray-400">Try adjusting filters or search criteria.</p>
           </div>
         )}
      </div>
    </div>
  );
};

// Helper
function formatCompactNumber(number: number) {
  return new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(number);
}