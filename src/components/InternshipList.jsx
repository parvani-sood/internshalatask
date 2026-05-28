import React from 'react';
import InternshipCard from './InternshipCard';
import Loader from './Loader';
import EmptyState from './EmptyState';
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const InternshipList = ({
  internships,
  bookmarkedIds,
  onBookmarkToggle,
  onViewDetails,
  loading,
  error,
  onRetry,
  onResetFilters,
  currentPage,
  setCurrentPage,
  itemsPerPage = 5
}) => {
  if (loading) {
    return <Loader count={3} />;
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl p-6 text-center shadow-[0_2px_4px_rgba(0,0,0,0.01)]">
        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center text-red-650 dark:text-red-400 mx-auto mb-4">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-md font-bold text-red-800 dark:text-red-400 mb-2">
          Failed to fetch internships
        </h3>
        <p className="text-red-600 dark:text-red-500 text-[14px] max-w-md mx-auto mb-5 leading-relaxed">
          {error.message || "An unexpected network error occurred while communicating with the Internshala servers."}
        </p>
        <button
          onClick={onRetry}
          className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-sm transition-colors text-[14px] cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (internships.length === 0) {
    return <EmptyState onReset={onResetFilters} />;
  }

  const totalItems = internships.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInternships = internships.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="space-y-5">
      
      <div className="space-y-4">
        {paginatedInternships.map(internship => (
          <InternshipCard
            key={internship.id}
            internship={internship}
            isBookmarked={bookmarkedIds.includes(internship.id)}
            onBookmarkToggle={() => onBookmarkToggle(internship.id)}
            onViewDetails={() => onViewDetails(internship)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border border-[#E8E8E8] dark:border-slate-700 rounded-xl px-5 py-4 bg-white dark:bg-slate-800 shadow-[0_2px_4px_rgba(0,0,0,0.01)] text-[14px] transition-colors duration-200">
          
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 px-3 py-1.5 border rounded-md font-semibold transition-colors text-[13px] ${
              currentPage === 1
                ? 'border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-650 cursor-not-allowed'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="hidden sm:flex items-center space-x-1.5">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              const isActive = currentPage === pageNum;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-9 h-9 rounded-md font-bold text-[13px] transition-colors cursor-pointer flex items-center justify-center ${
                    isActive
                      ? 'bg-brand-blue text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <span className="sm:hidden text-slate-500 dark:text-slate-400 font-semibold text-[13px]">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 px-3 py-1.5 border rounded-md font-semibold transition-colors text-[13px] ${
              currentPage === totalPages
                ? 'border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-650 cursor-not-allowed'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer'
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>
      )}
    </div>
  );
};

export default InternshipList;
