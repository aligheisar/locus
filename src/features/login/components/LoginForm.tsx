"use client";

import { ViewTransition } from "react";
import Link from "next/link";
import { Form, Field as FormField } from "@formisch/react";
import { Loader } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

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
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

import { useLoginForm } from "@/features/login/hooks/use-login-form";

const LoginForm = () => {
  const { form, handleFormSubmit } = useLoginForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>
          Enter your email or username and your password to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form of={form} onSubmit={handleFormSubmit}>
          <FieldGroup>
            <FieldGroup>
              <FormField of={form} path={["emailOrUsername"]}>
                {(field) => (
                  <Field data-invalid={field.errors !== null}>
                    <FieldLabel htmlFor={field.props.name}>
                      Email or username
                    </FieldLabel>
                    <Input
                      {...field.props}
                      aria-invalid={field.errors !== null}
                      id={field.props.name}
                      value={field.input ?? ""}
                    />
                    {field.errors && (
                      <FieldError
                        errors={field.errors.map((message) => ({ message }))}
                      />
                    )}
                  </Field>
                )}
              </FormField>
              <FormField of={form} path={["password"]}>
                {(field) => (
                  <Field aria-invalid={field.errors !== null}>
                    <FieldLabel htmlFor={field.props.name}>Password</FieldLabel>
                    <PasswordInput
                      {...field.props}
                      aria-invalid={field.errors !== null}
                      autoComplete="current-password"
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
            <FieldGroup>
              <ViewTransition name="form-submit-button">
                <Button disabled={form.isSubmitting} type="submit">
                  {form.isSubmitting && <HugeiconsIcon icon={Loader} />}
                  Next
                </Button>
              </ViewTransition>
              <ViewTransition name="form-footer-description">
                <FieldDescription className="text-center">
                  Don't have an account? <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </ViewTransition>
            </FieldGroup>
          </FieldGroup>
        </Form>
      </CardContent>
    </Card>
  );
};

export { LoginForm };
