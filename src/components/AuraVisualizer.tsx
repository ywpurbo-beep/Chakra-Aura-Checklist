import { motion } from "motion/react";
import { ChakraData } from "../types";

interface AuraVisualizerProps {
  chakras: ChakraData[];
  progressMap: Record<string, number>; // Maps chakra id to progress percentage (0 - 100)
  overallProgress: number;
  auraCaption: string;
}

export default function AuraVisualizer({
  chakras,
  progressMap,
  overallProgress,
  auraCaption
}: AuraVisualizerProps) {
  // Define positions (percentage from top) for each chakra
  const positions: Record<string, string> = {
    crown: "4%",
    thirdEye: "9%",
    throat: "22%",
    heart: "34%",
    solar: "44%",
    sacral: "55%",
    root: "66%"
  };

  return (
    <div className="relative min-h-[420px] w-full border border-slate-800/90 rounded-2xl overflow-hidden bg-[#070913] flex flex-col items-center justify-center p-5 shadow-[0_24px_50px_rgba(0,0,0,0.8)] select-none">
      
      {/* Kirlian Photographic Negative Plate Grid Accent */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Dynamic Aura Glow Layer (The high-voltage corona background) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        
        {/* Deep Chemical Photographic Aura Glow - Saturated color-dodge layers */}
        <div 
          className="absolute w-[260px] h-[340px] rounded-[50%/40%_40%_60%_60%] blur-3xl transition-all duration-1000 ease-out saturate-200 mix-blend-screen"
          style={{
            background: `
              radial-gradient(ellipse at 50% 4%, rgba(157, 88, 189, ${(progressMap.crown || 0) * 0.009}), transparent 40%),
              radial-gradient(ellipse at 50% 9%, rgba(97, 87, 200, ${(progressMap.thirdEye || 0) * 0.009}), transparent 40%),
              radial-gradient(ellipse at 50% 22%, rgba(61, 126, 207, ${(progressMap.throat || 0) * 0.009}), transparent 40%),
              radial-gradient(ellipse at 50% 34%, rgba(63, 166, 111, ${(progressMap.heart || 0) * 0.01}), transparent 45%),
              radial-gradient(ellipse at 50% 44%, rgba(213, 168, 18, ${(progressMap.solar || 0) * 0.01}), transparent 45%),
              radial-gradient(ellipse at 50% 55%, rgba(232, 132, 54, ${(progressMap.sacral || 0) * 0.009}), transparent 40%),
              radial-gradient(ellipse at 50% 66%, rgba(217, 77, 69, ${(progressMap.root || 0) * 0.009}), transparent 40%)
            `,
            transform: `scale(${0.9 + overallProgress * 0.003})`,
            opacity: 0.15 + overallProgress * 0.0085
          }}
        />
      </div>

      {/* Human Silhouette & Corona Spark Highlights */}
      <div className="relative w-[130px] h-[260px] z-10 flex items-center justify-center">
        
        {/* Silhouette back-halo (glowing aura surrounding the body) */}
        <div 
          className="absolute inset-x-[-25px] inset-y-[-20px] blur-2xl opacity-70 rounded-full transition-all duration-1000 mix-blend-screen"
          style={{
            background: `
              radial-gradient(circle at 50% 30%, rgba(139, 92, 246, ${overallProgress * 0.006}) 0%, transparent 70%),
              radial-gradient(circle at 50% 60%, rgba(6, 182, 212, ${overallProgress * 0.006}) 0%, transparent 70%)
            `
          }}
        />

        {/* Silhouette Itself (Deep Obsidian Plate contrast with Kirlian neon backlighting) */}
        <div className="absolute inset-0 opacity-95 pointer-events-none">
          {/* Head */}
          <div className="absolute w-[44px] h-[44px] rounded-full bg-[#0d1222] left-[43px] top-[10px] shadow-[inset_0_-2px_8px_rgba(255,255,255,0.08)] border border-slate-800" />
          {/* Torso */}
          <div className="absolute w-[54px] h-[112px] left-[38px] top-[60px] rounded-[24px_24px_16px_16px/36px_36px_20px_20px] bg-[#0d1222] shadow-[inset_0_-4px_12px_rgba(255,255,255,0.08)] border border-slate-800" />
          {/* Left Arm */}
          <div className="absolute w-[20px] h-[116px] left-[17px] top-[68px] rounded-full bg-[#0d1222] origin-top rotate-[8deg] shadow-[inset_-1px_-3px_6px_rgba(255,255,255,0.06)] border border-slate-800" />
          {/* Right Arm */}
          <div className="absolute w-[20px] h-[116px] right-[17px] top-[68px] rounded-full bg-[#0d1222] origin-top -rotate-[8deg] shadow-[inset_1px_-3px_6px_rgba(255,255,255,0.06)] border border-slate-800" />
          {/* Left Leg */}
          <div className="absolute w-[22px] h-[90px] left-[41px] top-[162px] rounded-2xl bg-[#0d1222] shadow-[inset_-1px_-3px_5px_rgba(255,255,255,0.05)] border border-slate-800" />
          {/* Right Leg */}
          <div className="absolute w-[22px] h-[90px] right-[41px] top-[162px] rounded-2xl bg-[#0d1222] shadow-[inset_1px_-3px_5px_rgba(255,255,255,0.05)] border border-slate-800" />
        </div>

        {/* Static, High-Quality Glow Chakra Nodes (Brilliant glowing points) */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {chakras.map((chakra) => {
            const val = progressMap[chakra.id] || 0;
            const topPos = positions[chakra.id] || "50%";
            const hasProgress = val > 0;

            return (
              <div
                key={chakra.id}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ top: topPos }}
              >
                {/* Soft, beautiful background aura around each chakra node */}
                {hasProgress && (
                  <div
                    className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 pointer-events-none transition-all duration-700 blur-md opacity-80"
                    style={{
                      width: 16 + val * 0.35,
                      height: 16 + val * 0.35,
                      backgroundColor: chakra.color,
                      boxShadow: `0 0 ${15 + val * 0.3}px ${chakra.color}`,
                    }}
                  />
                )}

                {/* Steady Luminous Electric Bead */}
                <div
                  className="w-3.5 h-3.5 rounded-full border-2 border-white relative z-30 transition-all duration-500"
                  style={{
                    backgroundColor: "#ffffff",
                    boxShadow: hasProgress 
                      ? `0 0 8px ${chakra.color}, 0 0 16px #ffffff` 
                      : "none"
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Status Legend with Kirlian Aesthetic */}
      <div className="mt-6 text-center px-4 max-w-[290px] border-t border-slate-800/60 pt-4 w-full">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5 flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
          Kirlian Aura Discharge
        </p>
        <p className="text-xs sm:text-sm font-semibold text-slate-300 leading-relaxed transition-all duration-300">
          {auraCaption}
        </p>
      </div>
    </div>
  );
}
