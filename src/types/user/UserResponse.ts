import { UserRole } from "../users/UserRole";

export default interface UserResponse {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  displayName: string;
  createdAt: string;
  modifiedAt: string;
  banned: boolean;
}
