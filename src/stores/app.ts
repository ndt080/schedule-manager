import { defineStore } from "pinia";
import { BeforeInstallPromptEvent } from "@/core/models/BeforeInstallPromptEvent";

interface AppState {
  deferredPrompt?: BeforeInstallPromptEvent;
  visibilityInstallBtn: boolean;
}

export const useAppStore = defineStore({
  id: "app",
  state: (): AppState => ({
    visibilityInstallBtn: false,
  }),
  getters: {
    isShowInstallBtn: (state) => state.visibilityInstallBtn,
    installEvent: state => state.deferredPrompt,
  },
  actions: {
    setVisibilityInstallBtn(value: boolean) {
      this.visibilityInstallBtn = value;
    },
    setDeferredPrompt(value: BeforeInstallPromptEvent | undefined) {
      this.deferredPrompt = value;
    },
  },
});
