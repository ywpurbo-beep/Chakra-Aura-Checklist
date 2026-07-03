export interface ChecklistItem {
  id: string;
  text: string;
}

export interface ChakraData {
  id: string;
  name: string;
  label: string;
  color: string;
  glowColor: string; // Tailwind glow color
  focus: string;
  description: string;
  items: ChecklistItem[];
}

export interface ChecklistState {
  [key: string]: boolean;
}
