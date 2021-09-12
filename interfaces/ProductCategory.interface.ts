export interface ProductCategory {
  displayName: string;
  normalizedName: string;
}

export interface StoredProductCategory extends ProductCategory {
  _id: string;
}
