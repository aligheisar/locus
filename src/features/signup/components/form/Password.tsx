"use client";

import { startTransition, useEffect, ViewTransition } from "react";
import { useRouter } from "next/navigation";
import { Form, Field as FormField } from "@formisch/react";

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
        <Form of={form} onSubmit={handleFormSubmit}>
          <FieldGroup>
            <FieldGroup>
              <FormField of={form} path={["password"]}>
                {(field) => (
                  <Field data-invalid={field.errors !== null}>
                    <FieldLabel htmlFor={field.props.name}>Password</FieldLabel>
                    <PasswordInput
                      {...field.props}
                      aria-invalid={field.errors !== null}
                      autoComplete="new-password"
                      id={field.props.name}
                    />
                    {field.errors && (
                      <FieldError
                        errors={field.errors.map((message) => ({ message }))}
                      />
                    )}
                  </Field>
                )}
              </FormField>
              <FormField of={form} path={["confirmPassword"]}>
                {(field) => (
                  <Field data-invalid={field.errors !== null}>
                    <FieldLabel htmlFor={field.props.name}>
                      Confirm Password
                    </FieldLabel>
                    <PasswordInput
                      {...field.props}
                      aria-invalid={field.errors !== null}
                      autoComplete="new-password"
                      id={field.props.name}
                    />
                    {field.errors && (
                      <FieldError
                        errors={field.errors.map((message) => ({ message }))}
                      />
                    )}
                  </Field>
                )}
              </FormField>
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
        </Form>
      </CardContent>
    </Card>
  );
};

export { PasswordForm };
