import { LakuCategory, ChakraScore } from "./types";

export const CHAKRA_METADATA = [
  { 
    id: "root", 
    name: "Muladhara", 
    label: "Akar", 
    color: "#d94d45", 
    glowColor: "rgba(217, 77, 69, 0.45)", 
    description: "Kestabilan jasmani, ketahanan fisik, rasa membumi, dan keteraturan ritme hidup dasar." 
  },
  { 
    id: "sacral", 
    name: "Svadhisthana", 
    label: "Sakral", 
    color: "#e88436", 
    glowColor: "rgba(232, 132, 54, 0.45)", 
    description: "Keseimbangan emosi, kebersihan hasrat, pemenuhan kebutuhan tubuh secara sehat." 
  },
  { 
    id: "solar", 
    name: "Manipura", 
    label: "Solar Plexus", 
    color: "#d5a812", 
    glowColor: "rgba(213, 168, 18, 0.45)", 
    description: "Kekuatan kehendak, disiplin diri, tanggung jawab, dan tekad bertindak." 
  },
  { 
    id: "heart", 
    name: "Anahata", 
    label: "Jantung", 
    color: "#3fa66f", 
    glowColor: "rgba(63, 166, 111, 0.45)", 
    description: "Pancaran cinta kasih, empati, kebesaran jiwa dalam memaafkan, dan rasa syukur." 
  },
  { 
    id: "throat", 
    name: "Vishuddha", 
    label: "Tenggorokan", 
    color: "#3d7ecf", 
    glowColor: "rgba(61, 126, 207, 0.45)", 
    description: "Kejujuran berekspresi, kelembutan ucapan, serta kemampuan menyimak dengan tulus." 
  },
  { 
    id: "thirdEye", 
    name: "Ajna", 
    label: "Mata Ketiga", 
    color: "#6157c8", 
    glowColor: "rgba(97, 87, 200, 0.45)", 
    description: "Kejernihan cara pandang, intuisi batin, dan kesadaran mengamati gerak pikiran." 
  },
  { 
    id: "crown", 
    name: "Sahasrara", 
    label: "Mahkota", 
    color: "#9d58bd", 
    glowColor: "rgba(157, 88, 189, 0.45)", 
    description: "Kemurnian spiritualitas, kontemplasi makna mendalam, dan kedekatan dengan Sang Pencipta." 
  }
];

