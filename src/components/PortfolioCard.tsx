import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Target, Cpu, BarChart3, X } from "lucide-react";
import { PortfolioItem } from "../constants";

export default function PortfolioCard({ item }: { item: PortfolioItem }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass rounded-2xl overflow-hidden group cursor-pointer"
        onClick={() => setIsPlaying(true)}
      >
        <div className="aspect-video relative overflow-hidden bg-black">
          {item.videoUrl ? (
            <video 
              src={item.videoUrl}
              muted
              loop
              playsInline
              onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
              onMouseOut={(e) => {
                const video = e.target as HTMLVideoElement;
                video.pause();
                video.currentTime = 0;
              }}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <img 
              src={item.thumbnail} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity">
              <Play className="text-white fill-white ml-1" size={24} />
            </div>
            {!item.videoUrl && (
              <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-widest text-white/40 bg-black/40 px-2 py-1 rounded">
                No Video Linked
              </div>
            )}
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white/90 group-hover:text-gold transition-colors">{item.title}</h3>
        </div>
      </motion.div>

      <AnimatePresence>
        {isPlaying && (
          <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPlaying(false)}
              className="absolute inset-0 bg-black/98 backdrop-blur-2xl"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl space-y-4"
            >
              <div className="flex items-center justify-between text-white px-2">
                <h2 className="text-2xl font-bold tracking-tight">{item.title}</h2>
                <button 
                  onClick={() => setIsPlaying(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={28} />
                </button>
              </div>

              <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                <video 
                  src={item.videoUrl} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    console.error("Video failed to load:", item.videoUrl);
                    if (item.videoUrl.startsWith('/')) {
                      const filename = item.videoUrl.slice(1);
                      alert(`Video failed to load: ${item.videoUrl}\n\nPlease make sure the file "${filename}" is uploaded to the "public" folder.`);
                    }
                  }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
