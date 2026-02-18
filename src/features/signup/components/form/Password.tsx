"use client";

import { startTransition, useEffect, ViewTransition } from "react";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";

import { Card, CardTitle } from "@/components/ResponsiveCard";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";

import { usePasswordForm } from "@/features/signup/hooks/use-password-form";
import { useSignup } from "@/features/signup/hooks/use-signup";
import { StepCounter } from "@/features/signup/components/StepCounter";

const PasswordForm = () => {
  const router = useRouter();
  const { formData } = useSignup();
  const { form, handleFormSubmit } = usePasswordForm();

  useEffect(() => {
    if (!formData.email) {
      router.push("/signup");
    }
  }, [formData, router]);

  return (
    <Card>
      <CardHeader className="grid-cols-[auto_1fr]">
        <div className="grid auto-rows-auto gap-1">
          <CardTitle>Create your password</CardTitle>
          <CardDescription>
            Choose a strong password to keep your account secure.
          </CardDescription>
        </div>
        <StepCounter current={2} total={3} />
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <FieldGroup>
            <FieldGroup>
              <Controller
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <PasswordInput
                      {...field}
                      aria-invalid={fieldState.invalid}
                      autoComplete="new-password"
                      id={field.name}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="confirmPassword"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Confirm Password
                    </FieldLabel>
                    <PasswordInput
                      {...field}
                      aria-invalid={fieldState.invalid}
                      autoComplete="new-password"
                      id={field.name}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Field className="sm:flex-row sm:*:flex-1">
              <Button
                onClick={() => {
                  startTransition(() => {
                    router.replace("/signup");
                  });
                }}
                type="button"
                variant="secondary"
              >
                Back
              </Button>
              <ViewTransition name="form-submit-button">
                <Button type="submit">Next</Button>
              </ViewTransition>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export { PasswordForm };
