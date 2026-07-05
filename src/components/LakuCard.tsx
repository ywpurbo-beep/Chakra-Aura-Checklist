import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronDown, 
  Smile, 
  ShieldAlert, 
  Sparkles,
  Sun, 
  Heart, 
  Compass, 
  Users, 
  MessageSquare, 
  Eye, 
  Wind 
} from "lucide-react";
import { LakuCategory, LakuState, LakuScoreValue } from "../types";

const getCategoryIcon = (id: string) => {
  switch (id) {
    case "ritme-alam":
      return <Sun size={20} className="text-[#8b7355]" />;
    case "tubuh":
      return <Heart size={20} className="text-[#8b7355]" />;
    case "pengendalian-diri":
      return <Compass size={20} className="text-[#8b7355]" />;
    case "relasi":
      return <Users size={20} className="text-[#8b7355]" />;
    case "kejujuran-ucapan":
      return <MessageSquare size={20} className="text-[#8b7355]" />;
    case "kesadaran":
      return <Eye size={20} className="text-[#8b7355]" />;
    case "spiritualitas":
      return <Wind size={20} className="text-[#8b7355]" />;
    default:
      return <Sparkles size={20} className="text-[#8b7355]" />;
  }
};

interface LakuCardProps {
  key?: React.Key;
  category: LakuCategory;
  isOpen: boolean;
  onToggleOpen: () => void;
  lakuState: LakuState;
  onItemValueChange: (itemId: string, value: LakuScoreValue) => void;
}

export default function LakuCard({
  category,
  isOpen,
  onToggleOpen,
  lakuState,
  onItemValueChange
}: LakuCardProps) {
  const totalItems = category.items.length;
  
  // Calculate completed (either done moderately = 1, or fully = 2)
  const completedCount = category.items.filter((item) => {
    const val = lakuState[item.id] || 0;
    return val > 0;
  }).length;

  const fullAwarenessCount = category.items.filter((item) => (lakuState[item.id] || 0) === 2).length;

  return (
    <article 
      className="border border-stone-200/90 rounded-2xl bg-white/95 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-stone-300"
      style={{
        outline: fullAwarenessCount === totalItems ? `1.5px solid #2d6a4f` : "none" // Elegant Forest Green highlight if all fully completed
      }}
    >
      {/* Header Button */}
      <button
        onClick={onToggleOpen}
        type="button"
        className="w-full text-left p-4 sm:p-5 flex items-start gap-3.5 sm:gap-4 hover:bg-stone-50/50 transition-colors cursor-pointer outline-none group"
        aria-expanded={isOpen}
      >
        {/* Category Icon Circle */}
        <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center shadow-inner flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
          {getCategoryIcon(category.id)}
        </div>

        {/* Title and Focus metadata */}
        <div className="flex-grow min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <h2 className="text-base sm:text-lg font-bold text-stone-800 tracking-tight group-hover:text-stone-900 transition-colors">
              {category.title}
            </h2>
            {fullAwarenessCount === totalItems && (
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                <Sparkles size={10} /> Selaras
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5 line-clamp-1">
            {category.description}
          </p>
        </div>

        {/* Progress Fraction and Collapse Arrow */}
        <div className="flex items-center gap-3 ml-2 flex-shrink-0 self-center">
          <span 
            className="text-xs sm:text-sm font-mono font-bold px-2.5 py-1 rounded-lg transition-colors"
            style={{ 
              backgroundColor: completedCount > 0 ? `#eef5f0` : "#f5f5f4",
              color: completedCount > 0 ? `#2d6a4f` : "#78716c" 
            }}
          >
            {completedCount}/{totalItems}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 0 : -90 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="text-stone-400 group-hover:text-stone-600 transition-colors"
          >
            <ChevronDown size={18} />
          </motion.div>
        </div>
      </button>

      {/* Accordion Body with smooth animation */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 border-t border-stone-100/80 bg-stone-50/25">
              {/* Laku Items list */}
              <div className="space-y-3 mt-3">
                {category.items.map((item) => {
                  const currentValue = lakuState[item.id] || 0;

                  return (
                    <div
                      key={item.id}
                      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3.5 rounded-xl border transition-all duration-200 ${
                        currentValue === 2
                          ? "bg-white border-emerald-600/20 shadow-[0_2px_10px_rgba(45,106,79,0.02)]"
                          : currentValue === 1
                          ? "bg-white border-amber-600/15 shadow-[0_2px_8px_rgba(217,119,6,0.01)]"
                          : "bg-stone-50/50 border-stone-200/50"
                      }`}
                    >
                      {/* Item description */}
                      <span className={`text-sm sm:text-[14.5px] leading-relaxed flex-grow pr-2 transition-all ${
                        currentValue === 2 
                          ? "text-stone-800 font-semibold" 
                          : currentValue === 1 
                          ? "text-stone-700 font-medium" 
                          : "text-stone-500"
                      }`}>
                        {item.text}
                      </span>

                      {/* Segmented control for 3 states */}
                      <div className="flex items-center bg-stone-100 rounded-lg p-1 self-start sm:self-center">
                        <button
                          type="button"
                          onClick={() => onItemValueChange(item.id, 0)}
                          className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                            currentValue === 0
                              ? "bg-stone-200 text-stone-700 shadow-sm"
                              : "text-stone-400 hover:text-stone-600"
                          }`}
                        >
                          Tidak
                        </button>
                        <button
                          type="button"
                          onClick={() => onItemValueChange(item.id, 1)}
                          className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                            currentValue === 1
                              ? "bg-amber-100 text-amber-800 shadow-sm"
                              : "text-stone-400 hover:text-stone-600"
                          }`}
                        >
                          Sekadarnya
                        </button>
                        <button
                          type="button"
                          onClick={() => onItemValueChange(item.id, 2)}
                          className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                            currentValue === 2
                              ? "bg-emerald-600 text-white shadow-sm"
                              : "text-stone-400 hover:text-stone-600"
                          }`}
                        >
                          Sadar Penuh
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
