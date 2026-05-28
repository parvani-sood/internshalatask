import React from 'react';

const Loader = ({ count = 3 }) => {
  return (
    <div className="space-y-5 w-full">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-slate-800 border border-[#E8E8E8] dark:border-slate-700 rounded-xl p-6 shadow-[0_2px_4px_rgba(0,0,0,0.01)] animate-pulse"
        >
          
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-2.5 w-2/3">
              <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-md w-3/4"></div>
              <div className="h-4 bg-slate-150 dark:bg-slate-750 rounded-md w-1/2"></div>
            </div>
            <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5 pt-2">
            <div className="space-y-2">
              <div className="h-3.5 bg-slate-200 dark:bg-slate-700 rounded-md w-1/2"></div>
              <div className="h-4 bg-slate-150 dark:bg-slate-750 rounded-md w-3/4"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3.5 bg-slate-200 dark:bg-slate-700 rounded-md w-1/2"></div>
              <div className="h-4 bg-slate-150 dark:bg-slate-750 rounded-md w-3/4"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3.5 bg-slate-200 dark:bg-slate-700 rounded-md w-1/2"></div>
              <div className="h-4 bg-slate-150 dark:bg-slate-750 rounded-md w-3/4"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3.5 bg-slate-200 dark:bg-slate-700 rounded-md w-1/2"></div>
              <div className="h-4 bg-slate-150 dark:bg-slate-750 rounded-md w-3/4"></div>
            </div>
          </div>

          <div className="flex space-x-2 mb-5">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-20"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-24"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-16"></div>
          </div>

          <div className="border-t border-[#F1F3F5] dark:border-slate-700 pt-4 flex justify-between items-center">
            <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-md w-24"></div>
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-md w-28"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loader;
