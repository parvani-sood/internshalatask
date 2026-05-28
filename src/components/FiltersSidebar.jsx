import React, { useState, useEffect, useRef } from 'react';
import FilterGroup from './FilterGroup';
import { SlidersHorizontal, X, Search, MapPin, Briefcase, Calendar, DollarSign } from 'lucide-react';

const FiltersSidebar = ({
  filters,
  setFilters,
  onClearAll,
  availableProfiles = [],
  availableLocations = [],
  className = ''
}) => {
  const [profileInput, setProfileInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [keywordInput, setKeywordInput] = useState(filters.keyword || '');
  
  const [showProfileSuggestions, setShowProfileSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  
  const profileRef = useRef(null);
  const locationRef = useRef(null);

  useEffect(() => {
    setKeywordInput(filters.keyword || '');
  }, [filters.keyword]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileSuggestions(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddProfile = (profile) => {
    if (!filters.profiles.includes(profile)) {
      setFilters(prev => ({
        ...prev,
        profiles: [...prev.profiles, profile]
      }));
    }
    setProfileInput('');
    setShowProfileSuggestions(false);
  };

  const handleRemoveProfile = (profile) => {
    setFilters(prev => ({
      ...prev,
      profiles: prev.profiles.filter(p => p !== profile)
    }));
  };

  const handleAddLocation = (loc) => {
    if (!filters.locations.includes(loc)) {
      setFilters(prev => ({
        ...prev,
        locations: [...prev.locations, loc]
      }));
    }
    setLocationInput('');
    setShowLocationSuggestions(false);
  };

  const handleRemoveLocation = (loc) => {
    setFilters(prev => ({
      ...prev,
      locations: prev.locations.filter(l => l !== loc)
    }));
  };

  const handleWfhChange = (e) => {
    setFilters(prev => ({ ...prev, wfh: e.target.checked }));
  };

  const handlePartTimeChange = (e) => {
    setFilters(prev => ({ ...prev, partTime: e.target.checked }));
  };

  const handleStipendChange = (e) => {
    setFilters(prev => ({ ...prev, minStipend: parseInt(e.target.value) || 0 }));
  };

  const handleDurationChange = (e) => {
    setFilters(prev => ({ ...prev, maxDuration: parseInt(e.target.value) || 0 }));
  };

  const handleKeywordSearchSubmit = (e) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, keyword: keywordInput }));
  };

  const filteredProfileSuggestions = availableProfiles.filter(
    p => p.toLowerCase().includes(profileInput.toLowerCase()) && !filters.profiles.includes(p)
  );

  const filteredLocationSuggestions = availableLocations.filter(
    l => l.toLowerCase().includes(locationInput.toLowerCase()) && !filters.locations.includes(l)
  );

  return (
    <div className={`space-y-4 ${className}`}>
      
      <div className="bg-white dark:bg-slate-800 border border-[#E8E8E8] dark:border-slate-700 rounded-xl p-6 shadow-[0_2px_4px_rgba(0,0,0,0.01)] transition-colors duration-200">

        <div className="flex justify-between items-center pb-4.5 border-b border-[#E8E8E8] dark:border-slate-800">
          <div className="flex items-center space-x-2 text-slate-800 dark:text-white font-bold text-[16px]">
            <SlidersHorizontal className="w-4.5 h-4.5 text-brand-blue" />
            <span>Filters</span>
          </div>
          <button
            onClick={() => {
              setProfileInput('');
              setLocationInput('');
              setKeywordInput('');
              onClearAll();
            }}
            className="text-brand-blue hover:text-brand-blue-hover text-[13.5px] font-bold transition-colors cursor-pointer"
          >
            Clear all
          </button>
        </div>

        <FilterGroup title="Profile">
          <div ref={profileRef} className="relative">
            
            {filters.profiles.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {filters.profiles.map(p => (
                  <span
                    key={p}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-brand-blue text-white text-[12px] font-semibold rounded-md shadow-sm"
                  >
                    {p}
                    <button
                      onClick={() => handleRemoveProfile(p)}
                      className="hover:bg-black/10 rounded-full p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            
            <div className="relative">
              <input
                type="text"
                value={profileInput}
                onChange={(e) => {
                  setProfileInput(e.target.value);
                  setShowProfileSuggestions(true);
                }}
                onFocus={() => setShowProfileSuggestions(true)}
                placeholder="e.g. Marketing"
                className="w-full pl-3 pr-8 py-2 border border-[#CCCCCC] dark:border-slate-600 dark:bg-slate-700 rounded-md text-[14px] text-slate-700 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-3" />
            </div>

            {showProfileSuggestions && profileInput && filteredProfileSuggestions.length > 0 && (
              <div className="absolute z-20 w-full mt-1 bg-white dark:bg-slate-700 border border-[#E8E8E8] dark:border-slate-600 rounded-md shadow-lg max-h-48 overflow-y-auto">
                {filteredProfileSuggestions.map(p => (
                  <button
                    key={p}
                    onClick={() => handleAddProfile(p)}
                    className="w-full text-left px-3 py-2 text-[13.5px] hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 border-b border-slate-100 dark:border-slate-650 last:border-b-0"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </FilterGroup>

        <FilterGroup title="Location">
          <div ref={locationRef} className="relative">
            
            {filters.locations.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {filters.locations.map(l => (
                  <span
                    key={l}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-brand-blue text-white text-[12px] font-semibold rounded-md shadow-sm"
                  >
                    {l}
                    <button
                      onClick={() => handleRemoveLocation(l)}
                      className="hover:bg-black/10 rounded-full p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="relative">
              <input
                type="text"
                value={locationInput}
                onChange={(e) => {
                  setLocationInput(e.target.value);
                  setShowLocationSuggestions(true);
                }}
                onFocus={() => setShowLocationSuggestions(true)}
                placeholder="e.g. Delhi"
                className="w-full pl-3 pr-8 py-2 border border-[#CCCCCC] dark:border-slate-600 dark:bg-slate-700 rounded-md text-[14px] text-slate-700 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors"
              />
              <MapPin className="w-4 h-4 text-slate-400 absolute right-2.5 top-3" />
            </div>

            {showLocationSuggestions && locationInput && filteredLocationSuggestions.length > 0 && (
              <div className="absolute z-20 w-full mt-1 bg-white dark:bg-slate-700 border border-[#E8E8E8] dark:border-slate-600 rounded-md shadow-lg max-h-48 overflow-y-auto">
                {filteredLocationSuggestions.map(l => (
                  <button
                    key={l}
                    onClick={() => handleAddLocation(l)}
                    className="w-full text-left px-3 py-2 text-[13.5px] hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 border-b border-slate-100 dark:border-slate-650 last:border-b-0"
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>
        </FilterGroup>

        <FilterGroup title="Work Mode">
          <label className="flex items-center space-x-2.5 cursor-pointer group py-1">
            <input
              type="checkbox"
              checked={filters.wfh}
              onChange={handleWfhChange}
              className="w-4 h-4 border border-[#CCCCCC] dark:border-slate-600 rounded cursor-pointer accent-brand-blue"
            />
            <span className="text-[14px] text-slate-700 dark:text-slate-200 select-none group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              Work from home
            </span>
          </label>

          <label className="flex items-center space-x-2.5 cursor-pointer group py-1">
            <input
              type="checkbox"
              checked={filters.partTime}
              onChange={handlePartTimeChange}
              className="w-4 h-4 border border-[#CCCCCC] dark:border-slate-600 rounded cursor-pointer accent-brand-blue"
            />
            <span className="text-[14px] text-slate-700 dark:text-slate-200 select-none group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              Part-time
            </span>
          </label>
        </FilterGroup>

        <FilterGroup title="Max Duration (Months)">
          <select
            value={filters.maxDuration}
            onChange={handleDurationChange}
            className="w-full px-3 py-2 border border-[#CCCCCC] dark:border-slate-600 dark:bg-slate-700 rounded-md text-[14px] text-slate-700 dark:text-slate-100 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors cursor-pointer"
          >
            <option value="0">Choose duration</option>
            <option value="1">1 Month</option>
            <option value="2">2 Months</option>
            <option value="3">3 Months</option>
            <option value="4">4 Months</option>
            <option value="5">5 Months</option>
            <option value="6">6 Months</option>
          </select>
        </FilterGroup>

        <FilterGroup title={`Desired min stipend`} className="last:border-b-0">
          <div className="flex justify-between items-center text-[13.5px] font-medium text-slate-800 dark:text-slate-200">
            <span>Minimum Stipend:</span>
            <span className="font-bold text-brand-blue">
              {filters.minStipend === 0 ? 'Any' : `₹ ${filters.minStipend.toLocaleString()}`}
            </span>
          </div>

          <div className="pt-2">
            <input
              type="range"
              min="0"
              max="50000"
              step="5000"
              value={filters.minStipend}
              onChange={handleStipendChange}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-medium">
              <span>0</span>
              <span>10K</span>
              <span>20K</span>
              <span>30K</span>
              <span>40K</span>
              <span>50K</span>
            </div>
          </div>
        </FilterGroup>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-[#E8E8E8] dark:border-slate-700 rounded-xl p-5 shadow-[0_2px_4px_rgba(0,0,0,0.01)] transition-colors duration-200">
        <h4 className="text-[12px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">
          Keyword Search
        </h4>
        <form onSubmit={handleKeywordSearchSubmit} className="flex gap-2">
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            placeholder="e.g. Design, Delhi, Google"
            className="flex-1 px-3 py-2 border border-[#CCCCCC] dark:border-slate-600 dark:bg-slate-700 rounded-md text-[13.5px] text-slate-700 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-blue transition-colors"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-brand-blue hover:bg-brand-blue-hover text-white rounded-md transition-colors flex items-center justify-center cursor-pointer shadow-sm"
            title="Search keyword"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default FiltersSidebar;
