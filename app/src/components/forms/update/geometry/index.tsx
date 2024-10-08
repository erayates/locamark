import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "../../../form-elements/custom-input";
import { useModalContext } from "@/hooks/useModalContext";
import { useToast } from "../../../ui/use-toast";
import { _update } from "@/actions";
import { useMapContext } from "@/hooks/useMapContext";
import { _updateGeometry } from "@/pages/dashboard/geometries/actions";
import { IGeometry } from "@/types";
import { useNavigate } from "react-router-dom";

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

type FormValues = z.infer<typeof FormSchema>;

export function UpdateForm() {
  const { modals, closeModal } = useModalContext();
  const { fetchGeometries, setMapPopup, state } = useMapContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: (modals.update.data as IGeometry) ?? {},
  });

  async function onSubmit(data: FormValues) {
    try {
      const { wkt, name } = data;
      const updateData = { wkt, name };

      const response = modals.update.isAdmin
        ? await _updateGeometry(
            (modals.update.data as IGeometry)?.id ?? 0,
            updateData
          )
        : await _update((modals.update.data as IGeometry)?.id ?? 0, updateData);

      if (response.success) {
        toast({
          title: "Success!",
          description: "Geometry updated successfully.",
          variant: "success",
        });

        if (modals.update.isAdmin) {
          navigate("/dashboard/geometries", { replace: true });
          closeModal("update");
          return;
        }
        
        closeModal("update");
        setMapPopup(null);
        state.overlay?.setPosition(undefined);
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
      });
      console.log("Error updating geo.:", error);
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