export const LAKU_CATEGORIES: LakuCategory[] = [
  {
    id: "ritme-alam",
    title: "Ritme Alam",
    emoji: "🌅",
    description: "Penyelarasan diri dengan siklus kosmis dan keheningan semesta alam.",
    items: [
      {
        id: "ritme-bangun-pagi",
        text: "Bangun sebelum matahari terbit",
        chakraWeights: { root: 1.0, crown: 0.5 }
      },
      {
        id: "ritme-berjemur",
        text: "Berjemur pagi menyerap energi mentari",
        chakraWeights: { crown: 1.0, root: 0.3 }
      },
      {
        id: "ritme-mengamati-matahari",
        text: "Mengamati matahari terbit atau terbenam secara khusyuk",
        chakraWeights: { crown: 1.0, thirdEye: 0.3 }
      },
      {
        id: "ritme-mengamati-alam",
        text: "Mengamati alam (pohon, langit, atau tanah) dengan tenang",
        chakraWeights: { root: 1.0, thirdEye: 0.5 }
      }
    ]
  },
  {
    id: "tubuh",
    title: "Tubuh",
    emoji: "🏃",
    description: "Memuliakan bait jasmani sebagai wadah kehidupan yang bersih dan kuat.",
    items: [
      {
        id: "tubuh-jalan-kaki",
        text: "Berjalan kaki dengan sadar (mindful walking)",
        chakraWeights: { root: 1.0 }
      },
      {
        id: "tubuh-latihan-fisik",
        text: "Melakukan latihan fisik atau olahraga teratur",
        chakraWeights: { solar: 1.0, root: 0.3 }
      },
      {
        id: "tubuh-peregangan",
        text: "Melakukan peregangan otot untuk melenturkan aliran energi",
        chakraWeights: { root: 0.8, sacral: 0.4 }
      },
      {
        id: "tubuh-tidur-cukup",
        text: "Tidur cukup dan beristirahat secara berkualitas",
        chakraWeights: { root: 1.0 }
      },
      {
        id: "tubuh-minum-air",
        text: "Minum air putih murni yang cukup sepanjang hari",
        chakraWeights: { sacral: 1.0 }
      },
      {
        id: "tubuh-makan-secukupnya",
        text: "Makan secukupnya dan dengan rasa syukur (mindful eating)",
        chakraWeights: { sacral: 1.0, solar: 0.3 }
      }
    ]
  },
  {
    id: "pengendalian-diri",
    title: "Pengendalian Diri",
    emoji: "🌱",
    description: "Menjaga batas, mengasah disiplin, dan mengendalikan gejolak impuls batin.",
    items: [
      {
        id: "diri-menyelesaikan-kerja",
        text: "Menyelesaikan pekerjaan atau kewajiban yang tertunda",
        chakraWeights: { solar: 1.0 }
      },
      {
        id: "diri-menepati-janji",
        text: "Menepati janji yang telah diucapkan kepada diri atau orang lain",
        chakraWeights: { solar: 1.0, heart: 0.3 }
      },
      {
        id: "diri-menahan-impulsif",
        text: "Menahan dorongan keinginan impulsif atau hasrat sesaat",
        chakraWeights: { sacral: 1.0, solar: 0.5 }
      },
      {
        id: "diri-mengurangi-gadget",
        text: "Mengurangi penggunaan gadget/media sosial yang tidak perlu",
        chakraWeights: { solar: 1.0, thirdEye: 0.4 }
      }
    ]
  },
  {
    id: "relasi",
    title: "Relasi",
    emoji: "❤️",
    description: "Merawat tali kasih dengan sesama makhluk melalui empati dan maaf.",
    items: [
      {
        id: "relasi-membantu",
        text: "Membantu orang lain secara ikhlas tanpa pamrih",
        chakraWeights: { heart: 1.0 }
      },
      {
        id: "relasi-terima-kasih",
        text: "Mengucapkan terima kasih dengan tulus dan penuh rasa",
        chakraWeights: { heart: 1.0, throat: 0.3 }
      },
      {
        id: "relasi-memaafkan",
        text: "Memaafkan kesalahan orang lain atau diri sendiri",
        chakraWeights: { heart: 1.0, thirdEye: 0.3 }
      },
      {
        id: "relasi-mendengarkan",
        text: "Mendengarkan keluh kesah orang lain dengan perhatian penuh",
        chakraWeights: { heart: 1.0, throat: 0.5 }
      }
    ]
  },
  {
    id: "kejujuran-ucapan",
    title: "Kejujuran dan Ucapan",
    emoji: "🗣",
    description: "Menjaga keselarasan tutur kata agar bermakna dan menyejukkan hati.",
    items: [
      {
        id: "ucapan-jujur",
        text: "Berkata jujur walau dalam hal-hal kecil",
        chakraWeights: { throat: 1.0 }
      },
      {
        id: "ucapan-kurangi-keluhan",
        text: "Mengurangi keluhan verbal dan mengalihkan ke penerimaan",
        chakraWeights: { throat: 1.0, heart: 0.3 }
      },
      {
        id: "ucapan-hindari-gosip",
        text: "Menghindari gosip, celaan, atau membicarakan keburukan orang",
        chakraWeights: { throat: 1.0 }
      },
      {
        id: "ucapan-kata-membangun",
        text: "Mengucapkan kata-kata penyemangat yang membangun",
        chakraWeights: { throat: 1.0, heart: 0.3 }
      }
    ]
  },
  {
    id: "kesadaran",
    title: "Kesadaran",
    emoji: "👁",
    description: "Kembali ke saat ini, mengamati batin tanpa penghakiman.",
    items: [
      {
        id: "kesadaran-meditasi",
        text: "Melakukan meditasi, napas sadar, atau yoga hening",
        chakraWeights: { thirdEye: 1.0, crown: 0.4 }
      },
      {
        id: "kesadaran-refleksi",
        text: "Menulis catatan refleksi atau mengevaluasi diri hari ini",
        chakraWeights: { thirdEye: 1.0, throat: 0.3 }
      },
      {
        id: "kesadaran-mengamati-pikiran",
        text: "Mengamati riak pikiran sendiri tanpa larut di dalamnya",
        chakraWeights: { thirdEye: 1.0 }
      },
      {
        id: "kesadaran-keheningan",
        text: "Duduk diam dalam keheningan total tanpa distraksi",
        chakraWeights: { thirdEye: 1.0, crown: 0.5 }
      }
    ]
  },
  {
    id: "spiritualitas",
    title: "Spiritualitas",
    emoji: "🕊",
    description: "Menghubungkan laku kedirian dengan kesadaran semesta dan Sang Pencipta.",
    items: [
      {
        id: "spiritual-berdoa",
        text: "Berdoa atau menjalankan ibadah ritual dengan khusyuk",
        chakraWeights: { crown: 1.0 }
      },
      {
        id: "spiritual-kontemplasi",
        text: "Melakukan kontemplasi atas rahasia kebaikan hidup",
        chakraWeights: { crown: 1.0, thirdEye: 0.5 }
      },
      {
        id: "spiritual-mensyukuri",
        text: "Mensyukuri tarikan napas dan segala karunia hidup hari ini",
        chakraWeights: { heart: 1.0, crown: 0.5 }
      },
      {
        id: "spiritual-tujuan-hidup",
        text: "Mengingat dan meneguhkan kembali tujuan luhur kehidupan saya",
        chakraWeights: { crown: 1.0, solar: 0.3 }
      }
    ]
  }
];

