import { StorageKeys } from "@/core/consts/storage-keys";
import type { Tokens } from "@/core/models/tokens";

class TokenStorageService {
  static saveTokens(tokens: Tokens): void {
    localStorage.setItem(StorageKeys.TOKENS, JSON.stringify(tokens));
  }

  static getTokens(): Tokens | undefined {
    const dataString = localStorage.getItem(StorageKeys.TOKENS);
    return JSON.parse(dataString || "{}");
  }

  static removeTokens(): void {
    localStorage.removeItem(StorageKeys.TOKENS);
  }
}

export default TokenStorageService;
