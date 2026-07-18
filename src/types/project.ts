export interface Project {
  title: string;
  eyebrow: string;
  desc: string;
  tags: string[];
  color: string;
  overview: string;
  challenge: string;
  solution: string;
  impact: string[];
  stats: [string, string][];
  snippet: string;
  liveUrl?: string;
  image?: string;
}
