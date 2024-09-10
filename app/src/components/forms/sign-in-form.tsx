"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "../form-elements/custom-input";
import { RotateCcw } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const FormSchema = z.object({
  userName: z
    .string({
      required_error: "Username is required.",
    })
    .min(3, {
      message: "Username must be at least 3 characters.",
    }),

  password: z
    .string({
      required_error: "Password is required.",
    })
    .min(8, {
      message: "Password must be at least 8 characters.",
    }),
});

export default function SignInForm() {
  const { loginUser } = useAuth();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    loginUser(data.userName, data.password);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CustomInput name="userName" label="Username" />
        <CustomInput name="password" label="Password" type="password" />

        {form.formState.isSubmitting ? (
          <Button className="w-full" disabled>
            <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
}
