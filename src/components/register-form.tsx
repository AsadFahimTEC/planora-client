"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["STUDENT", "TUTOR"]),
});

export function RegisterForm(props: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const callbackURL = `${process.env.FRONTEND_URL || "http://localhost:3000"}`;

    await authClient.signIn.social({
      provider: "google",
      callbackURL
    });
  };

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "STUDENT" as "STUDENT" | "TUTOR",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating account...");

      try {
        // ✅ 1. Create auth account (NO role here)
        const { error, data } = await authClient.signUp.email({
          name: value.name,
          email: value.email,
          password: value.password,
        });

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        // ✅ 2. Save role in your backend
        await fetch("/api/users/role", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role: value.role,
          }),
        });

        toast.success("Account created successfully 🎉", { id: toastId });
        router.push("/");
      } catch {
        toast.error("Something went wrong!", { id: toastId });
      }
    },
  });

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Choose your role and enter your details to get started
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="register-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <FieldGroup>
            {/* Name */}
            <form.Field name="name">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid;
                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel>Name</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                    />
                    {invalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Email */}
            <form.Field name="email">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid;
                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      type="email"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                    />
                    {invalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Password */}
            <form.Field name="password">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid;
                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel>Password</FieldLabel>
                    <Input
                      type="password"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                    />
                    {invalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Role */}
            <form.Field name="role">
              {(field) => (
                <Field>
                  <FieldLabel>Select Role</FieldLabel>
                  <select
                    className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(
                        e.target.value as "STUDENT" | "TUTOR"
                      )
                    }
                  >
                    <option value="STUDENT">🎓 Student</option>
                    <option value="TUTOR">👨‍🏫 Tutor</option>
                  </select>
                </Field>
              )}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button className="w-full" form="register-form" type="submit">
          Register
        </Button>

        <Button
          className="w-full"
          variant="outline"
          onClick={handleGoogleLogin}
          type="button"
        >
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  );
}