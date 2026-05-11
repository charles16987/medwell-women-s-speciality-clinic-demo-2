import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Facebook, Instagram } from 'lucide-react';

import { Navbar } from './components/ui/Navbar';
import { FloatingActions } from './components/ui/FloatingActions';
import { Preloader } from './components/ui/Preloader';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import PatientStories from './pages/PatientStories';
import Contact from './pages/Contact';

const PRIMARY_COLOR = '#673894';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Footer = () => (
  <footer className="bg-white py-20 border-t border-slate-100">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">

      <div className="col-span-2">
        <div className="flex items-center gap-2 mb-6">

          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-serif text-xl font-bold"
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            M
          </div>

          <span className="font-serif text-xl font-bold tracking-tight text-slate-900 uppercase">
            Medwell
          </span>

        </div>

        <p className="text-slate-500 max-w-sm leading-relaxed mb-8 italic">
          "Where every woman’s story matters."
          A women's speciality clinic dedicated to clinical excellence and compassionate care in Tamil Nadu.
        </p>

        <div className="flex gap-4">

          <a
            href="#"
            className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-50 text-slate-400 transition-all"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = PRIMARY_COLOR;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '';
            }}
          >
            <Facebook size={20} />
          </a>

          <a
            href="#"
            className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-50 text-slate-400 transition-all"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = PRIMARY_COLOR;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '';
            }}
          >
            <Instagram size={20} />
          </a>

        </div>
      </div>

      <div>
        <h4 className="font-serif text-xl font-bold mb-6">
          Pages
        </h4>

        <ul className="space-y-4 text-slate-600 font-medium">
          <li><a href="/" style={{ color: PRIMARY_COLOR }}>Home</a></li>
          <li><a href="/about" style={{ color: PRIMARY_COLOR }}>About Us</a></li>
          <li><a href="/services" style={{ color: PRIMARY_COLOR }}>Services</a></li>
          <li><a href="/stories" style={{ color: PRIMARY_COLOR }}>Patient Stories</a></li>
          <li><a href="/contact" style={{ color: PRIMARY_COLOR }}>Contact</a></li>
        </ul>
      </div>

      <div>
        <h4 className="font-serif text-xl font-bold mb-6">
          Visit Us
        </h4>

        <p className="text-slate-600 leading-relaxed italic">
          MIG, 10/261, near M TEENZ SHOWROOM,
          <br />
          New Housing Unit,
          <br />
          Thanjavur, Tamil Nadu 613005
        </p>

        <div className="mt-6 pt-6 border-t border-slate-50">

          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            Primary Contact
          </p>

          <p
            className="font-bold text-lg"
            style={{ color: PRIMARY_COLOR }}
          >
            967760 5596
          </p>

        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">

      <p>
        © {new Date().getFullYear()} Medwell Women's Clinic.
        All rights reserved.
      </p>

      <p>
        Designed with Charles
      </p>

    </div>
  </footer>
);

export default function App() {

  const [loading, setLoading] = useState(true);

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  // PRELOADER
  useEffect(() => {

    const timer = setTimeout(() => setLoading(false), 2500);

    return () => clearTimeout(timer);

  }, []);

  // CURSOR MOVEMENT
  useEffect(() => {

    const moveCursor = (e) => {

      setPosition({
        x: e.clientX,
        y: e.clientY,
      });

    };

    const mouseDown = () => setClicked(true);
    const mouseUp = () => setClicked(false);

    // HOVER EFFECT
    const addHoverEvents = () => {

      const elements = document.querySelectorAll(
        'a, button, input, textarea, .cursor-hover'
      );

      elements.forEach((el) => {

        el.addEventListener('mouseenter', () => setHovered(true));
        el.addEventListener('mouseleave', () => setHovered(false));

      });

    };

    addHoverEvents();

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);

    return () => {

      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);

    };

  }, []);

  return (

    <Router>

      <ScrollToTop />

      <AnimatePresence mode="wait">

        {loading ? (

          <Preloader key="preloader" />

        ) : (

          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col min-h-screen"
          >

            {/* OUTER CURSOR */}
            <motion.div
              animate={{
                x: position.x - 25,
                y: position.y - 25,
                scale: clicked ? 0.7 : hovered ? 1.8 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 250,
                damping: 18,
              }}
              className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[9999]"
              style={{
                border: `1px solid ${PRIMARY_COLOR}`,
                background:
                  'radial-gradient(circle, rgba(103,56,148,0.18) 0%, rgba(103,56,148,0.03) 70%)',
                boxShadow:
                  '0 0 40px rgba(103,56,148,0.45), inset 0 0 20px rgba(103,56,148,0.25)',
                backdropFilter: 'blur(4px)',
              }}
            />

            {/* INNER CURSOR */}
            <motion.div
              animate={{
                x: position.x - 6,
                y: position.y - 6,
                scale: clicked ? 1.8 : hovered ? 1.5 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 600,
                damping: 25,
              }}
              className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999]"
              style={{
                backgroundColor: PRIMARY_COLOR,
                boxShadow:
                  '0 0 20px #673894, 0 0 60px #673894, 0 0 90px #673894',
              }}
            />

            {/* CURSOR TRAIL */}
            <motion.div
              animate={{
                x: position.x - 15,
                y: position.y - 15,
              }}
              transition={{
                type: 'tween',
                ease: 'linear',
                duration: 0.15,
              }}
              className="fixed top-0 left-0 w-8 h-8 rounded-full blur-xl pointer-events-none z-[9998]"
              style={{
                backgroundColor: 'rgba(103,56,148,0.25)',
              }}
            />

            {/* MAIN NAVBAR */}
            <Navbar />

            {/* PAGES */}
            <main className="flex-grow">

              <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/stories" element={<PatientStories />} />
                <Route path="/contact" element={<Contact />} />

              </Routes>

            </main>

            {/* FOOTER */}
            <Footer />

            {/* FLOATING BUTTONS */}
            <FloatingActions />

          </motion.div>

        )}

      </AnimatePresence>

    </Router>

  );
}