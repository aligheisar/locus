"use client";

import { startTransition, ViewTransition } from "react";
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

const PasswordForm = () => {
  const router = useRouter();
  const { form, handleFormSubmit } = usePasswordForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create your password</CardTitle>
        <CardDescription>
          Choose a strong password to keep your account secure.
        </CardDescription>
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
            <Field>
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
