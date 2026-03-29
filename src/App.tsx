// GitHub Sync Trigger Comment
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Settings,
  ArrowRight,
  X
} from 'lucide-react';
import { INITIAL_PORTFOLIO, PortfolioItem } from './constants';
import PortfolioCard from './components/PortfolioCard';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'portfolio'>('home');
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to load portfolio from localStorage:', e);
    }
    return INITIAL_PORTFOLIO;
  });
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    localStorage.setItem('portfolio_data', JSON.stringify(portfolio));
  }, [portfolio]);

  return (
    <div className="min-h-screen selection:bg-gold selection:text-black bg-dark text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 px-6 py-8 flex justify-between items-center transition-all duration-500 ${currentView === 'home' ? 'mix-blend-difference' : 'bg-dark/80 backdrop-blur-md border-b border-white/5'}`}>
        <div className="flex items-center gap-4">
          {currentView === 'portfolio' && (
            <button 
              onClick={() => setCurrentView('home')}
              className="text-xs uppercase tracking-widest font-semibold hover:text-gold transition-colors flex items-center gap-2 group"
            >
              <ArrowRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> Back to Home
            </button>
          )}
        </div>
        <div className="flex items-center gap-8">
          <button 
            onClick={() => setIsAdminOpen(true)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors opacity-20 hover:opacity-100"
          >
            <Settings size={20} />
          </button>
          <button 
            onClick={() => setIsContactOpen(true)}
            className="text-xs uppercase tracking-widest font-semibold hover:text-gold transition-colors"
          >
            Contact
          </button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {currentView === 'home' ? (
          <motion.section 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative h-screen flex items-center justify-center overflow-hidden"
          >
            <motion.div style={{ opacity, scale }} className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-dark z-10" />
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-at-night-40130-large.mp4" type="video/mp4" />
              </video>
            </motion.div>

            <div className="relative z-20 text-center px-6 max-w-5xl">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gold uppercase tracking-[0.4em] text-xs font-semibold mb-6"
              >
                PARK JUNEHEE
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]"
              >
                My Work<br />
                <span className="text-gradient italic text-4xl md:text-6xl block mt-4">人々の心に深く刻まれる価値を創出する。</span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center gap-4"
              >
                <button 
                  onClick={() => setCurrentView('portfolio')}
                  className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gold transition-all duration-300 hover:scale-105 flex items-center gap-2 group"
                >
                  View <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>
          </motion.section>
        ) : (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-dark pt-20"
          >
            {/* Portfolio Section */}
            <section id="portfolio" className="py-32 px-6 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {portfolio.map((item) => (
                  <div key={item.id}>
                    <PortfolioCard item={item} />
                  </div>
                ))}
              </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-white/5 text-center">
              <p className="text-[10px] uppercase tracking-[0.5em] text-white/20">
                © 2026 Video Architect Portfolio. All Rights Reserved.
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl glass p-12 md:p-20 rounded-[3rem] text-center space-y-12 overflow-hidden"
            >
              <button 
                onClick={() => setIsContactOpen(false)}
                className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
              >
                <X size={24} />
              </button>

              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">CONTACT</h2>
                <p className="text-xl md:text-2xl text-white/80 font-medium">
                  メール：gaiaparkjune@gmail.com
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Admin Panel */}
      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        portfolio={portfolio}
        setPortfolio={setPortfolio}
      />
    </div>
  );
}
