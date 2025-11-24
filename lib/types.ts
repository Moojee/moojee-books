// lib/types.ts
export type Book = {
  id: string;
  title: string;
  cover_url: string | null;
  tags: string[];
  is_read: boolean;
  rating: number | null;
  review: string | null;
  created_at: string;
  updated_at: string;
};