/**
 * Calculates programmatic chakra scores from the selected Laku values.
 * Every Laku value is 0 (tidak dilakukan), 1 (sekadarnya), or 2 (dengan penuh kesadaran).
 */
export function calculateChakraScores(state: Record<string, number>): ChakraScore[] {
  return CHAKRA_METADATA.map((chakra) => {
    let totalWeight = 0;
    let earnedScore = 0;

    // Scan all categories and items
    LAKU_CATEGORIES.forEach((category) => {
      category.items.forEach((item) => {
        const weight = item.chakraWeights[chakra.id] || 0;
        if (weight > 0) {
          // Max points per item is weight * 2
          totalWeight += weight * 2;
          const scoreValue = state[item.id] || 0; // 0, 1, or 2
          earnedScore += weight * scoreValue;
        }
      });
    });

    const percent = totalWeight > 0 ? Math.round((earnedScore / totalWeight) * 100) : 0;

    return {
      id: chakra.id,
      name: chakra.name,
      label: chakra.label,
      color: chakra.color,
      glowColor: chakra.glowColor,
      description: chakra.description,
      score: percent
    };
  });
}

/**
 * Generates Indonesian wisdom feedback based on programmatic scores.
 */
export function generateReflectionFeedback(chakras: ChakraScore[], completedCount: number): string {
  if (completedCount === 0) {
    return "Laku belum dimulai. Pilihlah satu atau dua tindakan harian untuk mengawali perjalanan refleksi hari ini.";
  }

  // Map chakras to specific life domains
  // root: Ritme hidup & Ketahanan tubuh
  // sacral: Keseimbangan emosi & Keinginan
  // solar: Energi kehendak & Kedisiplinan
  // heart: Kasih sayang & Relasi sosial
  // throat: Kejujuran & Kebijaksanaan tutur kata
  // thirdEye: Keheningan batin & Kejernihan cara pandang
  // crown: Kedalaman spiritualitas & Kesadaran kosmis

  const rootScore = chakras.find((c) => c.id === "root")?.score || 0;
  const sacralScore = chakras.find((c) => c.id === "sacral")?.score || 0;
  const solarScore = chakras.find((c) => c.id === "solar")?.score || 0;
  const heartScore = chakras.find((c) => c.id === "heart")?.score || 0;
  const throatScore = chakras.find((c) => c.id === "throat")?.score || 0;
  const thirdEyeScore = chakras.find((c) => c.id === "thirdEye")?.score || 0;
  const crownScore = chakras.find((c) => c.id === "crown")?.score || 0;

  let feedback = "";

  // 1. Analyze Strongest areas
  const strengths: string[] = [];
  if (rootScore >= 70) strengths.push("keteraturan ritme hidup jasmani yang teratur");
  if (sacralScore >= 70) strengths.push("kematangan dalam mengendalikan dorongan keinginan");
  if (solarScore >= 70) strengths.push("energi kehendak dan disiplin diri yang kuat");
  if (heartScore >= 70) strengths.push("ketulusan dalam menjalin hubungan kasih dengan sesama");
  if (throatScore >= 70) strengths.push("kesadaran menjaga kemurnian dan kejujuran kata");
  if (thirdEyeScore >= 70) strengths.push("kejernihan pikiran dan kebiasaan mawas diri");
  if (crownScore >= 70) strengths.push("kesadaran luhur dan kepasrahan batin yang mendalam");

  // 2. Analyze Growth areas (low scores)
  const growthAreas: string[] = [];
  if (rootScore < 40) growthAreas.push("ketahanan fisik dan penyelarasan dengan alam");
  if (sacralScore < 40) growthAreas.push("keseimbangan emosi dan pemenuhan kebutuhan sehat tubuh");
  if (solarScore < 40) growthAreas.push("kedisiplinan bertindak serta penyelesaian kewajiban");
  if (heartScore < 40) growthAreas.push("kehangatan relasi sosial dan rasa syukur mendasar");
  if (throatScore < 40) growthAreas.push("kejujuran laku serta pengendalian tutur ucapan");
  if (thirdEyeScore < 40) growthAreas.push("keheningan batin dan mawas diri dari kebisingan");
  if (crownScore < 40) growthAreas.push("kontemplasi makna luhur kehidupan");

  // Construct sentences
  if (strengths.length > 0) {
    const listStrength = strengths.slice(0, 2).join(" serta ");
    feedback += `Laku Anda hari ini memancarkan ${listStrength}. `;
  } else {
    feedback += "Laku hari ini berjalan dengan tenang dan berhati-hati. ";
  }

  if (growthAreas.length > 0) {
    const listGrowth = growthAreas.slice(0, 2).join(" serta ");
    feedback += `Area yang masih membutuhkan perhatian lembut dan pembiasaan sadar adalah bagian ${listGrowth}.`;
  } else {
    feedback += "Selamat, keselarasan yang matang tercermin di seluruh aspek laku Anda hari ini. Terus pelihara ketenangan batin ini.";
  }

  return feedback;
}

