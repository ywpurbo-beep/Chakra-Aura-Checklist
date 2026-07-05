export interface LakuItem {
  id: string;
  text: string;
  // Under the hood mapping to chakras: key is chakra ID (root, sacral, solar, heart, throat, thirdEye, crown)
  // Value is weight multiplier (usually 1.0 for primary, 0.5 for secondary, etc.)
  chakraWeights: Record<string, number>;
}

export interface LakuCategory {
  id: string;
  title: string;
  emoji: string;
  description: string;
  items: LakuItem[];
}

export type LakuScoreValue = 0 | 1 | 2; // 0 = Tidak dilakukan, 1 = Sekadarnya, 2 = Penuh kesadaran

export interface LakuState {
  [itemId: string]: LakuScoreValue;
}

export interface ChakraScore {
  id: string;
  name: string;
  label: string;
  color: string;
  glowColor: string;
  description: string;
  score: number; // 0 to 100
}
