export interface Post {
  id: number;
  title: string;
  comments: Comment[];
}
export interface Comment {
  id: number;
  description: string;
}
