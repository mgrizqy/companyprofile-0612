
export interface Post {
  objectId: string;
  title: string;
  slug: string;
  shortSum?: string; 
  authorName?: string;
  thumbnail?: string;
  category?: string;
  content: string;
  published: boolean;
  created: number;
}