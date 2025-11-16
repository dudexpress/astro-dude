export interface Author {
  name: string;
  summary: string;
  image: string;
  instagram_url?: string;
  youtube_url?: string;
  facebook_url?: string;
  tiktok_url?: string;
  website?: string;
}

export interface SidebarVotes {
  title: string;
  value: number;
}

export interface Sleeve {
  amount: number;
  size: string;
}

export interface SimpleFrontmatter {
  file: string;  // file path
  date: string;
  title: string;
  description: string;
  writer: string;
  mechanisms: string[];
}

export type PostWeight = 1 | 2 | 3 | 4 | 5;

export interface Frontmatter extends SimpleFrontmatter {
  type:
    | "advisor"
    | "con"
    | "funding"
    | "interview"
    | "review"
    | "preview"
    | "next";
  designer: string[];
  publisher: string[];

  // boxes
  score: number;
  weight: PostWeight;
  player_count: number;
  player_count_official: string;
  playing_time: string;
  playing_time_official: string;

  // sidebar
  sidebar_votes: SidebarVotes[];
  sleeves: Sleeve[];

  // bio
  writer: string;
  dungeondice_url: string;
  magicmerchant_url: string;
  getyourfun_url: string;
  fantasia_url: string;
  blasone_url: string;
  lsgiochi_url: string;
  mse_url: string;
  weega_url: string;
  gamefound_url: string;
  kickstarter_url: string;
}
