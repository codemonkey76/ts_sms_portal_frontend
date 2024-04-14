import type { UserData } from './User'

export interface ValidateSessionResponse {
  loggedIn: boolean;
  verified: boolean;
  user: UserData;
}
