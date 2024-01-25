import { UserResponse } from "../user";

export default interface GetAllUSerResponse {
  data: UserResponse[];
  total: number;
}
