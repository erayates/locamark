import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useModalContext } from "@/hooks/useModalContext";
import CustomInput from "@/components/form-elements/custom-input";
import { useToast } from "@/components/ui/use-toast";
import { _updateUser } from "@/pages/dashboard/users/actions";

const FormSchema = z.object({
  userName: z
    .string({
      required_error: "Name is required.",
    })
    .min(1, {
      message: "Name is required.",
    }),

  email: z
    .string({
      required_error: "Email is required.",
    })
    .email({
      message: "Please enter a valid email address.",
    }),
});

export function UpdateUserForm() {
  const { modals, closeModal } = useModalContext();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues:
      (modals.update.data as
        | { userName?: string; email?: string }
        | undefined) ?? {},
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { email, userName } = data;
      const updateData = { email, userName };

      const response = await _updateUser(
        modals.update.data?.id?.toString() ?? "",
        updateData
      );

      if (response.success) {
        closeModal("update");
        toast({
          title: "Success!",
          description: "User updated successfully.",
          variant: "success",
        });

        return;
      }

      toast({
        title: "Error!",
        description: "Something went wrong! Please try again.",
        variant: "destructive",
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: "Something went wrong! Please try again.",
        variant: "destructive",
        onError: () => console.log("Error updating geo.:", error),
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CustomInput name="userName" label="Username" placeholder="" />
        <CustomInput name="email" label="Email" placeholder="" />
        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
