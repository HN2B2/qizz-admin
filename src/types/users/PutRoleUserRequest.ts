export enum UserRole {
  GUEST = "GUEST",
  USER = "USER",
  STAFF = "STAFF",
  ADMIN = "ADMIN",
}

export default interface PutRoleUserRequest {
  role: UserRole;
  banned: false;
}
