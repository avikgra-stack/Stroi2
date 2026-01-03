import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Testimonial } from '../types';

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Александр Смирнов',
    role: 'Генеральный директор, ООО "ТехноПарк"',
    content: 'Сотрудничество с "СтройИнвест" превзошло наши ожидания. Проект логистического центра был сдан на 2 месяца раньше срока без потери качества. Профессионализм команды виден на каждом этапе.',
    avatarUrl: 'https://picsum.photos/100/100?random=20'
  },
  {
    id: 2,
    name: 'Елена Краснова',
    role: 'Частный заказчик',
    content: 'Мы мечтали о загородном доме, который станет родовым гнездом. Спасибо архитекторам и строителям за внимательность к деталям. Дом получился теплым, светлым и невероятно уютным.',
    avatarUrl: 'https://picsum.photos/100/100?random=21'
  },
  {
    id: 3,
    name: 'Дмитрий Волков',
    role: 'Управляющий БЦ "Вершина"',
    content: 'Реконструкция офисного здания в центре города — сложная задача. "СтройИнвест" справились блестяще, организовав работы так, что мы практически не останавливали деятельность арендаторов.',
    avatarUrl: 'https://picsum.photos/100/100?random=22'
  }
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Decorative quotes */}
      <Quote className="absolute top-0 left-0 text-blue-100 w-24 h-24 -translate-x-8 -translate-y-8 transform -scale-x-100 z-0 opacity-50 md:opacity-100" />
      
      <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12 z-10 border border-slate-100">
        <div className="flex flex-col items-center text-center">
          
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-100 mb-6 shadow-md">
            <img 
              src={TESTIMONIALS[currentIndex].avatarUrl || `https://ui-avatars.com/api/?name=${TESTIMONIALS[currentIndex].name}`} 
              alt={TESTIMONIALS[currentIndex].name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Stars */}
          <div className="flex gap-1 text-blue-500 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill="currentColor" />
            ))}
          </div>

          {/* Text */}
          <blockquote className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed mb-8 italic">
            "{TESTIMONIALS[currentIndex].content}"
          </blockquote>

          {/* Author */}
          <div>
            <div className="font-bold text-slate-900 text-lg">{TESTIMONIALS[currentIndex].name}</div>
            <div className="text-slate-500 text-sm">{TESTIMONIALS[currentIndex].role}</div>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2">
          <button 
            onClick={prev}
            className="p-3 bg-white text-slate-900 rounded-full shadow-lg border border-slate-100 hover:bg-blue-600 hover:text-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2">
          <button 
            onClick={next}
            className="p-3 bg-white text-slate-900 rounded-full shadow-lg border border-slate-100 hover:bg-blue-600 hover:text-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === currentIndex ? 'bg-blue-600 w-6' : 'bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};