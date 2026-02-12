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
import { Input } from "@/components/ui/input";

import { useEmailForm } from "@/features/signup/hooks/use-email-form";

const EmailForm = () => {
  const { form, handleFormSubmit } = useEmailForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Start creating your account for free.</CardDescription>
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

export { EmailForm };
