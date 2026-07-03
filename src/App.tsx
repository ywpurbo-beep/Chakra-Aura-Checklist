import { useState, useEffect } from "react";
import { 
  Sparkles, 
  Trash2, 
  Printer, 
  ChevronsUpDown, 
  RotateCcw,
  BookOpen, 
  CheckCircle2,
  Calendar,
  Heart
} from "lucide-react";
import { CHAKRA_DATA, getInsightText, getAuraCaptionText } from "./data";
import { ChecklistState } from "./types";
import AuraVisualizer from "./components/AuraVisualizer";
import ChakraCard from "./components/ChakraCard";

const STORAGE_KEY = "chakraAuraPortableChecklist.v1";
const NOTES_KEY = "chakraAuraPortableChecklist.notes.v1";

export default function App() {
  // Load checklist state from LocalStorage
  const [checklistState, setChecklistState] = useState<ChecklistState>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  // Load reflection notes
  const [notes, setNotes] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(NOTES_KEY) || "";
    }
    return "";
  });

  // Keep track of which card IDs are expanded
  const [openCards, setOpenCards] = useState<Record<string, boolean>>(() => {
    // By default, open the first 2 chakras (Root and Sacral) to welcome the user
    return { root: true, sacral: true };
  });

  // Localized Indonesian Date Header
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(new Date().toLocaleDateString('id-ID', options));
  }, []);

  // Save checklist state to LocalStorage when changed
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checklistState));
  }, [checklistState]);

  // Save notes to LocalStorage when changed
  useEffect(() => {
    localStorage.setItem(NOTES_KEY, notes);
  }, [notes]);

  // Toggle item checklist state
  const handleItemToggle = (itemId: string) => {
    setChecklistState((prev) => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Toggle single chakra card collapse state
  const toggleCard = (chakraId: string) => {
    setOpenCards((prev) => ({
      ...prev,
      [chakraId]: !prev[chakraId]
    }));
  };

  // Expand all cards
  const handleExpandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    CHAKRA_DATA.forEach((c) => {
      allExpanded[c.id] = true;
    });
    setOpenCards(allExpanded);
  };

  // Collapse all cards
  const handleCollapseAll = () => {
    const allCollapsed: Record<string, boolean> = {};
    CHAKRA_DATA.forEach((c) => {
      allCollapsed[c.id] = false;
    });
    setOpenCards(allCollapsed);
  };

  // Reset all states
  const handleReset = () => {
    const confirmed = window.confirm("Apakah Anda yakin ingin mengatur ulang semua progres centang dan catatan refleksi hari ini?");
    if (confirmed) {
      setChecklistState({});
      setNotes("");
      // Reset expanded cards back to original welcome state
      setOpenCards({ root: true, sacral: true });
    }
  };

  // Trigger browser print
  const handlePrint = () => {
    // Open all cards temporarily for a perfect print/PDF structure
    const allExpanded: Record<string, boolean> = {};
    CHAKRA_DATA.forEach((c) => {
      allExpanded[c.id] = true;
    });
    setOpenCards(allExpanded);

    // Give state brief time to update and print
    setTimeout(() => {
      window.print();
    }, 200);
  };

  // Calculate dynamic statistics
  let totalItemsCount = 0;
  let completedItemsCount = 0;

  // Track progress percentages for each chakra (for sidebar progress bars and aura)
  const progressMap: Record<string, number> = {};

  CHAKRA_DATA.forEach((chakra) => {
    const total = chakra.items.length;
    const completed = chakra.items.filter((item) => checklistState[item.id]).length;
    
    totalItemsCount += total;
    completedItemsCount += completed;
    
    progressMap[chakra.id] = total ? Math.round((completed / total) * 100) : 0;
  });

  const overallPercentage = totalItemsCount ? Math.round((completedItemsCount / totalItemsCount) * 100) : 0;
  const insightText = getInsightText(overallPercentage, completedItemsCount);
  const auraCaptionText = getAuraCaptionText(overallPercentage, completedItemsCount);

  return (
    <div className="min-h-screen text-stone-800 selection:bg-amber-100 selection:text-amber-900 bg-radial from-stone-50 via-stone-100/60 to-stone-200/40 pb-16 print:bg-white print:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        {/* Dynamic Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 border-b border-stone-200 print:pb-4">
          <div className="flex items-center gap-4 min-w-0">
            {/* Ambient Conic Logo */}
            <div 
              className="w-12 h-12 rounded-full flex-shrink-0 bg-conic from-red-500 via-orange-400 via-yellow-400 via-green-500 via-blue-500 via-indigo-500 via-purple-500 to-red-500 shadow-lg relative flex items-center justify-center p-[6px]"
              aria-hidden="true"
            >
              <div className="w-full h-full rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-stone-800">
                <Sparkles size={18} className="text-amber-500 animate-pulse" />
              </div>
            </div>

            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-stone-900 flex items-center gap-2 flex-wrap">
                Checklist Aktivitas Chakra & Aura
              </h1>
              <p className="text-stone-500 text-xs sm:text-sm font-medium leading-relaxed max-w-xl mt-1">
                Satu wadah tenang harian untuk menyelaraskan energi fisik, emosional, dan spiritual Anda melalui aktivitas bermakna.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 print:hidden">
            <button
              onClick={handleExpandAll}
              type="button"
              className="px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white/80 hover:bg-white text-stone-600 hover:text-stone-800 font-semibold text-xs sm:text-sm shadow-sm inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <ChevronsUpDown size={15} />
              Buka Semua
            </button>
            <button
              onClick={handleCollapseAll}
              type="button"
              className="px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white/80 hover:bg-white text-stone-600 hover:text-stone-800 font-semibold text-xs sm:text-sm shadow-sm inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              Ringkas
            </button>
            <button
              onClick={handlePrint}
              type="button"
              className="px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white/80 hover:bg-white text-stone-600 hover:text-stone-800 font-semibold text-xs sm:text-sm shadow-sm inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <Printer size={15} />
              Cetak / PDF
            </button>
            <button
              onClick={handleReset}
              type="button"
              className="px-3.5 py-2.5 rounded-xl border border-red-200 bg-red-50/40 hover:bg-red-50 text-red-700 hover:text-red-800 font-semibold text-xs sm:text-sm shadow-sm inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw size={15} />
              Reset Progres
            </button>
          </div>
        </header>

        {/* Localized Greeting and Saved Indicator */}
        <div className="py-4 flex flex-wrap items-center justify-between gap-3 text-stone-500 text-xs font-semibold uppercase tracking-wider border-b border-stone-100 print:hidden">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-stone-400" />
            <span>{currentDate}</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Tersimpan otomatis di Browser</span>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-start">
          
          {/* Left Column: Chakra Accordion Checklist Cards */}
          <section className="lg:col-span-7 xl:col-span-8 space-y-4" aria-label="Aktivitas harian per chakra">
            {CHAKRA_DATA.map((chakra) => (
              <ChakraCard
                key={chakra.id}
                chakra={chakra}
                isOpen={Boolean(openCards[chakra.id])}
                onToggleOpen={() => toggleCard(chakra.id)}
                checklistState={checklistState}
                onItemToggle={handleItemToggle}
              />
            ))}
          </section>

          {/* Right Column: Sticky Dashboard & Visualizers */}
          <aside className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-8 space-y-6">
            
            {/* Visual Aura Stage */}
            <AuraVisualizer
              chakras={CHAKRA_DATA}
              progressMap={progressMap}
              overallProgress={overallPercentage}
              auraCaption={auraCaptionText}
            />

            {/* Overall Progression Circle and Counts */}
            <div className="bg-white/90 border border-stone-200/80 rounded-2xl p-6 shadow-sm flex flex-col items-center">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest text-center mb-4">Penyelarasan Hari Ini</h3>
              
              <div className="relative w-40 h-40 flex items-center justify-center mb-4">
                {/* SVG Progress Circle */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="68"
                    className="stroke-stone-100 fill-none"
                    strokeWidth="12"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="68"
                    className="stroke-emerald-600 fill-none transition-all duration-700 ease-out"
                    strokeWidth="12"
                    strokeDasharray={2 * Math.PI * 68}
                    strokeDashoffset={2 * Math.PI * 68 * (1 - overallPercentage / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                {/* Score Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-stone-900 tracking-tight">{overallPercentage}%</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 mt-0.5">SINKRON</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm font-semibold text-stone-700 flex items-center justify-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  {completedItemsCount} dari {totalItemsCount} Aktivitas Selesai
                </p>
              </div>
            </div>

            {/* Wisdom Insight Panel */}
            <div className="bg-gradient-to-br from-amber-50/50 to-stone-50 border border-amber-100 rounded-2xl p-5 shadow-sm">
              <h3 className="text-xs font-bold text-amber-800 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                <BookOpen size={14} /> Refleksi Energi
              </h3>
              <p className="text-sm text-stone-600 font-medium leading-relaxed">
                {insightText}
              </p>
            </div>

            {/* Miniature Bars breakdown per Chakra */}
            <div className="bg-white/90 border border-stone-200/80 rounded-2xl p-5 shadow-sm space-y-3.5">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">Rincian Penyelarasan</h3>
              {CHAKRA_DATA.map((chakra) => {
                const percent = progressMap[chakra.id] || 0;
                return (
                  <div key={chakra.id} className="grid grid-cols-[80px_1fr_40px] items-center gap-3 text-xs font-semibold">
                    <span className="text-stone-600">{chakra.label}</span>
                    <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500 ease-out"
                        style={{ 
                          width: `${percent}%`,
                          backgroundColor: chakra.color 
                        }}
                      />
                    </div>
                    <span className="text-right font-mono text-stone-500">{percent}%</span>
                  </div>
                );
              })}
            </div>

            {/* Personal Reflective Notes */}
            <div className="bg-white/90 border border-stone-200/80 rounded-2xl p-5 shadow-sm">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1.5 mb-2.5">
                <Heart size={14} className="text-red-500" /> Jurnal Refleksi Hati
              </h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tuliskan sensasi fisik, emosi yang timbul, kejernihan pikiran, atau getaran rasa syukur yang Anda alami hari ini..."
                className="w-full min-h-[120px] rounded-xl border border-stone-200 p-3 text-sm text-stone-700 placeholder-stone-400 focus:border-amber-400 focus:outline-none transition-all resize-y bg-stone-50/30"
              />
            </div>

          </aside>
        </div>

        {/* App Footer */}
        <footer className="mt-16 text-center text-xs text-stone-400 font-medium border-t border-stone-200/60 pt-6 print:hidden">
          <p>Seluruh data tersimpan aman secara offline di browser perangkat Anda.</p>
          <p className="mt-1">Dibuat sebagai sarana meditasi praktis harian.</p>
        </footer>

      </div>
    </div>
  );
}
