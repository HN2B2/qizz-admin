export enum UserRole {
  GUEST = "GUEST",
  USER = "USER",
  STAFF = "STAFF",
  ADMIN = "ADMIN",
}

export default interface PutBannedUserRequest {
  role: UserRole;
  banned: boolean;
}
