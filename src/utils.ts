import slugify from "slugify";
import type {Frontmatter} from "./types.ts";

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("it-IT", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}

export function slug(text: string): string {
  return slugify(text, {lower: true, strict: true});
}

export type PostGlob = {
  frontmatter: Frontmatter;
  file: string;
};

export function getPostFiles() {
  return Object.entries(import.meta.glob('/src/**/index.mdx'))
}

export async function buildPosts(pages: [string, () => Promise<unknown>][]): Promise<PostGlob[]> {
  return await Promise.all(pages.map(async ([path, module]) => {
    const mod = (await module()) as { frontmatter: Frontmatter };
    return {...mod, file: path};
  }))
}

export const sortPosts = (a: PostGlob, b: PostGlob) => {
  const dateA = new Date(a.frontmatter.date).getTime();
  const dateB = new Date(b.frontmatter.date).getTime();
  return dateB - dateA; // Newer dates first
}

export function shuffle(array: unknown[]) {
  let currentIndex = array.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

export const titleize = (title: string) => {
  const a = title.slice(0, 1);
  return a.toUpperCase() + title.slice(1).toLowerCase()
}

export const typeToPage: Record<Frontmatter['type'], string> = {
  review: 'reviews',
  preview: 'previews',
  next: 'nexts',
  advisor: 'advisor',
  interview: 'interview',
  con: 'convention',
  funding: 'funding',
}