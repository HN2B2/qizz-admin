export enum UserRole {
    GUEST = "GUEST",
    USER = "USER",
    STAFF = "STAFF",
    ADMIN = "ADMIN",
}

export default interface UserResponse {
    id: number
    username: string
    email: string
    role: UserRole
    displayName: string
    createdAt: string
    modifiedAt: string
}
