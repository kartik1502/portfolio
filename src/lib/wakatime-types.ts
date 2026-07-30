export type WakaLang = { name: string; percent: number };
export type WakaStats = {
  weekTotal: string;
  dailyAvg: string;
  topLang: string;
  topPercent: number;
  languages: WakaLang[];
  updatedAt: string;
  unavailable?: boolean;
};