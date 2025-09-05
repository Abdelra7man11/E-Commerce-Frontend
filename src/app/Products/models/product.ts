import { Category } from './category';

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  image: string;
}
