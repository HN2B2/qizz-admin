import { SubCategory } from "../category";
import { UserResponse } from "../user";

export default interface Bank {
  quizBankId: number;
  name: string;
  description?: string | null;
  featuresImage?: string | null;
  createdAt: string;
  modifiedAt: string;
  quizPublicity: boolean;
  publicEditable: boolean;
  subCategories?: SubCategory[];
  draft?: boolean;
  totalQuestions?: number;
  createdBy: UserResponse;
  modifiedBy?: UserResponse;
  totalUpVotes?: number;
}
