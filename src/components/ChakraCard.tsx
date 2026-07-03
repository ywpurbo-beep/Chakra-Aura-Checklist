import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Sparkles } from "lucide-react";
import { ChakraData, ChecklistState } from "../types";

interface ChakraCardProps {
  key?: string | number;
  chakra: ChakraData;
  isOpen: boolean;
  onToggleOpen: () => void;
  checklistState: ChecklistState;
  onItemToggle: (itemId: string) => void;
}

export default function ChakraCard({
  chakra,
  isOpen,
  onToggleOpen,
  checklistState,
  onItemToggle
}: ChakraCardProps): React.JSX.Element {
  const totalItems = chakra.items.length;
  const completedCount = chakra.items.filter((item) => checklistState[item.id]).length;
  const isAllDone = completedCount === totalItems;

  return (
    <article 
      className="border border-stone-200/90 rounded-2xl bg-white/90 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-stone-300"
      style={{
        outline: isAllDone ? `1px solid ${chakra.color}` : "none"
      }}
    >
      {/* Header Button */}
      <button
        onClick={onToggleOpen}
        type="button"
        className="w-full text-left p-4 sm:p-5 flex items-start gap-3 sm:gap-4 hover:bg-stone-50/50 transition-colors cursor-pointer outline-none group"
        aria-expanded={isOpen}
      >
        {/* Chakra Glow Indicator Dot */}
        <div className="relative mt-1 flex-shrink-0">
          <div 
            className="w-4 h-4 rounded-full transition-all duration-300"
            style={{
              backgroundColor: chakra.color,
              boxShadow: `0 0 10px ${chakra.glowColor}`,
            }}
          />
          {isAllDone && (
            <motion.div 
              className="absolute -inset-1 rounded-full border border-stone-200"
              style={{ borderColor: chakra.color }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          )}
        </div>

        {/* Title, Focus, and Metadata */}
        <div className="flex-grow min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <h2 className="text-base sm:text-lg font-bold text-stone-800 tracking-tight group-hover:text-stone-900 transition-colors">
              {chakra.label} — <span className="font-semibold text-stone-600">{chakra.name}</span>
            </h2>
            {isAllDone && (
              <span 
                className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md"
                style={{ backgroundColor: `${chakra.color}15`, color: chakra.color }}
              >
                <Sparkles size={10} /> Selaras
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-stone-400 font-medium capitalize mt-0.5">
            {chakra.focus}
          </p>
        </div>

        {/* Progress Fraction and Collapse Arrow */}
        <div className="flex items-center gap-3 ml-2 flex-shrink-0">
          <span 
            className="text-xs sm:text-sm font-mono font-bold px-2 py-1 rounded-lg transition-colors"
            style={{ 
              backgroundColor: completedCount > 0 ? `${chakra.color}10` : "#f5f5f4",
              color: completedCount > 0 ? chakra.color : "#78716c" 
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
            <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 border-t border-stone-100/80 bg-stone-50/20">
              {/* Informative Governance Text */}
              <p className="text-xs sm:text-sm text-stone-500 italic mb-4 leading-relaxed pl-1">
                “{chakra.description}”
              </p>

              {/* Checklist Items */}
              <div className="space-y-2.5">
                {chakra.items.map((item) => {
                  const isChecked = Boolean(checklistState[item.id]);

                  return (
                    <div
                      key={item.id}
                      onClick={() => onItemToggle(item.id)}
                      className={`group/item flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                        isChecked 
                          ? "bg-white border-stone-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.01)]" 
                          : "bg-stone-50/40 border-stone-200/50 hover:bg-white hover:border-stone-200 hover:shadow-sm"
                      }`}
                    >
                      {/* Stylized Custom Checkbox */}
                      <div className="flex-shrink-0 mt-0.5">
                        <input
                          type="checkbox"
                          id={item.id}
                          checked={isChecked}
                          onChange={() => {}} // Handled by container div click
                          className="sr-only"
                        />
                        <div 
                          className={`w-[20px] h-[20px] rounded-md border flex items-center justify-center transition-all duration-200 ${
                            isChecked 
                              ? "border-transparent text-white" 
                              : "border-stone-300 group-hover/item:border-stone-400 bg-white"
                          }`}
                          style={{
                            backgroundColor: isChecked ? chakra.color : "transparent"
                          }}
                        >
                          {isChecked && (
                            <svg 
                              className="w-3.5 h-3.5 stroke-white" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              strokeWidth="3.5" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      </div>

                      {/* Item Text */}
                      <span 
                        className={`text-sm sm:text-[14.5px] leading-relaxed transition-all duration-200 ${
                          isChecked 
                            ? "text-stone-500 line-through decoration-stone-300" 
                            : "text-stone-700 font-medium"
                        }`}
                      >
                        {item.text}
                      </span>
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
