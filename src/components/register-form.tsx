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
import { User, Shield } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["USER", "ADMIN"]),
});

export function RegisterForm(props: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const callbackURL =
      process.env.FRONTEND_URL || "http://localhost:3000";

    await authClient.signIn.social({
      provider: "google",
      callbackURL,
    });
  };

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "USER" as "USER" | "ADMIN",
    },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating account...");

      try {
        const { error } = await authClient.signUp.email({
          name: value.name,
          email: value.email,
          password: value.password,
        });

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        await fetch("/api/users/role", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: value.role }),
        });

        toast.success("Account created successfully 🎉", {
          id: toastId,
        });

        router.push("/");
      } catch {
        toast.error("Something went wrong!", { id: toastId });
      }
    },
  });

  return (
    <div className="relative p-[3px] rounded-2xl bg-gradient-to-r from-red-500 via-green-400 via-blue-500 to-pink-500 animate-rgb">

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl blur-xl opacity-40 bg-gradient-to-r from-red-500 via-green-400 via-blue-500 to-pink-500 animate-rgb"></div>

      <Card
        {...props}
        className="relative rounded-2xl bg-background border"
      >
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

                    <div className="grid grid-cols-2 gap-4">
                      <div
                        onClick={() => field.handleChange("USER")}
                        className={`cursor-pointer p-4 rounded-xl border text-center transition ${
                          field.state.value === "USER"
                            ? "border-blue-500 bg-blue-50"
                            : ""
                        }`}
                      >
                        <User className="mx-auto mb-2 w-6 h-6" />
                        User
                      </div>

                      <div
                        onClick={() => field.handleChange("ADMIN")}
                        className={`cursor-pointer p-4 rounded-xl border text-center transition ${
                          field.state.value === "ADMIN"
                            ? "border-purple-500 bg-purple-50"
                            : ""
                        }`}
                      >
                        <Shield className="mx-auto mb-2 w-6 h-6" />
                        Admin
                      </div>
                    </div>
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

      {/* RGB Animation */}
      <style jsx>{`
        @keyframes rgbAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-rgb {
          background-size: 400% 400%;
          animation: rgbAnimation 6s ease infinite;
        }
      `}</style>
    </div>
  );
}