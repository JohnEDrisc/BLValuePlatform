
import React, { useState } from 'react';
import { PRODUCTS, INDUSTRIES, VALUE_DRIVERS_SELECTION, PERSONAS } from '../constants';
import * as Icons from 'lucide-react';
import { UIStrings } from '../types';
import { ChevronDown, LayoutGrid, Building2, TrendingUp, Layers, ArrowRight, CheckCircle2, X, Users } from 'lucide-react';

interface VisualNavProps {
  onSelect: (query: string) => void;
  t: UIStrings;
}

export const VisualNav: React.FC<VisualNavProps> = ({ onSelect, t }) => {
  const [openSection, setOpenSection] = useState<string | null>(null); // Default closed for better discovery
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const toggleSelection = (item: string) => {
    const newSet = new Set(selectedItems);
    if (newSet.has(item)) {
      newSet.delete(item);
    } else {
      newSet.add(item);
    }
    setSelectedItems(newSet);
  };

  const clearSelection = () => {
    setSelectedItems(new Set());
  };

  const handleGenerate = () => {
    if (selectedItems.size === 0) return;
    onSelect(Array.from(selectedItems).join(', '));
  };

  const isSelected = (item: string) => selectedItems.has(item);

  const getProductsByCategory = (category: string) => PRODUCTS.filter(p => p.category === category);

  const solutionPillars = [
    { title: t.cat_platform, items: getProductsByCategory('Platform'), headerColor: 'text-blackline-yellow' },
    { title: t.cat_close, items: getProductsByCategory('Financial Close'), headerColor: 'text-blackline-yellow' },
    { title: t.cat_intercompany, items: getProductsByCategory('Intercompany'), headerColor: 'text-blackline-yellow' },
    { title: t.cat_invoice, items: getProductsByCategory('Invoice-to-Cash'), headerColor: 'text-blackline-yellow' },
  ];

  // Group Personas
  const groupedPersonas = PERSONAS.reduce((acc, persona) => {
    const group = persona.group || 'Other';
    if (!acc[group]) acc[group] = [];
    acc[group].push(persona);
    return acc;
  }, {} as Record<string, typeof PERSONAS>);

  const personaGroups = Object.keys(groupedPersonas);

  return (
    <div className="w-full max-w-[1000px] mx-auto mt-12 mb-32 animate-fade-in-up px-4 md:px-6 space-y-4 relative">
      
      {/* SELECTION FLOATING BAR */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 transition-all duration-300 ${selectedItems.size > 0 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        <div className="bg-blackline-yellow text-black p-4 rounded-xl shadow-[0_0_50px_rgba(249,183,52,0.4)] border border-white/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="bg-black/10 p-2 rounded-full">
               <span className="font-bold font-mono text-lg w-6 h-6 flex items-center justify-center">{selectedItems.size}</span>
             </div>
             <div className="flex flex-col">
               <span className="font-bold text-sm uppercase tracking-wide">Items Selected</span>
               <span className="text-xs opacity-75 truncate max-w-[200px]">{Array.from(selectedItems).join(', ')}</span>
             </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={clearSelection}
              className="p-3 hover:bg-black/10 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
            <button 
              onClick={handleGenerate}
              className="px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-xl"
            >
              Generate Analysis <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 1. END-TO-DEPLATFORM BUTTON */}
      <button
        onClick={() => toggleSelection("BlackLine Financial Operations Management Platform (End-to-End Suite)")}
        className={`w-full flex items-center justify-between p-6 rounded-lg border transition-all duration-300 group text-left
          ${isSelected("BlackLine Financial Operations Management Platform (End-to-End Suite)") 
            ? 'bg-zinc-900 border-blackline-yellow shadow-[0_0_20px_rgba(249,183,52,0.1)]' 
            : 'bg-gradient-to-r from-zinc-900 to-black border-blackline-yellow/30 hover:border-blackline-yellow'
          }`}
      >
        <div className="flex items-center gap-4">
          <div className={`p-2.5 rounded-lg shadow-lg transition-colors ${isSelected("BlackLine Financial Operations Management Platform (End-to-End Suite)") ? 'bg-blackline-yellow text-black' : 'bg-blackline-yellow text-black'}`}>
            <Layers size={24} strokeWidth={2} />
          </div>
          <div>
             <span className={`block text-lg md:text-xl font-bold tracking-tight transition-colors ${isSelected("BlackLine Financial Operations Management Platform (End-to-End Suite)") ? 'text-blackline-yellow' : 'text-white group-hover:text-blackline-yellow'}`}>
              {t.platform_value_btn}
             </span>
             <span className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
              {t.platform_value_desc}
             </span>
          </div>
        </div>
        <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${isSelected("BlackLine Financial Operations Management Platform (End-to-End Suite)") ? 'bg-blackline-yellow border-blackline-yellow' : 'border-zinc-600 group-hover:border-blackline-yellow'}`}>
           {isSelected("BlackLine Financial Operations Management Platform (End-to-End Suite)") && <CheckCircle2 size={16} className="text-black" />}
        </div>
      </button>
      
      {/* 2. SOLUTIONS SECTION */}
      <div className={`border rounded-lg overflow-hidden transition-all duration-300 ${openSection === 'solutions' ? 'border-zinc-700 bg-zinc-900/40' : 'border-zinc-800 bg-zinc-900/40'}`}>
        <button 
          onClick={() => toggleSection('solutions')}
          className={`w-full flex items-center justify-between p-5 md:p-6 hover:bg-zinc-800/50 transition-colors ${openSection === 'solutions' ? 'bg-zinc-800/50' : ''}`}
        >
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-lg ${openSection === 'solutions' ? 'bg-blackline-yellow text-black' : 'bg-zinc-800 text-zinc-400'}`}>
              <LayoutGrid size={20} />
            </div>
            <span className={`text-lg md:text-xl font-bold tracking-tight ${openSection === 'solutions' ? 'text-white' : 'text-gray-200'}`}>
              {t.nav_solutions}
            </span>
          </div>
          <ChevronDown 
            size={20} 
            className={`text-gray-400 transition-transform duration-300 ${openSection === 'solutions' ? 'rotate-180' : ''}`} 
          />
        </button>

        {openSection === 'solutions' && (
           <div className="p-6 md:p-8 border-t border-zinc-800 bg-black/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                {solutionPillars.map((pillar, idx) => (
                  <div key={idx} className="flex flex-col">
                    <div className="mb-4 flex items-end pb-2 border-b border-zinc-800">
                      <button 
                        onClick={() => toggleSelection(pillar.title)}
                        className={`text-left text-xs font-bold uppercase tracking-wide hover:text-white hover:underline transition-all flex items-center gap-1 group/header ${isSelected(pillar.title) ? 'text-blackline-yellow' : pillar.headerColor}`}
                      >
                        {pillar.title}
                        {isSelected(pillar.title) && <CheckCircle2 size={12} />}
                      </button>
                    </div>
                    <div className="flex flex-col gap-2">
                      {pillar.items.map((p) => {
                        // @ts-ignore
                        const IconComponent = Icons[p.icon] || Icons.Box;
                        const active = isSelected(p.name);
                        return (
                          <button
                            key={p.id}
                            onClick={() => toggleSelection(p.name)}
                            className={`w-full text-left group flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${active ? 'bg-zinc-800 border border-zinc-700' : 'hover:bg-zinc-800 border border-transparent'}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`${active ? 'text-blackline-yellow' : 'text-zinc-400 group-hover:text-blackline-yellow'} transition-colors flex-shrink-0`}>
                                <IconComponent size={16} strokeWidth={2} />
                              </div>
                              <span className={`text-sm font-medium leading-tight ${active ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                                {p.name}
                              </span>
                            </div>
                            {active && <CheckCircle2 size={14} className="text-blackline-yellow" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
           </div>
        )}
      </div>

      {/* 3. INDUSTRIES SECTION */}
      <div className={`border rounded-lg overflow-hidden transition-all duration-300 ${openSection === 'industries' ? 'border-zinc-700 bg-zinc-900/40' : 'border-zinc-800 bg-zinc-900/40'}`}>
        <button 
          onClick={() => toggleSection('industries')}
          className={`w-full flex items-center justify-between p-5 md:p-6 hover:bg-zinc-800/50 transition-colors ${openSection === 'industries' ? 'bg-zinc-800/50' : ''}`}
        >
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-lg ${openSection === 'industries' ? 'bg-blue-500 text-black' : 'bg-zinc-800 text-zinc-400'}`}>
              <Building2 size={20} />
            </div>
            <span className={`text-lg md:text-xl font-bold tracking-tight ${openSection === 'industries' ? 'text-white' : 'text-gray-200'}`}>
              {t.nav_industries}
            </span>
          </div>
          <ChevronDown 
            size={20} 
            className={`text-gray-400 transition-transform duration-300 ${openSection === 'industries' ? 'rotate-180' : ''}`} 
          />
        </button>

        {openSection === 'industries' && (
          <div className="p-6 md:p-8 border-t border-zinc-800 bg-black/20 animate-fade-in">
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {INDUSTRIES.map((ind) => {
                  // @ts-ignore
                  const IconComponent = Icons[ind.icon] || Icons.Building;
                  const displayName = t[ind.nameKey] || ind.id;
                  const active = isSelected(displayName);
                  
                  return (
                    <button
                      key={ind.id}
                      onClick={() => toggleSelection(displayName)}
                      className={`group flex flex-col items-center justify-center p-6 rounded-xl border transition-all duration-200 text-center gap-4 h-full relative
                        ${active 
                          ? 'bg-zinc-800 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                          : 'bg-zinc-900 border-zinc-800 hover:border-blue-500/50 hover:bg-zinc-800'
                        }`}
                    >
                      {active && <div className="absolute top-3 right-3 text-blue-500"><CheckCircle2 size={16} /></div>}
                      <div className={`p-3 rounded-full transition-colors ${active ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-950 text-zinc-400 group-hover:text-blue-400 group-hover:bg-blue-500/10'}`}>
                        <IconComponent size={24} strokeWidth={1.5} />
                      </div>
                      <span className={`text-sm font-medium ${active ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                        {displayName}
                      </span>
                    </button>
                  );
                })}
             </div>
          </div>
        )}
      </div>

       {/* 4. PERSONA SECTION */}
      <div className={`border rounded-lg overflow-hidden transition-all duration-300 ${openSection === 'personas' ? 'border-zinc-700 bg-zinc-900/40' : 'border-zinc-800 bg-zinc-900/40'}`}>
        <button 
          onClick={() => toggleSection('personas')}
          className={`w-full flex items-center justify-between p-5 md:p-6 hover:bg-zinc-800/50 transition-colors ${openSection === 'personas' ? 'bg-zinc-800/50' : ''}`}
        >
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-lg ${openSection === 'personas' ? 'bg-purple-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
              <Users size={20} />
            </div>
            <span className={`text-lg md:text-xl font-bold tracking-tight ${openSection === 'personas' ? 'text-white' : 'text-gray-200'}`}>
              {t.nav_personas || "Browse by Persona"}
            </span>
          </div>
          <ChevronDown 
            size={20} 
            className={`text-gray-400 transition-transform duration-300 ${openSection === 'personas' ? 'rotate-180' : ''}`} 
          />
        </button>

        {openSection === 'personas' && (
          <div className="p-6 md:p-8 border-t border-zinc-800 bg-black/20 animate-fade-in">
             <div className="flex flex-col gap-8">
                {personaGroups.map((group) => (
                  <div key={group}>
                    <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-4 border-b border-zinc-800 pb-2 text-purple-400/80">{group}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {groupedPersonas[group].map((person) => {
                          // @ts-ignore
                          const IconComponent = Icons[person.icon] || Icons.User;
                          const active = isSelected(person.name);
                          
                          return (
                            <button
                              key={person.id}
                              onClick={() => toggleSelection(person.name)}
                              className={`group flex flex-col items-center justify-center p-6 rounded-xl border transition-all duration-200 text-center gap-4 h-full relative
                                ${active 
                                  ? 'bg-zinc-800 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.15)]' 
                                  : 'bg-zinc-900 border-zinc-800 hover:border-purple-500/50 hover:bg-zinc-800'
                                }`}
                            >
                              {active && <div className="absolute top-3 right-3 text-purple-500"><CheckCircle2 size={16} /></div>}
                              <div className={`p-3 rounded-full transition-colors ${active ? 'bg-purple-500/20 text-purple-400' : 'bg-zinc-950 text-zinc-400 group-hover:text-purple-400 group-hover:bg-purple-500/10'}`}>
                                <IconComponent size={24} strokeWidth={1.5} />
                              </div>
                              <span className={`text-sm font-medium leading-tight ${active ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                                {person.name}
                              </span>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}
      </div>

    </div>
  );
};
