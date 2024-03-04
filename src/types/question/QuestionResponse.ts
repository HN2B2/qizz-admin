import { QuestionType } from "./QuestionType";

export default interface QuestionResponse {
  questionId: number;
  content: string;
  point: number;
  duration: number;
  type: QuestionType;
  answersMetadata: string;
  correctAnswersMetadata: string;
  explainAnswer: string;
  questionIndex: number;
  createdAt: string;
  modifiedAt: string;
  disabled: boolean;
  quizBankId: number;
}
