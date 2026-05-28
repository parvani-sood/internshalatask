import React from 'react';

const FilterGroup = ({ title, children, className = '' }) => {
  return (
    <div className={`py-4.5 border-b border-[#E8E8E8] dark:border-slate-800 last:border-b-0 ${className}`}>
      <h4 className="text-[13.5px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
        {title}
      </h4>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
};

export default FilterGroup;
