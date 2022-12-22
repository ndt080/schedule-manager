import { defineStore } from "pinia";
import { UserStorageService } from "@/services/storage/user-storage.service";
import type { User } from "@/core/models/user";
import ApiAuthService from "@/services/api/api-auth.service";
import type { UserRequest } from "@/core/models/api/user-request";
import TokenStorageService from "@/services/storage/token-storage.service";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: UserStorageService.getUser(),
  }),
  getters: {
    currentUser: (state) => state.user as User,
  },
  actions: {
    async signIn(email: string, password: string): Promise<User> {
      const request: UserRequest = { email: email, password: password };

      return ApiAuthService.signIn(request).then((response) => {
        const { user, tokens } = response.data;

        TokenStorageService.saveTokens(tokens);
        UserStorageService.saveUser(user);
        this.user = user;

        return user;
      });
    },
    async signUp(email: string, password: string, username: string): Promise<User> {
      const request: UserRequest = { email: email, password: password, username: username };

      return ApiAuthService.signUp(request).then((response) => {
        this.user = response.data;
        return response.data;
      });
    },
    async confirmEmailAgain(email: string): Promise<User> {
      return ApiAuthService.confirmEmailAgain(email).then((response) => {
        this.user = response.data;
        return response.data;
      });
    },
    logout() {
      this.user = null;
      UserStorageService.removeUser();
      TokenStorageService.removeTokens();
    },
  },
});
