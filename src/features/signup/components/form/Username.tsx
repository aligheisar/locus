"use client";

import { startTransition, useEffect, ViewTransition } from "react";
import { useRouter } from "next/navigation";
import { Form, Field as FormField } from "@formisch/react";
import { Loader, LoaderCircle } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Card, CardTitle } from "@/components/ResponsiveCard";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

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
        <Form of={form} onSubmit={handleFormSubmit}>
          <FieldGroup>
            <FieldGroup>
              <FormField of={form} path={["username"]}>
                {(field) => (
                  <Field data-invalid={field.errors !== null}>
                    <FieldLabel htmlFor={field.props.name}>Username</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field.props}
                        aria-invalid={field.errors !== null}
                        autoComplete="username"
                        id={field.props.name}
                      />
                      {form.isValidating && (
                        <InputGroupAddon align="inline-end">
                          <HugeiconsIcon
                            className="animate-spin"
                            icon={LoaderCircle}
                          />
                        </InputGroupAddon>
                      )}
                    </InputGroup>
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
                    router.replace("/signup/password");
                  });
                }}
                type="button"
                variant="secondary"
              >
                Back
              </Button>
              <ViewTransition name="form-submit-button">
                <Button disabled={form.isSubmitting} type="submit">
                  {form.isSubmitting && <HugeiconsIcon icon={Loader} />}
                  Finish
                </Button>
              </ViewTransition>
            </Field>
          </FieldGroup>
        </Form>
      </CardContent>
    </Card>
  );
};

export { UsernameForm };
