import { NotificationTargetType } from "../user/NotificationTargetType";

export default interface NotificationResponse {
  id: number;
  title: string;
  content: string;
  targetType: NotificationTargetType;
  createdAt: string;
  modifiedAt: string;
  createdBy: number;
}
