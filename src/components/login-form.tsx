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
  password: z.string().min(8, "Minimum length is 8"),
  email: z.string().email("Invalid email address"),
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const callbackURL = `${
      process.env.FRONTEND_URL || "http://localhost:3000"
    }/tutors`;

    await authClient.signIn.social({
      provider: "google",
      callbackURL,
    });
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in...");
      try {
        const { error } = await authClient.signIn.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("User Logged in Successfully", { id: toastId });
        router.push("/dashboard");
      } catch {
        toast.error("Something went wrong, please try again.", {
          id: toastId,
        });
      }
    },
  });

  return (
    <div className="relative p-[3px] rounded-2xl bg-gradient-to-r from-red-500 via-green-400 via-blue-500 to-pink-500 animate-rgb">
      
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl blur-xl opacity-40 bg-gradient-to-r from-red-500 via-green-400 via-blue-500 to-pink-500 animate-rgb"></div>

      <Card
        {...props}
        className="relative rounded-2xl bg-background border"
      >
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your information below Login
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              {/* Email */}
              <form.Field name="email">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>Email</FieldLabel>
                      <Input
                        type="email"
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(e.target.value)
                        }
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* Password */}
              <form.Field name="password">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>Password</FieldLabel>
                      <Input
                        type="password"
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(e.target.value)
                        }
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-5 justify-end">
          <Button
            className="w-full"
            form="login-form"
            type="submit"
          >
            Login
          </Button>

          <Button
            className="w-full"
            onClick={handleGoogleLogin}
            variant="outline"
            type="button"
          >
            Continue with Google
          </Button>
        </CardFooter>
      </Card>

      {/* RGB Animation */}
      <style jsx>{`
        @keyframes rgbAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-rgb {
          background-size: 400% 400%;
          animation: rgbAnimation 6s ease infinite;
        }
      `}</style>
    </div>
  );
}