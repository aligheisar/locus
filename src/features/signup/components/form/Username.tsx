"use client";

import { startTransition, useEffect, ViewTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
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
import { Input } from "@/components/ui/input";

import { useSignup } from "@/features/signup/hooks/use-signup";
import { useUsernameForm } from "@/features/signup/hooks/use-username-form";
import { StepCounter } from "@/features/signup/components/StepCounter";

const UsernameForm = () => {
  const { formData } = useSignup();
  const router = useRouter();
  const { form, handleFormSubmit } = useUsernameForm();

  useEffect(() => {
    if (!formData.password || !formData.confirmPassword) {
      router.push("/signup/password");
    }
  }, [formData, router]);

  return (
    <Card>
      <CardHeader className="grid-cols-[auto_1fr]">
        <div className="grid auto-rows-auto gap-1">
          <CardTitle>Choose a username</CardTitle>
          <CardDescription>
            Pick a unique username that represents you. This will be visible to
            other users.
          </CardDescription>
        </div>
        <StepCounter current={3} total={3} />
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <FieldGroup>
            <FieldGroup>
              <Controller
                control={form.control}
                name="username"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      autoComplete="username"
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
                    router.replace("/signup/password");
                  });
                }}
                type="button"
                variant="secondary"
              >
                Back
              </Button>
              <ViewTransition name="form-submit-button">
                <Button disabled={form.formState.isSubmitting} type="submit">
                  {form.formState.isSubmitting && (
                    <HugeiconsIcon icon={Loader} />
                  )}
                  Finish
                </Button>
              </ViewTransition>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export { UsernameForm };
