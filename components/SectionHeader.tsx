import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  light?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  alignment = 'center',
  light = false 
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${alignment === 'center' ? 'text-center' : 'text-left'}`}>
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${light ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
        {title}
      </h2>
      {subtitle && (
        <div className={`w-24 h-1.5 bg-blue-600 rounded-full mb-6 ${alignment === 'center' ? 'mx-auto' : ''}`}></div>
      )}
      {subtitle && (
        <p className={`text-lg md:text-xl max-w-2xl ${alignment === 'center' ? 'mx-auto' : ''} ${light ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
