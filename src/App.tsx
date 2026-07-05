import { useState, useEffect, JSX } from "react";
import { 
  Leaf, 
  Trash2, 
  Printer, 
  ChevronsUpDown, 
  RotateCcw,
  BookOpen, 
  CheckCircle2,
  Calendar,
  PenTool
} from "lucide-react";
import { 
  LAKU_CATEGORIES, 
  calculateChakraScores, 
  generateReflectionFeedback, 
  getAuraCaptionText,
  generateAIOpinion
} from "./data";
import { LakuState, LakuScoreValue } from "./types";
import AuraVisualizer from "./components/AuraVisualizer";
import LakuCard from "./components/LakuCard";
import nusantaraHeaderBg from "./assets/images/nusantara_laku_header_1783248754841.jpg";

const STORAGE_KEY = "lakuVisualizerState.v1";
const NOTES_KEY = "lakuVisualizerNotes.v1";

export default function App(): JSX.Element {
  // Load laku checklist state from LocalStorage
  const [lakuState, setLakuState] = useState<LakuState>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  // Load daily notes/journal
  const [notes, setNotes] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(NOTES_KEY) || "";
    }
    return "";
  });

  // Expand state for categories (default first 2 open for nice welcome feel)
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    return { "ritme-alam": true, "tubuh": true };
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

  // Save laku checklist state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lakuState));
  }, [lakuState]);

  // Save notes
  useEffect(() => {
    localStorage.setItem(NOTES_KEY, notes);
  }, [notes]);

  // Handle single laku item score change (0, 1, 2)
  const handleItemValueChange = (itemId: string, value: LakuScoreValue) => {
    setLakuState((prev) => ({
      ...prev,
      [itemId]: value
    }));
  };

  // Toggle single category accordion
  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Expand all categories
  const handleExpandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    LAKU_CATEGORIES.forEach((cat) => {
      allExpanded[cat.id] = true;
    });
    setOpenCategories(allExpanded);
  };

  // Collapse all categories
  const handleCollapseAll = () => {
    const allCollapsed: Record<string, boolean> = {};
    LAKU_CATEGORIES.forEach((cat) => {
      allCollapsed[cat.id] = false;
    });
    setOpenCategories(allCollapsed);
  };

  // Reset all laku answers and journal notes
  const handleReset = () => {
    const confirmed = window.confirm("Apakah Anda yakin ingin mengatur ulang semua progres laku harian dan catatan refleksi hari ini?");
    if (confirmed) {
      setLakuState({});
      setNotes("");
      setOpenCategories({ "ritme-alam": true, "tubuh": true });
    }
  };

  // Print support
  const handlePrint = () => {
    // Open all to show completely in PDF
    const allExpanded: Record<string, boolean> = {};
    LAKU_CATEGORIES.forEach((cat) => {
      allExpanded[cat.id] = true;
    });
    setOpenCategories(allExpanded);

    setTimeout(() => {
      window.print();
    }, 250);
  };

  // Calculate under-the-hood statistics and chakras
  const chakras = calculateChakraScores(lakuState);

  // progressMap maps chakra id to percentage
  const progressMap = chakras.reduce((acc, chakra) => {
    acc[chakra.id] = chakra.score;
    return acc;
  }, {} as Record<string, number>);

  // Compute total possible max score vs current earned score
  let totalMaxScore = 0;
  let currentEarnedScore = 0;
  let completedItemsCount = 0;

  LAKU_CATEGORIES.forEach((category) => {
    category.items.forEach((item) => {
      totalMaxScore += 2; // Each item max points is 2
      const score = lakuState[item.id] || 0;
      currentEarnedScore += score;
      if (score > 0) {
        completedItemsCount++;
      }
    });
  });

  const overallPercentage = totalMaxScore ? Math.round((currentEarnedScore / totalMaxScore) * 100) : 0;
  const reflectionFeedback = generateReflectionFeedback(chakras, completedItemsCount);
  const auraCaptionText = getAuraCaptionText(overallPercentage, completedItemsCount);
  const aiOpinionText = generateAIOpinion(chakras, completedItemsCount);

  return (
    <div className="min-h-screen text-stone-800 selection:bg-emerald-100 selection:text-emerald-900 bg-[#FAF8F5] pb-16 print:bg-white print:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        {/* Navigation & Header Card Wrapper */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-stone-200/80 p-6 sm:p-8 shadow-sm mb-6 print:border-none print:p-0 print:shadow-none print:bg-transparent">
          {/* Transparent Watercolor Javanese Landscape Background */}
          <img 
            src={nusantaraHeaderBg} 
            alt="Watercolor Nusantara Landscape" 
            className="absolute inset-0 w-full h-full object-cover opacity-[0.16] pointer-events-none select-none mix-blend-multiply"
            referrerPolicy="no-referrer"
          />
          
          <header className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 print:pb-4">
            <div className="flex items-center gap-4 min-w-0">
              {/* Elegant Java/Nusantara inspired leaf/nature logo */}
              <div className="w-12 h-12 rounded-2xl bg-[#2d6a4f]/10 flex items-center justify-center text-[#2d6a4f] shadow-sm flex-shrink-0">
                <Leaf size={24} className="animate-pulse" />
              </div>

              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950">
                  Laku Visualizer
                </h1>
                <p className="text-stone-500 text-xs sm:text-sm font-medium leading-relaxed max-w-xl mt-1">
                  Wadah tenang harian untuk mawas diri, merefleksikan keselarasan laku hidup jasmani, emosional, dan batin melalui cerminan aura diri.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 print:hidden">
              <button
                onClick={handleExpandAll}
                type="button"
                className="px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 hover:text-stone-800 font-semibold text-xs sm:text-sm shadow-sm inline-flex items-center gap-2 transition-all cursor-pointer"
              >
                <ChevronsUpDown size={15} />
                Buka Semua Laku
              </button>
              <button
                onClick={handleCollapseAll}
                type="button"
                className="px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 hover:text-stone-800 font-semibold text-xs sm:text-sm shadow-sm inline-flex items-center gap-2 transition-all cursor-pointer"
              >
                Ringkas
              </button>
              <button
                onClick={handlePrint}
                type="button"
                className="px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 hover:text-stone-800 font-semibold text-xs sm:text-sm shadow-sm inline-flex items-center gap-2 transition-all cursor-pointer"
              >
                <Printer size={15} />
                Simpan PDF / Cetak
              </button>
              <button
                onClick={handleReset}
                type="button"
                className="px-3.5 py-2.5 rounded-xl border border-amber-200 bg-amber-50/40 hover:bg-amber-50 text-amber-800 font-semibold text-xs sm:text-sm shadow-sm inline-flex items-center gap-2 transition-all cursor-pointer"
              >
                <RotateCcw size={15} />
                Reset Laku
              </button>
            </div>
          </header>
        </div>

        {/* Date and offline status indicator */}
        <div className="py-4 flex flex-wrap items-center justify-between gap-3 text-stone-500 text-xs font-semibold uppercase tracking-wider border-b border-stone-100/60 print:hidden">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-stone-400" />
            <span>{currentDate}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#2d6a4f] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
            <span>Refleksi Offline Aman di Browser</span>
          </div>
        </div>

        {/* Main Columns Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-start">
          
          {/* Left Column: Laku Categories Accordions */}
          <section className="lg:col-span-7 xl:col-span-8 space-y-4" aria-label="Laku harian harian per kategori">
            {LAKU_CATEGORIES.map((category) => (
              <LakuCard
                key={category.id}
                category={category}
                isOpen={Boolean(openCategories[category.id])}
                onToggleOpen={() => toggleCategory(category.id)}
                lakuState={lakuState}
                onItemValueChange={handleItemValueChange}
              />
            ))}
          </section>

          {/* Right Column: Visual Aura, Reflections, and Breakdown */}
          <aside className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-8 space-y-6">
            
            {/* Aura Visualizer Frame */}
            <AuraVisualizer
              chakras={chakras}
              progressMap={progressMap}
              overallProgress={overallPercentage}
              auraCaption={auraCaptionText}
              aiOpinion={aiOpinionText}
            />

            {/* Overall Integration Wheel */}
            <div className="bg-white border border-stone-200/80 rounded-3xl p-6 shadow-sm flex flex-col items-center">
              <h3 className="text-xs font-extrabold text-stone-400 uppercase tracking-widest text-center mb-4">Penyelarasan Laku Harian</h3>
              
              <div className="relative w-36 h-36 flex items-center justify-center mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="58"
                    className="stroke-stone-100 fill-none"
                    strokeWidth="10"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="58"
                    className="stroke-[#2d6a4f] fill-none transition-all duration-1000 ease-out"
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 58}
                    strokeDashoffset={2 * Math.PI * 58 * (1 - overallPercentage / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                {/* Center score */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-stone-900 tracking-tight">{overallPercentage}%</span>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-stone-400 mt-0.5">SINKRON</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm font-semibold text-stone-700 flex items-center justify-center gap-1.5">
                  <CheckCircle2 size={16} className="text-[#2d6a4f]" />
                  {completedItemsCount} dari {LAKU_CATEGORIES.reduce((acc, c) => acc + c.items.length, 0)} Laku Dijalankan
                </p>
              </div>
            </div>

            {/* Reflection Text Insights (Rule-based feedback from actual scores) */}
            <div className="bg-[#FAF6F0] border border-[#e4d9c8] rounded-3xl p-5 shadow-sm">
              <h3 className="text-xs font-extrabold text-amber-900 uppercase tracking-widest flex items-center gap-1.5 mb-2.5">
                <BookOpen size={14} className="text-[#8b7355]" /> Ringkasan Mawas Diri
              </h3>
              <p className="text-sm text-stone-700 font-medium leading-relaxed">
                {reflectionFeedback}
              </p>
            </div>

            {/* Inner Chakras Energy State Breakdown (Calculated from Laku) */}
            <div className="bg-white border border-stone-200/80 rounded-3xl p-5 shadow-sm space-y-3.5">
              <h3 className="text-xs font-extrabold text-stone-400 uppercase tracking-widest mb-3">Keadaan Pusat Batin</h3>
              {chakras.map((chakra) => {
                return (
                  <div key={chakra.id} className="grid grid-cols-[85px_1fr_40px] items-center gap-3 text-xs font-semibold">
                    <span className="text-stone-600 truncate" title={chakra.label}>{chakra.label} ({chakra.name})</span>
                    <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{ 
                          width: `${chakra.score}%`,
                          backgroundColor: chakra.color 
                        }}
                      />
                    </div>
                    <span className="text-right font-mono text-stone-500">{chakra.score}%</span>
                  </div>
                );
              })}
            </div>

            {/* Personal Reflective Notes / Jurnal */}
            <div className="bg-white border border-stone-200/80 rounded-3xl p-5 shadow-sm">
              <h3 className="text-xs font-extrabold text-stone-400 uppercase tracking-widest flex items-center gap-1.5 mb-2.5">
                <PenTool size={14} className="text-[#8b7355]" /> Catatan Kontemplasi Pribadi
              </h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tuliskan heningnya rasa syukur, luapan emosi, kejernihan pikiran, atau refleksi mendalam yang Anda rasakan setelah melakukan laku harian..."
                className="w-full min-h-[120px] rounded-2xl border border-stone-200/80 p-3 text-sm text-stone-700 placeholder-stone-400 focus:border-[#2d6a4f]/40 focus:ring-1 focus:ring-[#2d6a4f]/20 focus:outline-none transition-all resize-y bg-stone-50/30"
              />
            </div>

          </aside>
        </div>

        {/* Nusantara Footer with Eling Lan Waspodo Reminder */}
        <footer className="mt-16 text-center border-t border-stone-200/60 pt-8 pb-4 print:mt-8 print:pt-4">
          <div className="max-w-2xl mx-auto space-y-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-amber-800 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
              Eling Lan Waspodo
            </h4>
            <p className="text-sm sm:text-base italic font-serif text-stone-600 leading-relaxed max-w-xl mx-auto">
              &ldquo;Laku membentuk keadaan diri. Eling melihatnya. Waspada menuntun langkah berikutnya.&rdquo;
            </p>
            <div className="pt-4 text-[10.5px] text-stone-400 font-semibold uppercase tracking-wider space-y-1">
              <p>Laku Visualizer &bull; Seluruh data tersimpan aman secara offline di peramban Anda</p>
              <p className="font-normal text-[10px] text-stone-400/80 normal-case">Diciptakan sebagai cermin penyelarasan diri dan keheningan hidup modern.</p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
