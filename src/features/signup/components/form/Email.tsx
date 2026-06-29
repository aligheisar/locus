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

import { useEmailForm } from "@/features/signup/hooks/use-email-form";
import { StepCounter } from "@/features/signup/components/StepCounter";

const EmailForm = () => {
  const { form, handleFormSubmit } = useEmailForm();

  return (
    <Card>
      <CardHeader className="grid-cols-[auto_1fr]">
        <div className="grid auto-rows-auto gap-1">
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Start creating your account for free.
          </CardDescription>
        </div>
        <StepCounter current={1} total={3} />
      </CardHeader>
      <CardContent>
        <Form of={form} onSubmit={handleFormSubmit}>
          <FieldGroup>
            <FormField of={form} path={["email"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel htmlFor={field.props.name}>Email</FieldLabel>
                  <Input
                    {...field.props}
                    aria-invalid={field.errors !== null}
                    autoComplete="email"
                    id={field.props.name}
                    placeholder="example@gmail.com"
                  />
                  {field.errors && (
                    <FieldError
                      errors={field.errors.map((message) => ({ message }))}
                    />
                  )}
                </Field>
              )}
            </FormField>
            <FieldGroup>
              <ViewTransition name="form-submit-button">
                <Button disabled={form.isSubmitting} type="submit">
                  {form.isSubmitting && <HugeiconsIcon icon={Loader} />}
                  Next
                </Button>
              </ViewTransition>
              <ViewTransition name="form-footer-description">
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </ViewTransition>
            </FieldGroup>
          </FieldGroup>
        </Form>
      </CardContent>
    </Card>
  );
};

export { EmailForm };