/**
 * Generates an elegant, non-mystic description of the aura field strength.
 */
export function getAuraCaptionText(overallProgress: number, completedCount: number): string {
  if (completedCount === 0) {
    return "Aura diri Anda saat ini berada dalam kondisi istirahat tenang. Mulailah menyelaraskan tindakan Anda hari ini.";
  }
  if (overallProgress < 30) {
    return "Pancaran diri awal mulai terbentuk lembut, mencerminkan niat baik yang baru tumbuh.";
  }
  if (overallProgress < 60) {
    return "Spektrum energi diri terlihat lebih stabil dan hangat, menandakan konsistensi laku harian.";
  }
  if (overallProgress < 85) {
    // Elegant, calm Indonesian description of highly protective aura field
    return "Medan energi hidup Anda tampak tebal dan cerah, memancarkan kedamaian batin ke lingkungan sekitar.";
  }
  return "Keadaan batin Anda selaras penuh! Radiasi ketenangan terpancar maksimal ke sekeliling Anda.";
}

/**
 * Generates an elegant, non-mystical AI Opinion based on the current laku state and chakra configuration.
 */
export function generateAIOpinion(chakras: ChakraScore[], completedCount: number): string {
  if (completedCount === 0) {
    return "Silakan mulai dengan memilih laku harian Anda. Kecerdasan Buatan (AI) akan membaca getaran keselarasan batin Anda di sini.";
  }

  // Find the highest and lowest scored chakras
  const sorted = [...chakras].sort((a, b) => b.score - a.score);
  const highest = sorted[0];
  const lowest = sorted[sorted.length - 1];

  // If all are the same
  if (highest.score === lowest.score && highest.score > 0) {
    return "Sintesis AI: Laku batin Anda berada dalam kondisi keseimbangan sejati hari ini. Setiap pusat energi memancarkan pendaran yang saling menopang secara merata. Ini adalah pencapaian mawas diri yang mulia.";
  }

  const intros = [
    "Sintesis AI mengamati adanya kehangatan yang stabil dalam laku harian Anda.",
    "Analisis visualisasi menangkap pancaran energi diri yang tenang dan tertata.",
    "Berdasarkan pola getaran laku Anda, batin sedang berada pada fase kontemplasi sehat.",
    "Riak kesadaran harian Anda terekam mengalir secara jernih dan terarah."
  ];

  // Pick intro deterministically
  const scoreSum = chakras.reduce((sum, c) => sum + c.score, 0);
  const intro = intros[scoreSum % intros.length];

  let body = "";
  if (highest.score > 50) {
    const highestInterpretations: Record<string, string> = {
      root: "Kekuatan laku fisik membumi secara teratur, memberi Anda daya tahan murni menghadapi kesibukan duniawi.",
      sacral: "Pengendalian hasrat dan emosi Anda mengalir seimbang, membebaskan batin dari jerat impulsivitas.",
      solar: "Api disiplin dan keteguhan kehendak menyala cerah, menuntun Anda menyelesaikan kewajiban dengan ketulusan.",
      heart: "Pancaran kasih sayang serta kemudahan memaafkan meluas lembut, mengademkan sekeliling relasi Anda.",
      throat: "Tutur kata yang jujur dan kejernihan komunikasi menjadi pelita penyejuk, mengurangi keluhan yang merusak suasana.",
      thirdEye: "Kesadaran mawas diri mengamati setiap riak pikiran dengan sabar, tidak lekas terhanyut oleh prasangka.",
      crown: "Kontemplasi spiritual dan kepasrahan mengakar indah, membawa keteduhan batin yang senyap namun kokoh."
    };
    body = highestInterpretations[highest.id] || "Niat baik Anda mulai menampakkan hasil keselarasan yang bertahap.";
  } else {
    body = "Laku Anda saat ini masih berupa riak niat awal yang tulus, teruskan pembiasaan ini dengan kesabaran.";
  }

  let advice = "";
  if (lowest.score < 40) {
    const lowestInterpretations: Record<string, string> = {
      root: "Namun, seimbangkan pula aktivitas batin ini dengan istirahat ragawi yang cukup agar tubuh tidak kehilangan pijakan.",
      sacral: "Namun, berikan perhatian kecil pada kebersihan hasrat dan pemenuhan nutrisi/air secukupnya agar vitalitas tetap terjaga.",
      solar: "Namun, waspadai timbulnya rasa enggan; selesaikan tanggung jawab atau janji yang masih tertunda.",
      heart: "Namun, bukalah kembali sekat ego agar ketulusan berbagi dan kelapangan memaafkan tidak ikut meredup.",
      throat: "Namun, waspadai ucapan sia-sia atau kebiasaan mengeluh yang dapat melukai kemurnian energi diri Anda.",
      thirdEye: "Namun, sempatkanlah duduk hening sejenak demi menjernihkan kebisingan pikiran dari distraction luar.",
      crown: "Namun, luangkan waktu sejenak untuk berdoa atau mensyukuri tarikan napas kehidupan yang sering terabaikan."
    };
    advice = lowestInterpretations[lowest.id] || "";
  } else {
    advice = "Seluruh pilar batin Anda berinteraksi harmonis tanpa ada ketimpangan batin yang menonjol.";
  }

  return `${intro} ${body} ${advice}`;
}
