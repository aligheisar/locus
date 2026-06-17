import type { ToastCode, ToastType } from "@/types/toast";

const toastMessages = {
  info: {},
  success: {},
  warning: {},
  error: {
    invalidCredentials: "Invalid credentials.",
    invalidInput: "Inputs are invalid.",
    somethingWentWrong: "Something went wrong.",
    userNotExist: "User not exist. Please signup.",
    usernameTaken: "This username is taken.",
    youAlreadyRegistered: "You already registered.",
  },
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

export { TOAST_CODES, toastMessages };
