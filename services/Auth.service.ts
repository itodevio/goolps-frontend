import { User } from "interfaces/User.interface";
import { ApiClient } from "utils/apiClient";

const AuthService = {
  async login({ email, password, token }: { email: string; password: string; token: string }) {
    const { data } = await ApiClient.post<User>("/auth/login", { email, password, token });
    return data;
  },

  async logout() {},
};

export default AuthService;
