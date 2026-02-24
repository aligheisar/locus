import type { ToastCode, ToastType } from "@/types/toast";

const toastMessages = {
  error: {
    invalidCredentials: "Invalid credentials.",
    invalidInput: "Inputs are invalid.",
    somethingWentWrong: "Something went wrong.",
    userNotExist: "User not exist. Please login.",
    usernameTaken: "This username is taken.",
    youAlreadyRegistered: "You already registered.",
  },
  info: {},
  success: {},
  warning: {},
} as const;

const TOAST_CODES = Object.fromEntries(
  Object.entries(toastMessages).map(([type, messages]) => [
    type,
    Object.keys(messages).reduce(
      (acc, code) => {
        acc[code] = code;
        return acc;
      },
      {} as Record<string, string>,
    ),
  ]),
) as {
  [T in ToastType]: Record<ToastCode<T>, ToastCode<T>>;
};

export { toastMessages, TOAST_CODES };
