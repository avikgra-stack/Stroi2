import React, { useState } from 'react';
import { MapPin, X, ArrowRight } from 'lucide-react';
import { MapMarker } from '../types';

const MAP_MARKERS: MapMarker[] = [
  {
    id: 1,
    x: 20,
    y: 40,
    project: { title: 'ЖК "Северное Сияние"', year: '2023', link: '#', type: 'Жилой комплекс' }
  },
  {
    id: 2,
    x: 50,
    y: 30,
    project: { title: 'Бизнес-центр "Вершина"', year: '2022', link: '#', type: 'Коммерция' }
  },
  {
    id: 3,
    x: 70,
    y: 60,
    project: { title: 'Торговый центр "Плаза"', year: '2021', link: '#', type: 'Торговля' }
  },
  {
    id: 4,
    x: 40,
    y: 75,
    project: { title: 'Логистический парк', year: '2023', link: '#', type: 'Промышленность' }
  },
  {
    id: 5,
    x: 80,
    y: 25,
    project: { title: 'Частная Резиденция', year: '2024', link: '#', type: 'Частный дом' }
  }
];

export const ProjectMap: React.FC = () => {
  const [activeMarker, setActiveMarker] = useState<number | null>(null);

  return (
    <div className="w-full bg-slate-100 rounded-3xl overflow-hidden shadow-xl border border-slate-200 relative aspect-[16/9] md:aspect-[21/9]">
      {/* Abstract Map Background */}
      <div className="absolute inset-0 bg-slate-200">
        {/* Decorative Grid and Shapes simulating a map */}
        <div className="absolute inset-0 opacity-20" 
             style={{ 
               backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', 
               backgroundSize: '20px 20px' 
             }}>
        </div>
        
        {/* River/Road abstract shape */}
        <svg className="absolute inset-0 w-full h-full text-slate-300 pointer-events-none" preserveAspectRatio="none">
          <path d="M-10,100 C150,80 200,150 400,120 S600,50 800,100 S1200,150 1600,100" fill="none" stroke="currentColor" strokeWidth="20" />
          <path d="M0,50 C300,60 500,20 900,60 S1300,100 1500,50" fill="none" stroke="currentColor" strokeWidth="15" opacity="0.6" />
        </svg>

        {/* City Blocks abstract */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-slate-300/50 rounded-lg transform rotate-12"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-24 bg-slate-300/50 rounded-lg transform -rotate-6"></div>
      </div>

      <div className="absolute inset-0 p-8">
        <h3 className="text-xl font-bold text-slate-500 uppercase tracking-widest pointer-events-none select-none opacity-50">Карта Объектов</h3>
      </div>

      {/* Markers */}
      {MAP_MARKERS.map((marker) => (
        <div
          key={marker.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
        >
          <button
            onClick={() => setActiveMarker(activeMarker === marker.id ? null : marker.id)}
            className={`group relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg transition-all duration-300 ${
              activeMarker === marker.id 
                ? 'bg-blue-600 text-white scale-110' 
                : 'bg-white text-slate-700 hover:bg-blue-600 hover:text-white'
            }`}
          >
            <MapPin size={20} className={activeMarker === marker.id ? 'fill-current' : ''} />
            
            {/* Pulse effect for inactive markers */}
            {activeMarker !== marker.id && (
              <span className="absolute -inset-1 rounded-full bg-blue-600 opacity-20 animate-ping pointer-events-none"></span>
            )}
          </button>

          {/* Popup Card */}
          {activeMarker === marker.id && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 md:w-72 bg-white rounded-xl shadow-2xl p-4 md:p-5 z-20 animate-in fade-in zoom-in duration-200">
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveMarker(null); }}
                className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X size={16} />
              </button>
              
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">{marker.project.type}</div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">{marker.project.title}</h4>
              
              <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                <span>Завершен:</span>
                <span className="font-semibold">{marker.project.year}</span>
              </div>
              
              <a 
                href={marker.project.link}
                className="flex items-center justify-center w-full py-2 bg-slate-50 text-slate-900 rounded-lg hover:bg-slate-100 font-medium transition-colors text-sm group"
                onClick={(e) => e.preventDefault()}
              >
                Подробнее <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              
              {/* Triangle pointer */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45"></div>
            </div>
          )}
        </div>
      ))}
      
      {/* Overlay to close on click outside */}
      {activeMarker && (
        <div 
          className="absolute inset-0 z-0" 
          onClick={() => setActiveMarker(null)}
        ></div>
      )}
    </div>
  );
};