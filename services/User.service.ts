import { StoredUser, User } from "interfaces/User.interface";
import { ApiClient } from "utils/apiClient";

const UserService = {
  async get() {
    const { data } = await ApiClient.get<StoredUser[]>(`/auth`);
    return data;
  },
  async store(user: User) {
    const { data } = await ApiClient.post<StoredUser>(`/auth`, user);
    return data;
  },
  async update(user: StoredUser) {
    const { data } = await ApiClient.put<StoredUser>(`/auth/${user._id}/update`, user);
    return data;
  },
  async delete(userId: string) {
    const { data } = await ApiClient.delete(`/auth/${userId}/remove`);
    return data;
  },
};

export default UserService;
