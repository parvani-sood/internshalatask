import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

const EmptyState = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 bg-white dark:bg-slate-800 border border-[#E8E8E8] dark:border-slate-700 rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.01)] transition-colors duration-200">
      <div className="w-16 h-16 bg-[#F0F8FF] dark:bg-slate-700/50 rounded-full flex items-center justify-center text-brand-blue mb-4">
        <SearchX className="w-8 h-8" />
      </div>
      
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
        No internships found
      </h3>
      
      <p className="text-slate-500 dark:text-slate-400 max-w-md text-[14.5px] mb-6 leading-relaxed">
        We couldn't find any internships matching your search keywords or filter criteria. Try clearing some filters or searching for something else.
      </p>
      
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-5 py-2.5 bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold rounded-md shadow-sm transition-colors text-[14.5px] cursor-pointer"
      >
        <RotateCcw className="w-4.5 h-4.5" />
        Clear All Filters
      </button>
    </div>
  );
};

export default EmptyState;
