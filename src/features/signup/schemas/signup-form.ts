import * as v from "valibot";

const signupFormSchema = v.pipe(
  v.object({
    confirmPassword: v.string(),
    email: v.pipe(v.string(), v.email("Email is required.")),
    password: v.pipe(
      v.string(),
      v.minLength(8, "Password must be at least 8 char long."),
    ),
    username: v.pipe(
      v.string(),
      v.minLength(4, "Username must be at least 4 char long."),
    ),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      (input) => input.password === input.confirmPassword,
      "Passwords are not match.",
    ),
    ["confirmPassword"],
  ),
);

type SignupFormType = v.InferOutput<typeof signupFormSchema>;

export { signupFormSchema, type SignupFormType };
