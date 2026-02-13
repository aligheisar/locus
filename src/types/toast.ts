import type { toastMessages } from "@/config/toasts";

type ToastType = keyof typeof toastMessages;
type ToastCode<T extends ToastType> = keyof (typeof toastMessages)[T];

export type { ToastCode, ToastType };
