
export interface Post {
  objectId: string;
  title: string;
  slug: string;
  shortSum?: string; 
  authorName?: string;
  thumbnail?: string;
  category?: string;
  content: string;
  isPublished?: boolean;
  created: number;
}