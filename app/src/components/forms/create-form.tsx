"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "../form-elements/custom-input";
import { useModalContext } from "@/hooks/useModalContext";
import { _create } from "@/actions";
import { RotateCcw } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { useMapContext } from "@/hooks/useMapContext";

const FormSchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
    })
    .min(1, {
      message: "Name is required.",
    }),

  wkt: z.string({ required_error: "WKT is required." }).min(1, {
    message: "WKT is required.",
  }),
});

export function CreateForm() {
  const { modals, closeModal } = useModalContext();
  const { fetchGeometries } = useMapContext();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: modals.create.data ?? {},
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await _create(data);
      if (response.success) {
        closeModal("create");
        toast({
          title: "Success!",
          description: "Geometry created successfully.",
          variant: "success",
        });

        fetchGeometries();
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
        onError: () => console.log("Error creating geo.:", error),
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CustomInput name="name" label="Name" placeholder="E.g. Istanbul" />
        <CustomInput
          name="wkt"
          label="WKT"
          placeholder="E.g. POINT((38.547478 40.68568))"
        />

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
