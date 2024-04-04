export type User = {
  id: number,
  name: string,
  email: string,
  active: boolean,
  email_verified_at: string,
  created_at: string,
  updated_at: string
}

export type UserData = {
  user: User
  permissions: string[]
}