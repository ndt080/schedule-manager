import api from "@/middlewares/api";
import type { UserRequest } from "@/core/models/api/user-request";
import type { User } from "@/core/models/user";
import type { Tokens } from "@/core/models/tokens";


class ApiAuthService {
  async signIn(user: UserRequest) {
    return await api.post<{ user: User, tokens: Tokens }>("/auth/sign-in", user);
  }

  async confirmEmailAgain(email: string) {
    return await api.post<User>(`/auth/confirm-email-again?email=${email}`);
  }

  async signUp(user: UserRequest) {
    return await api.post<User>("/auth/sign-up", user);
  }

  async refreshToken(token: string) {
    return await api.post<{ tokens: string }>("/auth/refresh-token", {
      refreshToken: token,
    });
  }

  async forgetPassword(email: string) {
    return await api.post(`/auth/forget-password?email=${email})`);
  }
}

export default new ApiAuthService();
