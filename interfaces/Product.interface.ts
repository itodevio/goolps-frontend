import { StoredIngredient, QuantityIngredient } from "./Ingredient";
import { ProductCategory } from "./ProductCategory.interface";

export interface ProductSchema {
  name: string;
  price: number;
  ingredients: StoredIngredient[];
  category: ProductCategory;
  description: string;
}

export interface Product {
  name: string;
  price: number;
  ingredients: QuantityIngredient[];
  category: string;
  description: string;
}

export interface StoredProduct extends Omit<Product, "ingredients" | "category"> {
  _id: string;
  ingredients: StoredIngredient[];
  category: ProductCategory;
}
