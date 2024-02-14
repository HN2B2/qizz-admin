import { UserRole } from "./UserRole";

export default interface UpdateBannedUserRequest {
  role: UserRole;
  banned: boolean;
}

