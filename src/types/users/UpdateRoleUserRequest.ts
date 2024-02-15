import { UserRole } from "./UserRole";

export default interface UpdateRoleUserRequest {
  role: UserRole;
  banned: false;
}

