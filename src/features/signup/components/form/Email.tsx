"use client";

import { ViewTransition } from "react";
import Link from "next/link";
import { Loader } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
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
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <FieldGroup>
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="email"
                    id={field.name}
                    placeholder="example@gmail.com"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <FieldGroup>
              <ViewTransition name="form-submit-button">
                <Button disabled={form.formState.isSubmitting} type="submit">
                  {form.formState.isSubmitting && (
                    <HugeiconsIcon icon={Loader} />
                  )}
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
        </form>
      </CardContent>
    </Card>
  );
};

export { EmailForm };
