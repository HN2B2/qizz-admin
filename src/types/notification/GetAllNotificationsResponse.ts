import { NotificationResponse } from ".";

export default interface GetAllNotificationsResponse {
  data: NotificationResponse[];
  total: number;
}
