export interface IndustryLeader {
  name: string;
  marketCap: string;
}

export interface Industry {
  name: string;
  score: number;
  description: string;
  investment: string;
  keyAreas: string[];
  tam: string;
  techTailwinds: string[];
  leaders: IndustryLeader[];
}