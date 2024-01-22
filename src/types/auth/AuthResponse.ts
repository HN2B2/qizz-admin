import UserResponse from "@/types/user/UserResponse"

export default interface LoginResponse {
    token: string
    user: UserResponse
}
