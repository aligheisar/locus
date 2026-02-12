"use client";

import Link from "next/link";
import { Controller } from "react-hook-form";

import { Card, CardTitle } from "@/components/ResponsiveCard";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";

import { usePasswordForm } from "@/features/signup/hooks/use-password-form";

const PasswordForm = () => {
  const { form, handleFormSubmit } = usePasswordForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Start creating your account for free.</CardDescription>
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
            <FieldGroup>
              <Button type="submit">Submit</Button>
              <FieldDescription className="text-center">
                Already have an account? <Link href="/">Sign in</Link>
              </FieldDescription>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export { PasswordForm };
