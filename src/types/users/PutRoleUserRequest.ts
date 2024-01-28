import { UserRole } from "./UserRole";

export default interface PutRoleUserRequest {
  role: UserRole;
  banned: false;
}
