import { SubCategory } from ".";

export default interface Category {
  id: number;
  createdAt: string;
  name: string;
  description: string;
  subCategories: SubCategory[];
}
