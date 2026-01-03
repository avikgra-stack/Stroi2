import React, { useState, useEffect } from 'react';
import { Calculator, Info } from 'lucide-react';
import { Button } from './Button';

type BuildingType = 'residential' | 'commercial' | 'industrial';
type MaterialType = 'frame' | 'brick' | 'monolith';

export const CostCalculator: React.FC = () => {
  const [area, setArea] = useState<number>(100);
  const [type, setType] = useState<BuildingType>('residential');
  const [material, setMaterial] = useState<MaterialType>('brick');
  const [cost, setCost] = useState<number>(0);

  // Constants for calculation (RUB per sq meter base)
  const BASE_RATE = 50000;
  
  const TYPE_MULTIPLIERS = {
    residential: 1.0,
    commercial: 1.2,
    industrial: 0.9,
  };

  const MATERIAL_MULTIPLIERS = {
    frame: 0.8,
    brick: 1.1,
    monolith: 1.3,
  };

  useEffect(() => {
    const typeMult = TYPE_MULTIPLIERS[type];
    const matMult = MATERIAL_MULTIPLIERS[material];
    const calculated = Math.round(area * BASE_RATE * typeMult * matMult);
    setCost(calculated);
  }, [area, type, material]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="bg-slate-900 p-6 text-white flex items-center gap-3">
        <Calculator className="text-blue-400" />
        <h3 className="text-xl font-bold">Калькулятор стоимости</h3>
      </div>
      
      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Controls */}
        <div className="space-y-6">
          
          {/* Building Type */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">Тип строения</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'residential', label: 'Жилой дом' },
                { id: 'commercial', label: 'Офис' },
                { id: 'industrial', label: 'Склад' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setType(item.id as BuildingType)}
                  className={`py-2 px-1 text-sm rounded-lg border transition-all ${
                    type === item.id 
                      ? 'bg-slate-900 text-white border-slate-900' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Area Slider */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="block text-sm font-medium text-slate-700">Площадь (м²)</label>
              <span className="font-bold text-blue-700 bg-blue-50 px-2 rounded">{area}</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="2000" 
              step="10" 
              value={area} 
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>50 м²</span>
              <span>2000 м²</span>
            </div>
          </div>

          {/* Material */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">Материалы</label>
            <select 
              value={material} 
              onChange={(e) => setMaterial(e.target.value as MaterialType)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="frame">Каркасная технология (Эконом)</option>
              <option value="brick">Кирпич / Газобетон (Стандарт)</option>
              <option value="monolith">Монолит (Премиум)</option>
            </select>
          </div>

        </div>

        {/* Result */}
        <div className="bg-slate-50 rounded-xl p-6 flex flex-col justify-between border border-slate-100">
          <div>
            <h4 className="text-slate-500 font-medium mb-1">Ориентировочная стоимость:</h4>
            <div className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight text-blue-600 mb-2">
              {formatCurrency(cost)}
            </div>
            <p className="text-sm text-slate-400 flex items-start gap-2 mt-4">
              <Info size={16} className="flex-shrink-0 mt-0.5" />
              Это предварительный расчет. Окончательная стоимость зависит от геологии участка, сложности проекта и текущих цен на материалы.
            </p>
          </div>
          
          <div className="mt-8">
            <Button fullWidth variant="primary" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}>
              Заказать точный расчет
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};