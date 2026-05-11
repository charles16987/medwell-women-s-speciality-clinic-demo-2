import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MessageSquare, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import logoimg from '../../assests/Medwell-logo.png';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Patient Stories', path: '/stories' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-0',
        isScrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between logo-container">
        <Link to="/" className="flex items-center gap-2 group">
          {/* <div className="w-10 h-10 bg-terracotta rounded-lg flex items-center justify-center text-white font-serif text-xl font-bold group-hover:rotate-12 transition-transform">
            M
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-tight text-slate-900 dark:text-white logo-text">MEDWELL</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-sage font-semibold -mt-1">Speciality Clinic</span>
          </div> */}
          <div className='logo-img'>
             <img src={logoimg} alt="" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-terracotta',
                location.pathname === link.path ? 'text-terracotta' : 'text-slate-600 dark:text-slate-300'
              )}
            >
              {link.name}
            </Link>
          ))}
          
          {/* <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button> */}

          <a
            href="tel:9677605596"
            className="btn-primary py-2 px-6 text-sm flex items-center gap-2"
          >
            <Phone size={14} />
            Call Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          {/* <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button> */}
          <button
            className="text-slate-900 dark:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* ... mobile menu needs dark mode classes too ... */}

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-6 flex flex-col gap-4 shadow-xl md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'text-lg font-medium py-2 border-b border-slate-50',
                  location.pathname === link.path ? 'text-terracotta' : 'text-slate-600'
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4">
              <a
                href="https://wa.me/919677605596"
                className="btn-secondary w-full text-center flex items-center justify-center gap-2"
              >
                <MessageSquare size={18} /> WhatsApp
              </a>
              <a
                href="tel:9677605596"
                className="btn-primary w-full text-center flex items-center justify-center gap-2"
              >
                <Phone size={18} /> Call Clinic
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
