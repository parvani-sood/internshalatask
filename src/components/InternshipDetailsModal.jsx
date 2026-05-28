import React, { useState } from 'react';
import { X, MapPin, Calendar, Clock, DollarSign, Briefcase, Award, CheckCircle, Send } from 'lucide-react';

const InternshipDetailsModal = ({ internship, isOpen, onClose }) => {
  const [isApplying, setIsApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');

  if (!isOpen || !internship) return null;

  const {
    id,
    title,
    company_name,
    work_from_home,
    location_names = [],
    duration,
    stipend,
    application_deadline,
    is_ppo,
    ppo_label_value
  } = internship;

  const stipendText = stipend?.salary || "Unpaid";

  const getDynamicContent = (title) => {
    const lowerTitle = title.toLowerCase();
    
    if (lowerTitle.includes('data science') || lowerTitle.includes('analytics')) {
      return {
        aboutCompany: "We are an engineering and analytics lab focused on building high-performance models and AI infrastructure. Our team leverages state-of-the-art tools to analyze massive datasets and deliver actionable intelligence.",
        responsibilities: [
          "Clean, preprocess, and analyze raw structured and unstructured datasets.",
          "Implement, evaluate, and tune statistical models and machine learning algorithms.",
          "Create interactive dashboards and detailed reports to visualize insights.",
          "Collaborate with senior data scientists and developers to deploy model endpoints."
        ],
        skills: ["Python", "SQL", "Pandas & NumPy", "Scikit-Learn", "Data Visualization (Tableau/PowerBI)", "Machine Learning"],
        perks: ["Certificate of Internship", "Letter of Recommendation", "Flexible work hours", "Informal dress code"],
        openings: 2
      };
    } else if (lowerTitle.includes('android') || lowerTitle.includes('development') || lowerTitle.includes('engineering') || lowerTitle.includes('software')) {
      return {
        aboutCompany: "We build premium scalable software and mobile platforms. Our engineering culture values clean code, robust architectures, and continuous iteration to build beautiful user-facing applications.",
        responsibilities: [
          "Write clean, reusable, and efficient code in Java/Kotlin or React/JavaScript.",
          "Develop modular layouts and integrate RESTful APIs into application frameworks.",
          "Debug and resolve runtime exceptions, performance bottlenecks, and memory leaks.",
          "Participate in code reviews, technical designs, and sprint planning sessions."
        ],
        skills: ["ReactJS", "NodeJS / Express", "Git / GitHub", "REST APIs", "SQL / MongoDB", "Data Structures & Algorithms"],
        perks: ["Certificate of Internship", "Letter of Recommendation", "Job Offer (PPO possibility)", "5 days a week"],
        openings: 3
      };
    } else if (lowerTitle.includes('brand') || lowerTitle.includes('marketing') || lowerTitle.includes('product') || lowerTitle.includes('business')) {
      return {
        aboutCompany: "We are a high-growth marketing and brand management group. We help businesses formulate strong consumer identities, optimize digital channels, and launch successful product campaigns.",
        responsibilities: [
          "Conduct competitor analysis and identify strategic growth opportunities.",
          "Manage digital campaigns across search engines, social channels, and email systems.",
          "Coordinate with content creators, graphic designers, and product leads.",
          "Monitor campaign metrics, KPIs, and report ROI trends to stakeholders."
        ],
        skills: ["Digital Marketing", "SEO / SEM", "Google Analytics", "Social Media Management", "Content Writing", "Market Research"],
        perks: ["Certificate of Internship", "Letter of Recommendation", "Job Offer (PPO possibility)", "Informal dress code"],
        openings: 4
      };
    } else {
      
      return {
        aboutCompany: "We manage administrative systems and business operations. Our department ensures smooth operational workflows, vendor relationships, and organizational efficiency.",
        responsibilities: [
          "Assist in day-to-day office coordination and administrative tasks.",
          "Maintain organizational schedules, records, and databases.",
          "Assist in drafting professional communications and managing client schedules.",
          "Coordinate cross-functional tasks across human resources and operations teams."
        ],
        skills: ["MS-Office (Excel, Word)", "Business Communication", "Organizational Skills", "Problem Solving", "Time Management"],
        perks: ["Certificate of Internship", "Flexible hours", "Letter of Recommendation"],
        openings: 2
      };
    }
  };

  const jobDetails = getDynamicContent(title);

  const handleApply = (e) => {
    e.preventDefault();
    setIsApplying(true);
    
    setTimeout(() => {
      setIsApplying(false);
      setApplied(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">

      <div className="relative w-full max-w-[720px] bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">

        <div className="sticky top-0 z-10 bg-white dark:bg-slate-800 px-6 py-4.5 border-b border-[#F1F3F5] dark:border-slate-700 flex justify-between items-center">
          <div>
            <h2 className="text-[17px] font-bold text-slate-800 dark:text-white leading-tight">
              Internship Details
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">
              Ref ID: IS-{id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">

          <div className="space-y-2">
            <h1 className="text-xl font-bold text-slate-800 dark:text-white leading-tight">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-[14.5px] text-slate-500 dark:text-slate-400 font-medium">
              <span className="text-brand-blue font-semibold">{company_name}</span>
              {is_ppo && (
                <span className="px-2 py-0.5 rounded bg-brand-warning-bg text-brand-warning-text text-[11px] font-bold">
                  {ppo_label_value || "Job Offer"}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-350 text-[13.5px] pt-1">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{work_from_home ? "Work From Home" : location_names.join(', ') || "Multiple Locations"}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 dark:bg-slate-750 rounded-xl border border-slate-100 dark:border-slate-700 text-[13.5px]">
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-slate-400">
                <Calendar className="w-4 h-4" />
                <span className="font-semibold uppercase text-[10.5px] tracking-wider">Start Date</span>
              </div>
              <p className="text-slate-800 dark:text-slate-200 font-bold">Starts Immediately</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-slate-400">
                <Clock className="w-4 h-4" />
                <span className="font-semibold uppercase text-[10.5px] tracking-wider">Duration</span>
              </div>
              <p className="text-slate-800 dark:text-slate-200 font-bold">{duration}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1 text-slate-400">
                <DollarSign className="w-4 h-4" />
                <span className="font-semibold uppercase text-[10.5px] tracking-wider">Stipend</span>
              </div>
              <p className="text-slate-800 dark:text-slate-200 font-bold">{stipendText}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1 text-slate-400">
                <Briefcase className="w-4 h-4" />
                <span className="font-semibold uppercase text-[10.5px] tracking-wider">Apply By</span>
              </div>
              <p className="text-slate-800 dark:text-slate-200 font-bold">{application_deadline || "Immediately"}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-[15.5px] font-bold text-slate-800 dark:text-white">
              About {company_name}
            </h3>
            <p className="text-slate-650 dark:text-slate-300 text-[14px] leading-relaxed">
              {jobDetails.aboutCompany}
            </p>
          </div>

          <div className="space-y-2.5">
            <h3 className="text-[15.5px] font-bold text-slate-800 dark:text-white">
              About the Internship
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-[14px] mb-2">
              Selected intern's day-to-day responsibilities include:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-650 dark:text-slate-300 text-[14px] leading-relaxed">
              {jobDetails.responsibilities.map((resp, index) => (
                <li key={index}>{resp}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-[15.5px] font-bold text-slate-800 dark:text-white">
              Skill(s) required
            </h3>
            <div className="flex flex-wrap gap-2">
              {jobDetails.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 text-[13px] font-semibold rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            <h3 className="text-[15.5px] font-bold text-slate-800 dark:text-white">
              Perks
            </h3>
            <div className="flex flex-wrap gap-3">
              {jobDetails.perks.map((perk, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#EBF8F2] text-[#198754] text-[13px] font-semibold"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  {perk}
                </span>
              ))}
            </div>
          </div>

          <div className="text-[13.5px] font-medium text-slate-550 dark:text-slate-400">
            Number of openings: <span className="font-bold text-slate-700 dark:text-white">{jobDetails.openings}</span>
          </div>

          <div className="border-t border-[#F1F3F5] dark:border-slate-700 pt-5">
            {applied ? (
              <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 dark:border-emerald-900 text-emerald-800 dark:text-emerald-400 rounded-xl text-center justify-center font-bold">
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Application Submitted Successfully!
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-[14px] font-bold text-slate-700 dark:text-slate-350">
                    Why should you be hired for this role?
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Mention relevant skills, experience, projects, or why you are passionate about this internship..."
                    className="w-full px-3 py-2 border border-[#CCCCCC] dark:border-slate-600 dark:bg-slate-700 rounded-md text-[14.5px] text-slate-700 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300 font-semibold rounded-md hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors text-[14px] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isApplying}
                    className="flex items-center gap-2 px-6 py-2.5 bg-brand-blue hover:bg-brand-blue-hover disabled:bg-brand-blue/60 text-white font-bold rounded-md shadow-sm transition-colors text-[14px] cursor-pointer"
                  >
                    {isApplying ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Applying...
                      </>
                    ) : (
                      <>
                        Apply Now
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

export default InternshipDetailsModal;
