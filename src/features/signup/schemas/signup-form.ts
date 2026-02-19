import * as v from "valibot";

const signupFormSchema = v.object({
  confirmPassword: v.string(),
  email: v.pipe(v.string(), v.email("Email is required.")),
  password: v.pipe(
    v.string(),
    v.minLength(8, "Password must be at least 8 char long."),
    v.maxLength(64, "Password can't be longer than 64 char."),
    v.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
      "Include uppercase, lowercase, a number, and a special character.",
    ),
  ),
  username: v.pipe(
    v.string(),
    v.minLength(4, "Username must be at least 4 char long."),
  ),
});

const getUsernameFormSchema = (checker: (input: string) => Promise<boolean>) =>
  v.objectAsync({
    username: v.pipeAsync(
      v.string(),
      v.minLength(4, "Username must be at least 4 char long."),
      v.checkAsync(checker, "Username is taken."),
    ),
  });

type SignupFormType = v.InferOutput<typeof signupFormSchema>;
type UsernameFormType = v.InferOutput<ReturnType<typeof getUsernameFormSchema>>;

export {
  signupFormSchema,
  getUsernameFormSchema,
  type SignupFormType,
  type UsernameFormType,
};
