import { Product, StoredProduct } from "interfaces/Product.interface";
import { ApiClient } from "utils/apiClient";

interface UpdateProps extends Product {
  _id: string
}

const ProductService = {
  async get() {
    const { data } = await ApiClient.get<StoredProduct[]>(`/products`);
    return data;
  },
  async store(product: Product) {
    const { data } = await ApiClient.post<StoredProduct>(`/products`, product);
    return data;
  },
  async update(product: UpdateProps) {
    const { data } = await ApiClient.put<StoredProduct>(`/products/${product._id}/update`, product);
    return data;
  },
  async delete(productId: string) {
    const { data } = await ApiClient.delete(`/products/${productId}/remove`);
    return data;
  },
};

export default ProductService;
