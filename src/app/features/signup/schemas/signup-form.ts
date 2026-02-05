import * as v from "valibot";

const signUpFormSchema = v.object({
  email: v.pipe(v.string(), v.email("Email is required")),
  password: v.pipe(
    v.string(),
    v.minLength(8, "Password must be at least 8 char long"),
  ),
  username: v.pipe(
    v.string(),
    v.minLength(4, "Username must be at least 4 char long"),
  ),
});

type SignUpFormType = v.InferOutput<typeof signUpFormSchema>;

export { signUpFormSchema, type SignUpFormType };
