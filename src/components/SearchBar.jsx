import React from 'react';
import { Search, ChevronDown, ListFilter } from 'lucide-react';

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  count,
  sortBy,
  setSortBy,
  className = ''
}) => {
  return (
    <div className={`bg-white dark:bg-slate-800 border border-[#E8E8E8] dark:border-slate-700 rounded-xl p-4 md:p-5 shadow-[0_2px_4px_rgba(0,0,0,0.01)] transition-all-custom ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by profile title or company name..."
            className="w-full pl-10 pr-4 py-2.5 border border-[#CCCCCC] dark:border-slate-600 dark:bg-slate-700 rounded-md text-[14px] text-slate-700 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-blue transition-colors"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
        </div>

        <div className="flex items-center justify-between md:justify-end gap-3 min-w-[200px]">
          <span className="text-[13.5px] font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
            Sort by:
          </span>
          <div className="relative flex-1 md:flex-initial">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-48 pl-3 pr-8 py-2 border border-[#CCCCCC] dark:border-slate-600 dark:bg-slate-700 rounded-md text-[13.5px] text-slate-700 dark:text-slate-200 focus:outline-none focus:border-brand-blue transition-colors cursor-pointer appearance-none bg-none"
            >
              <option value="default">Popular / Match</option>
              <option value="recent">Most Recent</option>
              <option value="stipend-desc">Stipend: High to Low</option>
              <option value="stipend-asc">Stipend: Low to High</option>
              <option value="duration-asc">Duration: Short to Long</option>
              <option value="duration-desc">Duration: Long to Short</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
          </div>
        </div>

      </div>

      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 mt-4 pt-3 text-[13px] text-slate-500 dark:text-slate-400 font-medium">
        <div>
          Showing <span className="font-bold text-brand-blue dark:text-sky-400">{count}</span> internships
        </div>
        
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-[12px] font-bold text-slate-400 hover:text-brand-blue cursor-pointer transition-colors"
          >
            Clear Search
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
