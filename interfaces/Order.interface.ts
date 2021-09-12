import { Product, StoredProduct } from "./Product.interface";

type PaymentType = "CASH" | "DEBIT" | "CREDIT" | "MEAL_VOUCHER" | "PIX" | "FOOD_VOUCHER";

type CardBrand =
  | "VISA"
  | "MASTERCARD"
  | "ALELO"
  | "SODEXO"
  | "DINNERS"
  | "ELO"
  | "AMERICAN_EXPRESS"
  | "HIPERCARD"
  | "VR";

export interface Order {
  products: StoredProduct[];
  note?: string;
  tableNumber: number;
  paymentType: PaymentType;
  cardBrand?: CardBrand;
  totalPrice: number;
  changeFor?: number;
}

export interface StoredOrder extends Order {
  _id: string;
}

export interface StoreOrderParam extends Omit<Order, "products"> {
  products: string[];
}

export interface UpdateOrderParam extends Omit<Order, "products"> {
  _id: string;
  products: string[];
}
