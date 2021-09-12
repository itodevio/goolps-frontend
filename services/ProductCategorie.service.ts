import { StoredProductCategory } from "interfaces/ProductCategory.interface";
import { ApiClient } from "utils/apiClient";

const ProductCategory = {
  async get() {
    const { data } = await ApiClient.get<StoredProductCategory[]>(`/category`);
    return data;
  },
};

export default ProductCategory;
