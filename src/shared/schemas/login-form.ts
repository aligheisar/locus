import * as v from "valibot";

const loginFormSchema = v.object({
  emailOrUsername: v.pipe(
    v.string(),
    v.minLength(1, "This field is required."),
  ),
  password: v.pipe(
    v.string(),
    v.minLength(8, "Password must be at least 8 char long."),
  ),
});

type LoginFormType = v.InferOutput<typeof loginFormSchema>;

export { type LoginFormType, loginFormSchema };
