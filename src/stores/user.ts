import { defineStore } from "pinia";
import { UserStorageService } from "@/services/storage/user-storage.service";
import type { User } from "@/core/models/user";
import ApiUserService from "@/services/api/api-user.service";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: UserStorageService.getUser(),
    users: [] as User[]
  }),
  getters: {
    currentUser: (state) => state.user as User,
    usersData: (state) => state.users as User[],
  },
  actions: {
    async getCurrentUser(): Promise<User> {
      return ApiUserService.getCurrentUser().then((response) => {
        const user = response.data;

        UserStorageService.saveUser(user);
        this.user = user;

        return user;
      });
    },
    async getUsersData(ids: number[]): Promise<User[]> {
      return ApiUserService.getUsersByIDs(ids).then((response) => {
        const { users } = response.data;
        this.users = users;
        return users;
      });
    },
    clear() {
      this.user = null;
      this.users = [];
    }
  },
});
