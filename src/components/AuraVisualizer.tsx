import { motion } from "motion/react";
import { ChakraScore } from "../types";
import darkAuraBg from "../assets/images/dark_aura_watercolor_1783248768809.jpg";
import watercolorSilhouette from "../assets/images/watercolor_silhouette_1783249105920.jpg";

interface AuraVisualizerProps {
  chakras: ChakraScore[];
  progressMap: Record<string, number>; // Maps chakra id to progress percentage (0 - 100)
  overallProgress: number;
  auraCaption: string;
  aiOpinion?: string;
}

export default function AuraVisualizer({
  chakras,
  progressMap,
  overallProgress,
  auraCaption,
  aiOpinion
}: AuraVisualizerProps) {
  // Define positions (percentage from top) for each chakra aligned with the silhouette
  const positions: Record<string, string> = {
    crown: "13%",
    thirdEye: "21%",
    throat: "34%",
    heart: "46%",
    solar: "58%",
    sacral: "68%",
    root: "79%"
  };

  // Determine if there is an imbalance (e.g., standard deviation of active chakra scores is high, or some are 100 while others are 0)
  // We can smoothly show a subtle asymmetric pulsing offset if there's a significant imbalance
  const activeScores = chakras.map(c => progressMap[c.id] || 0);
  const maxScore = Math.max(...activeScores, 1);
  const minScore = Math.min(...activeScores);
  const isImbalanced = (maxScore - minScore) > 50 && overallProgress > 10;

  return (
    <div className="relative min-h-[440px] w-full border border-stone-800 rounded-3xl overflow-hidden bg-[#131211] flex flex-col items-center justify-center p-6 shadow-xl select-none">
      
      {/* Dark Watercolor Background Plate */}
      <img 
        src={darkAuraBg} 
        alt="Dark Aura Watercolor Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-[0.35] pointer-events-none select-none mix-blend-overlay"
        referrerPolicy="no-referrer"
      />
      
      {/* Textured Warm Slate plate backing */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#8b7355_1.2px,transparent_1.2px)] [background-size:16px_16px]" />

      {/* Dynamic Quiet Aura Glow Layer (The elegant spiritual forest & earthen canopy glow) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        
        {/* Organic slow-breathing background color gradients reflecting active Laku nodes */}
        <motion.div 
          className="absolute w-[280px] h-[360px] rounded-[50%/40%_40%_60%_60%] blur-3xl transition-all duration-1000 ease-out saturate-[1.25] mix-blend-screen"
          animate={isImbalanced ? {
            x: [0, -8, 6, -4, 0],
            y: [0, 4, -6, 2, 0],
          } : {
            scale: [0.98, 1.02, 0.98]
          }}
          transition={{
            duration: isImbalanced ? 12 : 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: `
              radial-gradient(ellipse at 50% 13%, rgba(157, 88, 189, ${(progressMap.crown || 0) * 0.0055}), transparent 40%),
              radial-gradient(ellipse at 50% 21%, rgba(97, 87, 200, ${(progressMap.thirdEye || 0) * 0.0055}), transparent 40%),
              radial-gradient(ellipse at 50% 34%, rgba(61, 126, 207, ${(progressMap.throat || 0) * 0.0055}), transparent 40%),
              radial-gradient(ellipse at 50% 46%, rgba(63, 166, 111, ${(progressMap.heart || 0) * 0.0065}), transparent 45%),
              radial-gradient(ellipse at 50% 58%, rgba(213, 168, 18, ${(progressMap.solar || 0) * 0.0065}), transparent 45%),
              radial-gradient(ellipse at 50% 68%, rgba(232, 132, 54, ${(progressMap.sacral || 0) * 0.0055}), transparent 40%),
              radial-gradient(ellipse at 50% 79%, rgba(217, 77, 69, ${(progressMap.root || 0) * 0.0055}), transparent 40%)
            `,
            transform: `scale(${0.9 + overallProgress * 0.0025})`,
            opacity: 0.25 + overallProgress * 0.0075
          }}
        />

        {/* Outer Halo Rings with gentle breathing animation */}
        <motion.div 
          className="absolute w-[250px] h-[310px] rounded-full border border-stone-700/10"
          animate={{
            scale: [1, 1.03, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Human Silhouette & Glow Highlights */}
      <div className="relative w-[210px] h-[210px] z-10 flex items-center justify-center">
        
        {/* Soft back-halo representing overall organic integration */}
        <div 
          className="absolute inset-x-[-20px] inset-y-[-15px] blur-2xl opacity-50 rounded-full transition-all duration-1000 mix-blend-screen"
          style={{
            background: `radial-gradient(circle, rgba(139, 115, 85, ${overallProgress * 0.005}) 0%, transparent 80%)`
          }}
        />

        {/* Silhouette Itself (Artistic Watercolor image) */}
        <div className="absolute inset-0 opacity-[0.85] pointer-events-none mix-blend-screen">
          <img 
            src={watercolorSilhouette} 
            alt="Artistic Watercolor Meditating Silhouette" 
            className="w-full h-full object-contain rounded-2xl"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Dynamic Laku State Nodes (Gently glowing beads, non-flashing) */}
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
                {/* Organic slow-breathing color aura halo around node */}
                {hasProgress && (
                  <motion.div
                    className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 pointer-events-none transition-all duration-1000 blur-md"
                    style={{
                      width: 14 + val * 0.35,
                      height: 14 + val * 0.35,
                      backgroundColor: chakra.color,
                      boxShadow: `0 0 ${12 + val * 0.25}px ${chakra.color}`,
                    }}
                    animate={{
                      scale: [0.96, 1.04, 0.96],
                      opacity: [0.65, 0.85, 0.65]
                    }}
                    transition={{
                      duration: 4 + (100 - val) * 0.02,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}

                {/* Steady Luminous White Core Bead */}
                <div
                  className="w-3 h-3 rounded-full border border-white/60 relative z-30 transition-all duration-700"
                  style={{
                    backgroundColor: "#ffffff",
                    boxShadow: hasProgress 
                      ? `0 0 6px ${chakra.color}, 0 0 12px #ffffff` 
                      : "none",
                    transform: hasProgress ? "scale(1.1)" : "scale(0.85)",
                    opacity: hasProgress ? 1 : 0.4
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Status Legend with Zen Organic Aesthetic */}
      <div className="mt-6 text-center px-4 max-w-[300px] border-t border-stone-800/80 pt-4 w-full">
        <p className="text-[10px] font-extrabold uppercase tracking-widest text-stone-500 mb-1.5 flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8b7355]" />
          Visualisasi Pancaran Diri
        </p>
        <p className="text-xs sm:text-sm font-semibold text-stone-300 leading-relaxed transition-all duration-300">
          {auraCaption}
        </p>
        {aiOpinion && (
          <div className="mt-4 p-3 rounded-xl bg-stone-900/60 border border-stone-800/80 text-stone-400 text-xs text-left leading-relaxed">
            <span className="text-[9px] font-black uppercase tracking-wider text-[#8b7355] block mb-1">
              Petunjuk Rasa (AI)
            </span>
            &ldquo;{aiOpinion}&rdquo;
          </div>
        )}
      </div>
    </div>
  );
}
