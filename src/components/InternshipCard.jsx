import React, { useState } from 'react';
import { Bookmark, Calendar, Clock, DollarSign, MapPin, Send, Briefcase, Award } from 'lucide-react';

const InternshipCard = ({
  internship,
  isBookmarked,
  onBookmarkToggle,
  onViewDetails
}) => {
  const {
    id,
    title,
    company_name,
    work_from_home,
    location_names = [],
    duration,
    stipend,
    posted_by_label,
    posted_by_label_type,
    application_deadline,
    is_ppo,
    ppo_label_value,
    company_logo,
    labels_app_in_card = []
  } = internship;

  const [logoError, setLogoError] = useState(false);

  const stipendText = stipend?.salary || "Unpaid";

  const logoUrl = company_logo && !logoError
    ? `https://internshala.com/uploads/logo/${company_logo}`
    : null;

  const companyInitial = company_name ? company_name.charAt(0).toUpperCase() : 'C';

  return (
    <div className="bg-white dark:bg-slate-800 border border-[#E8E8E8] dark:border-slate-700 rounded-xl p-5 md:p-6 shadow-[0_2px_4px_rgba(0,0,0,0.01)] hover:shadow-md transition-all-custom group flex flex-col justify-between">

      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="flex-1 space-y-1.5">
          
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 border border-[#CCCCCC] dark:border-slate-600 rounded bg-slate-50 dark:bg-slate-700 text-[11px] font-semibold text-slate-500 dark:text-slate-350">
            <Send className="w-3 h-3 text-[#198754]" /> Actively hiring
          </span>

          <h3
            onClick={onViewDetails}
            className="text-[17px] font-bold text-slate-800 dark:text-white cursor-pointer group-hover:text-brand-blue transition-colors leading-snug pt-1"
          >
            {title}
          </h3>

          <div className="flex items-center flex-wrap gap-2 text-[14px] text-slate-500 dark:text-slate-400 font-medium">
            <span>{company_name}</span>
          </div>
        </div>

        <div className="w-12 h-12 md:w-14 md:h-14 border border-slate-100 dark:border-slate-700 rounded-lg flex items-center justify-center overflow-hidden bg-slate-55 dark:bg-slate-700 shrink-0">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${company_name} logo`}
              onError={() => setLogoError(true)}
              className="w-full h-full object-contain p-1"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 dark:from-slate-700 dark:to-slate-800 text-brand-blue dark:text-sky-400 font-bold text-[18px]">
              {companyInitial}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[13.5px] text-slate-600 dark:text-slate-300 mb-4.5">
        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="font-medium">
          {work_from_home ? "Work From Home" : location_names.join(', ') || "Multiple Locations"}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4.5 border-b border-[#F1F3F5] dark:border-slate-700 mb-4 text-[13px]">
        
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            <span className="font-medium text-[11.5px] uppercase tracking-wider">Start Date</span>
          </div>
          <p className="text-slate-700 dark:text-slate-200 font-semibold">
            Starts Immediately
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1 text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-medium text-[11.5px] uppercase tracking-wider">Duration</span>
          </div>
          <p className="text-slate-700 dark:text-slate-200 font-semibold">
            {duration}
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1 text-slate-400">
            <DollarSign className="w-3.5 h-3.5" />
            <span className="font-medium text-[11.5px] uppercase tracking-wider">Stipend</span>
          </div>
          <p className="text-slate-700 dark:text-slate-200 font-semibold truncate" title={stipendText}>
            {stipendText}
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1 text-slate-400">
            <Briefcase className="w-3.5 h-3.5" />
            <span className="font-medium text-[11.5px] uppercase tracking-wider">Apply By</span>
          </div>
          <p className="text-slate-700 dark:text-slate-200 font-semibold">
            {application_deadline || "Apply immediately"}
          </p>
        </div>

      </div>

      <div className="flex flex-wrap gap-2 items-center mb-4">
        {is_ppo && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-brand-warning-bg text-brand-warning-text font-bold text-[11.5px]">
            <Award className="w-3.5 h-3.5" /> {ppo_label_value || "Job Offer"}
          </span>
        )}

        {labels_app_in_card.map((label, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-350 text-[11px] font-medium"
          >
            {label}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center mt-auto pt-2 border-t border-[#F8F9FA] dark:border-slate-750">

        <div>
          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
            posted_by_label_type === 'success' || !posted_by_label_type
              ? 'bg-brand-light-green text-brand-success'
              : 'bg-slate-100 dark:bg-slate-750 text-slate-500 dark:text-slate-400'
          }`}>
            {posted_by_label || "1 day ago"}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          
          <button
            onClick={onBookmarkToggle}
            className={`p-2 rounded-lg border transition-all duration-200 cursor-pointer flex items-center justify-center ${
              isBookmarked
                ? 'bg-brand-blue/10 border-brand-blue text-brand-blue'
                : 'border-slate-200 dark:border-slate-750 text-slate-400 hover:text-slate-600 hover:border-slate-300 dark:hover:text-slate-350 dark:hover:border-slate-600'
            }`}
            title={isBookmarked ? "Remove Bookmark" : "Bookmark Internship"}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={onViewDetails}
            className="px-4.5 py-1.5 bg-brand-blue hover:bg-brand-blue-hover text-white font-bold rounded text-[13.5px] transition-colors cursor-pointer shadow-sm"
          >
            View Details
          </button>
        </div>

      </div>

    </div>
  );
};

export default InternshipCard;
