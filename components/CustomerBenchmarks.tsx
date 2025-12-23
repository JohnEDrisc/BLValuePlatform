import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  BarChart2, 
  ArrowRight, 
  Building2, 
  Users, 
  DollarSign, 
  Briefcase 
} from 'lucide-react';
import { UIStrings } from '../types';
import { MOCK_BENCHMARK_DATA, INDUSTRIES, VALUE_DRIVERS_SELECTION } from '../constants';

interface CustomerBenchmarksProps {
  t: UIStrings;
}

export const CustomerBenchmarks: React.FC<CustomerBenchmarksProps> = ({ t }) => {
  const [filterIndustry, setFilterIndustry] = useState<string>('');
  const [filterDriver, setFilterDriver] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = MOCK_BENCHMARK_DATA.filter(item => {
    const matchesIndustry = filterIndustry ? item.industry === filterIndustry : true;
    const matchesDriver = filterDriver ? item.primaryValueDriver === filterDriver : true;
    const matchesSearch = searchTerm ? 
      item.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    return matchesIndustry && matchesDriver && matchesSearch;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 pb-20 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">
           <BarChart2 size={14} /> {t.bench_wip_badge || 'BETA'}
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
           {t.bench_title || 'Customer Benchmarks'}
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
           {t.bench_subtitle || 'Validated outcomes from the global BlackLine community.'}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl mb-8 flex flex-col md:flex-row gap-4">
         <div className="flex-1 relative">
            <Search className="absolute left-4 top-3.5 text-zinc-500" size={20} />
            <input 
              type="text" 
              placeholder="Search companies or outcomes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-orange-500 transition-colors"
            />
         </div>
         <div className="flex gap-4">
            <select 
              value={filterIndustry} 
              onChange={(e) => setFilterIndustry(e.target.value)}
              className="bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
            >
               <option value="">All Industries</option>
               {INDUSTRIES.map(i => <option key={i.id} value={i.id}>{t[i.nameKey] || i.id}</option>)}
            </select>
            <select 
              value={filterDriver} 
              onChange={(e) => setFilterDriver(e.target.value)}
              className="bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
            >
               <option value="">All Value Drivers</option>
               {VALUE_DRIVERS_SELECTION.map(d => <option key={d.id} value={d.value}>{d.value}</option>)}
            </select>
         </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {filteredData.map((item) => (
            <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-orange-500/50 transition-all group flex flex-col h-full">
               <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center border border-zinc-800 text-orange-500">
                     <Building2 size={24} />
                  </div>
                  <div className="bg-orange-500/10 text-orange-400 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider">
                     {item.roiMultiple}x ROI
                  </div>
               </div>
               
               <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">{item.companyName}</h3>
               <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">{item.industry} • {item.revenueBand}</p>
               
               <p className="text-zinc-300 mb-8 flex-grow leading-relaxed">
                  "{item.description}"
               </p>

               <div className="border-t border-zinc-800 pt-6 mt-auto">
                  <div className="flex justify-between items-center mb-4">
                     <span className="text-xs font-bold text-zinc-500 uppercase">Annual Savings</span>
                     <span className="text-xl font-black text-white">${(item.annualSavings / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                     {item.products.map((p, idx) => (
                        <span key={idx} className="px-2 py-1 bg-black border border-zinc-800 rounded text-[10px] font-bold text-zinc-400 uppercase">
                           {p}
                        </span>
                     ))}
                  </div>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};
