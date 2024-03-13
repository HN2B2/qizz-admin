import { NotificationTargetType } from "../user/NotificationTargetType";

export default interface CreateNotificationRequest {
    title: string;
    content: string;
    targetType: NotificationTargetType;
  }