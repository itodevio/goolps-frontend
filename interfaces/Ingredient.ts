import { Unit } from "./unit.interface";

export interface Ingredient {
  name: string;
  qtt: number;
  unit: Unit | string;
  lotNumber: number;
  description: string;
}

export interface QuantityIngredient {
  _id: string;
  quantity: number;
}

export interface StoredIngredient extends Ingredient {
  _id: string;
}
