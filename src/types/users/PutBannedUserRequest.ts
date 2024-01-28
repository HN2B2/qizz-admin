import { UserRole } from "./UserRole";

export default interface PutBannedUserRequest {
  role: UserRole;
  banned: boolean;
}
