import { ICategory } from './category';

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: ICategory;
  image: string;
}
