import { RouterPaths } from "@/core/consts/router-paths";
import type { NavigationGuardNext } from "vue-router";

export const authGuard = (next: NavigationGuardNext, isAuthenticated: boolean) => {
  isAuthenticated ? next() : next(`/${RouterPaths.LOGIN}`);
};
