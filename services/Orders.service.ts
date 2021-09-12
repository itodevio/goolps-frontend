import { Order, StoredOrder, StoreOrderParam, UpdateOrderParam } from "interfaces/Order.interface";
import { ApiClient } from "utils/apiClient";

const OrderService = {
  async get() {
    const { data } = await ApiClient.get<StoredOrder[]>(`/orders`);
    return data;
  },
  async store(order: StoreOrderParam) {
    const { data } = await ApiClient.post<StoredOrder>(`/orders`, order);
    return data;
  },
  async update(order: UpdateOrderParam) {
    const { data } = await ApiClient.put<StoredOrder>(`/orders/${order._id}/update`, order);
    return data;
  },
  async delete(orderId: string) {
    const { data } = await ApiClient.delete(`/orders/${orderId}/remove`);
    return data;
  },
};

export default OrderService;
