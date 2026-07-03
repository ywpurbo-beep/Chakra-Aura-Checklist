import { ChakraData } from "./types";

export const CHAKRA_DATA: ChakraData[] = [
  {
    id: "root",
    name: "Muladhara",
    label: "Akar",
    color: "#d94d45",
    glowColor: "rgba(217, 77, 69, 0.45)",
    focus: "stabilitas, tubuh, rasa aman",
    description: "Pondasi kekuatan fisik, stabilitas emosional, dan rasa aman dalam menjalani kehidupan harian.",
    items: [
      { id: "root-0", text: "Minum air putih cukup dan makan dengan sadar" },
      { id: "root-1", text: "Berjalan kaki atau melakukan peregangan ringan" },
      { id: "root-2", text: "Merapikan satu area kecil di rumah atau meja kerja" },
      { id: "root-3", text: "Mencatat satu hal yang membuat saya merasa aman" },
      { id: "root-4", text: "Mengatur napas pelan selama 3 menit" }
    ]
  },
  {
    id: "sacral",
    name: "Svadhisthana",
    label: "Sakral",
    color: "#e88436",
    glowColor: "rgba(232, 132, 54, 0.45)",
    focus: "emosi, kreativitas, kenikmatan sehat",
    description: "Pusat kreativitas, kebahagiaan emosi, hubungan sosial, dan penerimaan diri dengan tulus.",
    items: [
      { id: "sacral-0", text: "Memberi ruang untuk merasakan emosi tanpa menghakimi" },
      { id: "sacral-1", text: "Melakukan aktivitas kreatif singkat" },
      { id: "sacral-2", text: "Mendengarkan musik yang mengalirkan suasana" },
      { id: "sacral-3", text: "Menulis satu kebutuhan pribadi yang ingin dihargai" },
      { id: "sacral-4", text: "Menikmati mandi, aroma, atau tekstur dengan penuh sadar" }
    ]
  },
  {
    id: "solar",
    name: "Manipura",
    label: "Solar Plexus",
    color: "#d5a812",
    glowColor: "rgba(213, 168, 18, 0.45)",
    focus: "daya diri, keputusan, disiplin",
    description: "Pusat energi kekuatan tekad, percaya diri, ambisi positif, dan kemampuan mengambil tindakan.",
    items: [
      { id: "solar-0", text: "Menyelesaikan satu tugas penting sampai tuntas" },
      { id: "solar-1", text: "Mengucapkan satu batasan dengan jelas" },
      { id: "solar-2", text: "Berlatih postur tubuh tegak selama beberapa menit" },
      { id: "solar-3", text: "Mencatat satu keputusan kecil yang saya ambil hari ini" },
      { id: "solar-4", text: "Mengurangi satu kebiasaan yang menguras energi" }
    ]
  },
  {
    id: "heart",
    name: "Anahata",
    label: "Jantung",
    color: "#3fa66f",
    glowColor: "rgba(63, 166, 111, 0.45)",
    focus: "kasih, penerimaan, hubungan",
    description: "Pusat cinta kasih universal, empati tinggi, kehangatan hubungan, dan memaafkan kesalahan.",
    items: [
      { id: "heart-0", text: "Mengirim pesan baik kepada seseorang" },
      { id: "heart-1", text: "Memaafkan satu hal kecil yang masih tertahan" },
      { id: "heart-2", text: "Melakukan satu tindakan membantu tanpa pamrih" },
      { id: "heart-3", text: "Meletakkan tangan di dada dan bernapas lembut" },
      { id: "heart-4", text: "Mencatat tiga hal yang saya syukuri" }
    ]
  },
  {
    id: "throat",
    name: "Vishuddha",
    label: "Tenggorokan",
    color: "#3d7ecf",
    glowColor: "rgba(61, 126, 207, 0.45)",
    focus: "komunikasi, kejujuran, ekspresi",
    description: "Pusat ekspresi diri secara autentik, kejujuran luhur, dan kemampuan menyimak secara empati.",
    items: [
      { id: "throat-0", text: "Mengatakan kebenaran dengan tenang dan hormat" },
      { id: "throat-1", text: "Menulis jurnal singkat tanpa disensor" },
      { id: "throat-2", text: "Menyanyikan, membaca lantang, atau melatih suara" },
      { id: "throat-3", text: "Mendengarkan orang lain tanpa memotong" },
      { id: "throat-4", text: "Mengubah keluhan menjadi permintaan yang jelas" }
    ]
  },
  {
    id: "thirdEye",
    name: "Ajna",
    label: "Mata Ketiga",
    color: "#6157c8",
    glowColor: "rgba(97, 87, 200, 0.45)",
    focus: "intuisi, kejernihan, pola pikir",
    description: "Pusat bimbingan batin, intuisi mendalam, imajinasi jernih, dan pemahaman pola kehidupan.",
    items: [
      { id: "thirdEye-0", text: "Diam sejenak sebelum mengambil kesimpulan" },
      { id: "thirdEye-1", text: "Mencatat mimpi, intuisi, atau ide yang muncul" },
      { id: "thirdEye-2", text: "Mengurangi distraksi layar selama 20 menit" },
      { id: "thirdEye-3", text: "Mengamati pola pikiran yang berulang hari ini" },
      { id: "thirdEye-4", text: "Memilih satu prioritas utama untuk besok" }
    ]
  },
  {
    id: "crown",
    name: "Sahasrara",
    label: "Mahkota",
    color: "#9d58bd",
    glowColor: "rgba(157, 88, 189, 0.45)",
    focus: "makna, koneksi, kesadaran",
    description: "Pusat spiritualitas tertinggi, kesadaran kosmik, kedamaian transendental, dan koneksi semesta.",
    items: [
      { id: "crown-0", text: "Meditasi hening atau doa selama beberapa menit" },
      { id: "crown-1", text: "Membaca atau merenungkan hal yang memberi makna" },
      { id: "crown-2", text: "Berterima kasih atas proses yang sedang dijalani" },
      { id: "crown-3", text: "Meletakkan kebutuhan mengontrol satu hal kecil" },
      { id: "crown-4", text: "Menutup hari dengan niat yang jernih" }
    ]
  }
];

