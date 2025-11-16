export interface FormData {
  type: 'review' | 'expansion' // TODO
  date: string;
  writer: string

  // Haeder
  title: string
  designers: string[]
  publishers: string[]
  description: string

  // Box
  score: string;
  playingTime: string;
  playingTimeOfficial: string;
  weight: string;
  playerCount: string;
  playerCountOfficial: string;

  // Sidebar
  mechanisms: string[];
  necessity: string;
  complexity: string;
  preparation: string;
  luck: string;
  longevity: string;
  components: string;
  portability: string;

  // Contenuto
  reviewLink: string;
  setting: string;
  rules: string;
  feedback: string;
  panoramic: string;
}