export interface UserData {
  user: User,
  permissions: string[]
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  active: boolean;
  avatar_url: string | null;
  created_at: string;
  updated_at: string | null;
}
