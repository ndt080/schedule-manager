import api from "@/middlewares/api";
import type { UserRequest } from "@/core/models/api/user-request";
import type { User } from "@/core/models/user";
import type { Tokens } from "@/core/models/tokens";

class ApiUserService {
  async getCurrentUser() {
    return await api.get<User>("/user/me");
  }
  async getUsersByIDs(ids: number[]) {
    const query = JSON.stringify(ids);
    return await api.get<{ users: User[] }>( `/users?ids=${query}`);
  }
}

export default new ApiUserService();
