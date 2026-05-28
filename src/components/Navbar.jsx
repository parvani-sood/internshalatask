import React, { useState, useEffect } from 'react';
import { Bookmark, Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';
import logoImg from '../assets/logo.jpg';

const useTransparentLogo = (src) => {
  const [transparentSrc, setTransparentSrc] = useState(src);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          if (r > 240 && g > 240 && b > 240) {
            data[i + 3] = 0; 
          }
        }
        
        ctx.putImageData(imageData, 0, 0);
        setTransparentSrc(canvas.toDataURL('image/png'));
      } catch (err) {
        console.error('Error generating transparent logo:', err);
      }
    };
  }, [src]);

  return transparentSrc;
};

const Navbar = ({ bookmarkedCount, darkMode, toggleDarkMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileAccordion, setActiveMobileAccordion] = useState(null);
  const logoSrc = useTransparentLogo(logoImg);

  const toggleMobileAccordion = (name) => {
    setActiveMobileAccordion(activeMobileAccordion === name ? null : name);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b border-[#E8E8E8] dark:border-slate-800 shadow-[0_2px_4px_rgba(0,0,0,0.02)] transition-colors duration-200">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-[72px] flex items-center justify-between">

        <div className="flex items-center space-x-4 md:space-x-6">

          <div className="flex items-center cursor-pointer select-none mr-2">
            <img 
              src={logoSrc} 
              alt="Internshala" 
              className="h-8 md:h-9 object-contain dark:invert dark:hue-rotate-180 transition-all duration-200"
            />
          </div>

          <div className="hidden md:block relative group py-2">
            <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-300 transition-colors cursor-pointer relative">
              <Bookmark className="w-5 h-5" />
              {bookmarkedCount > 0 && (
                <span className="absolute top-1 right-1 bg-brand-blue text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {bookmarkedCount}
                </span>
              )}
            </button>
            
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-44 bg-white dark:bg-slate-800 border border-[#E8E8E8] dark:border-slate-700 rounded-lg shadow-lg py-1.5 px-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50 text-slate-500 dark:text-slate-400 text-xs text-center pointer-events-none">
              {bookmarkedCount > 0 
                ? `Saved: ${bookmarkedCount} internship${bookmarkedCount > 1 ? 's' : ''}`
                : "No bookmarks yet"
              }
            </div>
          </div>

          <button
            onClick={toggleDarkMode}
            className="hidden md:flex p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-300 transition-colors cursor-pointer"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
          </button>

        </div>

        <div className="hidden md:flex items-center space-x-6 text-[14.5px] font-medium text-slate-750 dark:text-slate-200">

          <div className="relative group py-6">
            <button className="flex items-center space-x-1 hover:text-brand-blue cursor-pointer transition-colors focus:outline-none">
              <span>Internships</span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-brand-blue transition-transform duration-200 group-hover:rotate-180" />
            </button>

            <div className="absolute top-full right-0 mt-0 w-56 bg-white dark:bg-slate-800 border border-[#E8E8E8] dark:border-slate-700 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="px-4 py-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Top Profiles
              </div>
              <a href="#" className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-blue text-[13.5px]">
                Data Science
              </a>
              <a href="#" className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-blue text-[13.5px]">
                Web Development
              </a>
              <a href="#" className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-blue text-[13.5px]">
                Marketing
              </a>
              <a href="#" className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-blue text-[13.5px]">
                Design
              </a>
              <div className="border-t border-[#E8E8E8] dark:border-slate-700 my-1"></div>
              <div className="px-4 py-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Top Locations
              </div>
              <a href="#" className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-blue text-[13.5px]">
                Work From Home
              </a>
              <a href="#" className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-blue text-[13.5px]">
                Delhi / NCR
              </a>
              <a href="#" className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-blue text-[13.5px]">
                Bangalore
              </a>
            </div>
          </div>

          <div className="relative group py-6">
            <button className="flex items-center space-x-1.5 hover:text-brand-blue cursor-pointer transition-colors focus:outline-none">
              <span>Courses</span>
              <span className="bg-[#FF9E1B] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded tracking-wide uppercase scale-90 select-none">
                OFFER
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-brand-blue transition-transform duration-200 group-hover:rotate-180" />
            </button>

            <div className="absolute top-full right-0 mt-0 w-60 bg-white dark:bg-slate-800 border border-[#E8E8E8] dark:border-slate-700 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="px-4 py-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Popular Programs
              </div>
              <a href="#" className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-blue text-[13.5px] flex items-center justify-between">
                <span>Full Stack Development</span>
                <span className="text-[10px] text-green-500 font-bold">10% OFF</span>
              </a>
              <a href="#" className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-blue text-[13.5px] flex items-center justify-between">
                <span>Data Science Specialization</span>
                <span className="text-[10px] text-green-500 font-bold">15% OFF</span>
              </a>
              <a href="#" className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-blue text-[13.5px] flex items-center justify-between">
                <span>Digital Marketing</span>
                <span className="text-[10px] text-green-500 font-bold">Free Trial</span>
              </a>
              <a href="#" className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-blue text-[13.5px] flex items-center justify-between">
                <span>UI/UX Design Masterclass</span>
                <span className="text-[10px] text-green-500 font-bold">20% OFF</span>
              </a>
            </div>
          </div>

          <div className="relative group py-6">
            <button className="flex items-center space-x-1 hover:text-brand-blue cursor-pointer transition-colors focus:outline-none">
              <span>Jobs</span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-brand-blue transition-transform duration-200 group-hover:rotate-180" />
            </button>

            <div className="absolute top-full right-0 mt-0 w-52 bg-white dark:bg-slate-800 border border-[#E8E8E8] dark:border-slate-700 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <a href="#" className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-blue text-[13.5px]">
                Full-Time Jobs
              </a>
              <a href="#" className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-blue text-[13.5px]">
                Part-Time Jobs
              </a>
              <a href="#" className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-blue text-[13.5px]">
                Jobs with PPO
              </a>
              <a href="#" className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-blue text-[13.5px]">
                Remote Jobs
              </a>
            </div>
          </div>

          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700" />

          <div className="relative group py-6">
            <button className="text-slate-750 dark:text-slate-200 hover:text-brand-blue font-bold transition-all duration-150 cursor-pointer text-[14.5px] flex items-center space-x-1 focus:outline-none">
              <span>Login / Register</span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-brand-blue group-hover:rotate-180 transition-transform duration-200" />
            </button>

            <div className="absolute top-full right-0 mt-0 w-52 bg-white dark:bg-slate-800 border border-[#E8E8E8] dark:border-slate-700 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <a href="#" className="block px-4 py-2 text-slate-750 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-blue text-[13.5px] font-semibold border-b border-[#E8E8E8] dark:border-slate-700 pb-2 mb-1">
                Login
              </a>
              <a href="#" className="block px-4 py-2 text-slate-750 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-blue text-[13.5px]">
                Register as Student
              </a>
              <a href="#" className="block px-4 py-2 text-slate-750 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-blue text-[13.5px]">
                Register as Employer
              </a>
            </div>
          </div>

        </div>

        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-300 transition-colors"
          >
            {darkMode ? <Sun className="w-4.5 h-4.5 text-yellow-500" /> : <Moon className="w-4.5 h-4.5" />}
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-650 dark:text-slate-200"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden w-full bg-white dark:bg-slate-900 border-t border-[#E8E8E8] dark:border-slate-800 px-6 py-4 flex flex-col space-y-3 shadow-lg animate-in fade-in slide-in-from-top-4 duration-200 max-h-[80vh] overflow-y-auto">

          <div>
            <button 
              onClick={() => toggleMobileAccordion('internships')}
              className="w-full flex justify-between items-center py-2 text-slate-700 dark:text-slate-200 font-medium border-b border-slate-150 dark:border-slate-800"
            >
              <span>Internships</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMobileAccordion === 'internships' ? 'rotate-180' : ''}`} />
            </button>
            {activeMobileAccordion === 'internships' && (
              <div className="pl-4 py-2 space-y-2 bg-slate-50 dark:bg-slate-800/50 rounded-md mt-1 text-[13.5px] text-slate-650 dark:text-slate-350">
                <a href="#" className="block py-1 hover:text-brand-blue">Data Science</a>
                <a href="#" className="block py-1 hover:text-brand-blue">Web Development</a>
                <a href="#" className="block py-1 hover:text-brand-blue">Marketing</a>
                <a href="#" className="block py-1 hover:text-brand-blue">Design</a>
                <a href="#" className="block py-1 hover:text-brand-blue">Work From Home</a>
              </div>
            )}
          </div>

          <div>
            <button 
              onClick={() => toggleMobileAccordion('courses')}
              className="w-full flex justify-between items-center py-2 text-slate-700 dark:text-slate-200 font-medium border-b border-slate-150 dark:border-slate-800"
            >
              <span className="flex items-center">
                Courses
                <span className="ml-2 bg-[#FF9E1B] text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
                  Offer
                </span>
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMobileAccordion === 'courses' ? 'rotate-180' : ''}`} />
            </button>
            {activeMobileAccordion === 'courses' && (
              <div className="pl-4 py-2 space-y-2 bg-slate-50 dark:bg-slate-800/50 rounded-md mt-1 text-[13.5px] text-slate-650 dark:text-slate-350">
                <a href="#" className="block py-1 hover:text-brand-blue flex justify-between pr-2">
                  <span>Full Stack Dev</span>
                  <span className="text-[10px] text-green-500 font-bold">10% OFF</span>
                </a>
                <a href="#" className="block py-1 hover:text-brand-blue flex justify-between pr-2">
                  <span>Data Science</span>
                  <span className="text-[10px] text-green-500 font-bold">15% OFF</span>
                </a>
                <a href="#" className="block py-1 hover:text-brand-blue flex justify-between pr-2">
                  <span>Digital Marketing</span>
                  <span className="text-[10px] text-green-500 font-bold">Free Trial</span>
                </a>
              </div>
            )}
          </div>

          <div>
            <button 
              onClick={() => toggleMobileAccordion('jobs')}
              className="w-full flex justify-between items-center py-2 text-slate-700 dark:text-slate-200 font-medium border-b border-slate-150 dark:border-slate-800"
            >
              <span>Jobs</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMobileAccordion === 'jobs' ? 'rotate-180' : ''}`} />
            </button>
            {activeMobileAccordion === 'jobs' && (
              <div className="pl-4 py-2 space-y-2 bg-slate-50 dark:bg-slate-800/50 rounded-md mt-1 text-[13.5px] text-slate-650 dark:text-slate-350">
                <a href="#" className="block py-1 hover:text-brand-blue">Full-Time Jobs</a>
                <a href="#" className="block py-1 hover:text-brand-blue">Part-Time Jobs</a>
                <a href="#" className="block py-1 hover:text-brand-blue">Jobs with PPO</a>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center py-2 text-slate-700 dark:text-slate-200 font-medium border-b border-slate-150 dark:border-slate-800">
            <span className="flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
              Bookmarks
            </span>
            {bookmarkedCount > 0 ? (
              <span className="bg-brand-blue text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                {bookmarkedCount}
              </span>
            ) : (
              <span className="text-slate-400 text-xs">0</span>
            )}
          </div>

          <div>
            <button 
              onClick={() => toggleMobileAccordion('loginRegister')}
              className="w-full flex justify-between items-center py-2 text-slate-700 dark:text-slate-200 font-medium border-b border-slate-150 dark:border-slate-800"
            >
              <span>Login / Register</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMobileAccordion === 'loginRegister' ? 'rotate-180' : ''}`} />
            </button>
            {activeMobileAccordion === 'loginRegister' && (
              <div className="pl-4 py-2 space-y-2 bg-slate-50 dark:bg-slate-800/50 rounded-md mt-1 text-[13.5px] text-slate-650 dark:text-slate-350">
                <a href="#" className="block py-1 hover:text-brand-blue font-semibold text-slate-750 dark:text-slate-200">Login</a>
                <a href="#" className="block py-1 hover:text-brand-blue">Register as Student</a>
                <a href="#" className="block py-1 hover:text-brand-blue">Register as Employer</a>
              </div>
            )}
          </div>

        </div>
      )}
    </nav>
  );
};

export default Navbar;
