export interface Note {
  _id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  is_favorite: boolean;
  is_archived: boolean;
}

export interface User {
  _id: number;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
}
