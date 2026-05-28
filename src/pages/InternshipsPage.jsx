import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import FiltersSidebar from '../components/FiltersSidebar';
import SearchBar from '../components/SearchBar';
import InternshipList from '../components/InternshipList';
import InternshipDetailsModal from '../components/InternshipDetailsModal';
import { mockInternshipsData } from '../data/mockData';
import { Filter, X, SlidersHorizontal } from 'lucide-react';

const INITIAL_FILTERS = {
  profiles: [],
  locations: [],
  wfh: false,
  partTime: false,
  minStipend: 0,
  maxDuration: 0,
  keyword: ''
};

const InternshipsPage = ({ darkMode, toggleDarkMode }) => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);

  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const fetchInternships = async () => {
    setLoading(true);
    setError(null);
    try {
      let responseData = null;
     
      try {
        const res = await axios.get('/hiring/search', { timeout: 4000 });
        responseData = res.data;
      } catch (proxyError) {
        console.warn('Proxy fetch failed, attempting direct fetch...', proxyError);
      
        const res = await axios.get('https://internshala.com/hiring/search', { timeout: 4000 });
        responseData = res.data;
      }

      if (responseData && responseData.internships_meta) {
        const list = Object.values(responseData.internships_meta);
        setInternships(list);
      } else {
        throw new Error('Invalid API response structure');
      }
    } catch (err) {
      console.error('API fetch failed completely. Falling back to mock data.', err);
     
      if (mockInternshipsData && mockInternshipsData.internships_meta) {
        setInternships(Object.values(mockInternshipsData.internships_meta));
      } else {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();

    try {
      const stored = localStorage.getItem('internshala_bookmarks');
      if (stored) {
        setBookmarkedIds(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse bookmarks from localStorage', e);
    }
  }, []);

  const handleBookmarkToggle = (id) => {
    const nextBookmarks = bookmarkedIds.includes(id)
      ? bookmarkedIds.filter(bId => bId !== id)
      : [...bookmarkedIds, id];
    
    setBookmarkedIds(nextBookmarks);
    localStorage.setItem('internshala_bookmarks', JSON.stringify(nextBookmarks));
  };

  const parseDurationMonths = (durationStr) => {
    if (!durationStr) return 0;
    const match = durationStr.match(/(\d+)\s*Month/i);
    return match ? parseInt(match[1]) : 0;
  };

  const getStipendValue = (item) => {
    return item.stipend?.salaryValue1 || 0;
  };

  const { availableProfiles, availableLocations } = useMemo(() => {
    const profilesSet = new Set();
    const locationsSet = new Set();

    internships.forEach(item => {
      if (item.profile_name) profilesSet.add(item.profile_name);
      if (item.location_names && Array.isArray(item.location_names)) {
        item.location_names.forEach(loc => locationsSet.add(loc));
      }
    });

    return {
      availableProfiles: Array.from(profilesSet).sort(),
      availableLocations: Array.from(locationsSet).sort()
    };
  }, [internships]);

  const filteredAndSortedInternships = useMemo(() => {
    let result = [...internships];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item =>
        (item.title && item.title.toLowerCase().includes(query)) ||
        (item.company_name && item.company_name.toLowerCase().includes(query))
      );
    }

    if (filters.profiles.length > 0) {
      result = result.filter(item =>
        item.profile_name && filters.profiles.includes(item.profile_name)
      );
    }

    if (filters.locations.length > 0) {
      result = result.filter(item => {
        if (!item.location_names) return false;
        return item.location_names.some(loc => filters.locations.includes(loc));
      });
    }

    if (filters.wfh) {
      result = result.filter(item => item.work_from_home === true);
    }

    if (filters.partTime) {
      result = result.filter(item => item.part_time === true);
    }

    if (filters.minStipend > 0) {
      result = result.filter(item => getStipendValue(item) >= filters.minStipend);
    }

    if (filters.maxDuration > 0) {
      result = result.filter(item => {
        const itemMonths = parseDurationMonths(item.duration);
        return itemMonths > 0 && itemMonths <= filters.maxDuration;
      });
    }

    if (filters.keyword.trim()) {
      const kw = filters.keyword.toLowerCase();
      result = result.filter(item =>
        (item.title && item.title.toLowerCase().includes(kw)) ||
        (item.company_name && item.company_name.toLowerCase().includes(kw)) ||
        (item.profile_name && item.profile_name.toLowerCase().includes(kw)) ||
        (item.location_names && item.location_names.some(loc => loc.toLowerCase().includes(kw)))
      );
    }

    if (sortBy === 'recent') {
      result.sort((a, b) => (b.postedOnDateTime || 0) - (a.postedOnDateTime || 0));
    } else if (sortBy === 'stipend-desc') {
      result.sort((a, b) => getStipendValue(b) - getStipendValue(a));
    } else if (sortBy === 'stipend-asc') {
      result.sort((a, b) => getStipendValue(a) - getStipendValue(b));
    } else if (sortBy === 'duration-asc') {
      result.sort((a, b) => parseDurationMonths(a.duration) - parseDurationMonths(b.duration));
    } else if (sortBy === 'duration-desc') {
      result.sort((a, b) => parseDurationMonths(b.duration) - parseDurationMonths(a.duration));
    }

    return result;
  }, [internships, filters, searchQuery, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchQuery, sortBy]);

  const handleClearAllFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] dark:bg-slate-900 transition-colors duration-200">
      
      <Navbar
        bookmarkedCount={bookmarkedIds.length}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <main className="max-w-[1200px] w-full mx-auto px-4 md:px-6 py-6 flex-1">

        <div className="mb-6 text-center md:text-left">
          <h1 className="text-[20px] md:text-[22px] font-bold text-slate-800 dark:text-white flex items-center justify-center md:justify-start gap-2">
            <span>{filteredAndSortedInternships.length} Total Internships</span>
          </h1>
          <p className="text-[13.5px] text-slate-500 dark:text-slate-400 mt-1">
            Apply to the latest summer and engineering internships in India.
          </p>
        </div>

        <div className="flex gap-6 items-start relative">

          <FiltersSidebar
            filters={filters}
            setFilters={setFilters}
            onClearAll={handleClearAllFilters}
            availableProfiles={availableProfiles}
            availableLocations={availableLocations}
            className="hidden md:block w-[300px] shrink-0 sticky top-[96px] max-h-[85vh] overflow-y-auto pr-1"
          />

          <div className="flex-1 w-full space-y-5">
        
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              count={filteredAndSortedInternships.length}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            <div className="md:hidden flex justify-center pb-1">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-white dark:bg-slate-800 border border-[#E8E8E8] dark:border-slate-700 rounded-xl shadow-sm text-[14.5px] font-bold text-slate-700 dark:text-slate-200 cursor-pointer active:scale-98 transition-transform"
              >
                <SlidersHorizontal className="w-4 h-4 text-brand-blue" />
                Filter Results
              </button>
            </div>

            <InternshipList
              internships={filteredAndSortedInternships}
              bookmarkedIds={bookmarkedIds}
              onBookmarkToggle={handleBookmarkToggle}
              onViewDetails={setSelectedInternship}
              loading={loading}
              error={error}
              onRetry={fetchInternships}
              onResetFilters={handleClearAllFilters}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={5}
            />
          </div>

        </div>

      </main>

      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
          <div className="w-[85%] max-w-[340px] h-full bg-white dark:bg-slate-900 p-5 overflow-y-auto flex flex-col shadow-2xl animate-in slide-in-from-right duration-250">
           
            <div className="flex justify-between items-center pb-4 border-b border-[#E8E8E8] dark:border-slate-800 mb-4">
              <span className="font-bold text-[16px] text-slate-800 dark:text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4.5 h-4.5 text-brand-blue" />
                Filters
              </span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-650 transition-colors"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            <div className="flex-1">
              <FiltersSidebar
                filters={filters}
                setFilters={setFilters}
                onClearAll={handleClearAllFilters}
                availableProfiles={availableProfiles}
                availableLocations={availableLocations}
                className="space-y-4"
              />
            </div>

            <div className="pt-4 border-t border-[#E8E8E8] dark:border-slate-800 mt-4">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-brand-blue hover:bg-brand-blue-hover text-white font-bold rounded-md shadow-sm transition-colors text-[14px] cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <InternshipDetailsModal
        internship={selectedInternship}
        isOpen={!!selectedInternship}
        onClose={() => setSelectedInternship(null)}
      />

    </div>
  );
};

export default InternshipsPage;
