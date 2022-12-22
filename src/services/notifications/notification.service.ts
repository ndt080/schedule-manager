import { createToast } from "mosha-vue-toastify";
import type { ToastOptions } from "mosha-vue-toastify";

type ToastType = "info" | "danger" | "warning" | "success" | "default" | undefined;

class NotificationService {
  private static getOptions(type: ToastType, timeout?: number): ToastOptions {
    return {
      type: type,
      showCloseButton: true,
      swipeClose: true,
      timeout: timeout || 3000,
      transition: 'bounce',
      position: 'bottom-right'
    }
  }

  success(title: string, description?: string, timeout?: number) {
    createToast({
      title: title,
      description: description,
    }, NotificationService.getOptions('success', timeout));
  }

  info(title: string, description?: string, timeout?: number) {
    createToast({
      title: title,
      description: description,
    }, NotificationService.getOptions('info', timeout));
  }

  warning(title: string, description?: string, timeout?: number) {
    createToast({
      title: title,
      description: description,
    }, NotificationService.getOptions('warning', timeout));
  }

  error(title: string, description?: string, timeout?: number) {
    createToast({
      title: title,
      description: description,
    }, NotificationService.getOptions('danger',timeout));
  }
}

export default new NotificationService();