export function getInsightText(percent: number, doneCount: number): string {
  if (doneCount === 0) return "Mulai dari satu aktivitas kecil. Progres akan tersimpan otomatis di browser ini.";
  if (percent < 30) return "Awal yang sangat baik. Pilih aktivitas paling ringan agar ritme terasa alami dan menyenangkan.";
  if (percent < 60) return "Aliran energi mulai menguat. Perhatikan pusat chakra dengan progres terendah untuk dibantu penyelarasan berikutnya.";
  if (percent < 85) return "Keseimbangan sejati makin terasa nyata. Lanjutkan dengan aktivitas harian yang memadukan kesehatan fisik dan kejernihan pikiran.";
  if (percent < 100) return "Hampir sepenuhnya selaras! Selesaikan sisa aktivitas dengan penuh kesadaran dan keheningan hati.";
  return "Luar biasa! Seluruh pusat chakra Anda telah selaras. Gunakan catatan refleksi di bawah untuk merangkum getaran positif hari ini.";
}

export function getAuraCaptionText(percent: number, doneCount: number): string {
  if (doneCount === 0) return "Aura tubuh Anda saat ini tenang. Mulailah mencentang aktivitas untuk melihat pancarannya menguat.";
  if (percent < 35) return "Lapisan aura dasar mulai terpancar lembut di sekeliling fisik Anda.";
  if (percent < 70) return "Kombinasi spektrum warna aura berkilau indah dan seimbang.";
  if (percent < 100) return "Tubuh dan kesadaran Anda memancarkan medan energi aura yang tebal, cerah, dan protektif.";
  return "Medan aura selaras penuh! Radiasi cahaya positif terpancar maksimal di seluruh pusat energi Anda.";
}
