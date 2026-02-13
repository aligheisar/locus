import { type ExternalToast, toast } from "sonner";

import { toastMessages } from "@/config/toasts";
import type { ToastCode, ToastType } from "@/types/toast";

export function showToast<T extends ToastType>(
  type: T,
  code: ToastCode<T>,
  data?: ExternalToast,
) {
  const message = toastMessages[type][code];
  if (!message) throw new Error("Toast message not exist.");

  return toast[type](message as string, data);
}
