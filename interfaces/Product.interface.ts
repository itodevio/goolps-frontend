import { Ingredient } from "./Ingredient";
import { ProductCategory } from "./ProductCategory.interface";

export interface ProductSchema {
  name: string;
  price: number;
  ingredients: Ingredient[];
  category: ProductCategory;
  description: string;
}

export interface Product {
  name: string;
  price: number;
  ingredients: string[];
  category: string;
  description: string;
}

export interface StoredProduct extends Omit<Product, "ingredients" | "category"> {
  _id: string;
  ingredients: Ingredient[];
  category: ProductCategory;
}
