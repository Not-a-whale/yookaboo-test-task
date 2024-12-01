import {Tag} from "./tag";

export type Product = {
  id: string;
  name: string;
  description: string;
  year: number;
  price: number;
  pictureUrls: string[];
  genre: string;
  author: string;
  quantityInStock: number;
  tags: Tag[];
};
