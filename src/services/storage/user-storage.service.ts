import { StorageKeys } from "@/core/consts/storage-keys";
import type { User } from "@//core/models/user";

export class UserStorageService {
  static saveUser(user: User): void {
    localStorage.setItem(StorageKeys.USER, JSON.stringify(user));
  }

  static getUser(): User | null {
    const dataString = localStorage.getItem(StorageKeys.USER);
    return dataString ? JSON.parse(dataString) : null;
  }

  static removeUser(): void {
    localStorage.removeItem(StorageKeys.USER);
  }
}
