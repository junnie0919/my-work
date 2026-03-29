import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Trash2, LogOut, Save } from 'lucide-react';
import { PortfolioItem } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  portfolio: PortfolioItem[];
  setPortfolio: React.Dispatch<React.SetStateAction<PortfolioItem[]>>;
}

export default function AdminPanel({ isOpen, onClose, portfolio, setPortfolio }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === (import.meta.env.VITE_ADMIN_PASSWORD || '1111')) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const addItem = () => {
    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      title: 'New Project',
      videoUrl: '',
      thumbnail: 'https://picsum.photos/seed/' + Math.random() + '/800/450'
    };
    setPortfolio([...portfolio, newItem]);
  };

  const updateItem = (id: string, updates: Partial<PortfolioItem>) => {
    setPortfolio(portfolio.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteItem = (id: string) => {
    setPortfolio(portfolio.filter(item => item.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
      />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-4xl max-h-[90vh] glass rounded-3xl overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Admin Management</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-12">
            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-white/40 uppercase tracking-widest">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors"
                  placeholder="Enter password"
                  autoFocus
                />
                {error && <p className="text-red-500 text-xs">{error}</p>}
              </div>
              <button type="submit" className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-gold transition-colors">
                Login
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div className="flex items-center justify-between">
              <p className="text-white/40 text-sm">Manage your portfolio items</p>
              <button 
                onClick={addItem}
                className="flex items-center gap-2 bg-gold/20 text-gold px-4 py-2 rounded-lg hover:bg-gold/30 transition-colors text-sm"
              >
                <Plus size={16} />
                Add Project
              </button>
            </div>

            <div className="space-y-6">
              {portfolio.map(item => (
                <div key={item.id} className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <input 
                      value={item.title}
                      onChange={(e) => updateItem(item.id, { title: e.target.value })}
                      className="bg-transparent text-xl font-semibold outline-none border-b border-transparent focus:border-white/20 w-full"
                      placeholder="Project Title"
                    />
                    <button 
                      onClick={() => deleteItem(item.id)}
                      className="p-2 text-white/20 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-white/40 uppercase tracking-widest flex justify-between">
                        <span>Video URL / Filename</span>
                        <span className="text-gold/60 italic">Upload to 'public' folder in file explorer first</span>
                      </label>
                      <div className="flex gap-2">
                        <input 
                          value={item.videoUrl}
                          onChange={(e) => updateItem(item.id, { videoUrl: e.target.value })}
                          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-gold"
                          placeholder="e.g. video.mp4 or URL"
                        />
                        <label className="cursor-pointer bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors flex items-center justify-center">
                          <Plus size={16} className="text-white/60" />
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="video/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                // For local preview, we can use createObjectURL, but for persistence, we need the filename
                                // We'll set it to the filename and tell the user to upload it to public/
                                updateItem(item.id, { 
                                  videoUrl: `/${file.name}`,
                                  title: item.title === 'New Project' ? file.name.split('.')[0] : item.title
                                });
                                alert(`Selected: ${file.name}\n\nTo make this video play, please upload the file "${file.name}" to the "public" folder using the file explorer on the left.`);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isAuthenticated && (
          <div className="p-6 border-t border-white/10 flex justify-between">
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
            >
              <LogOut size={16} />
              Logout
            </button>
            <button 
              onClick={onClose}
              className="bg-white text-black px-6 py-2 rounded-xl font-semibold hover:bg-gold transition-colors flex items-center gap-2"
            >
              <Save size={16} />
              Save & Close
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
