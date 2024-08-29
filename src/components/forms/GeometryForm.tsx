import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "../ui/input";
import Button from "../ui/button";
import { IGeometry } from "../../types";
import { useModalContext } from "../../hooks/useModalContext";
import { _update, _create } from "../../actions";

const schema = z.object({
  wkt: z
    .string({
      required_error: "WKT is required field..",
    })
    .min(1, "WKT is required field."),
  name: z
    .string({ required_error: "Name is required field.  " })
    .min(1, "Name is required field."),
});

interface GeometryFormProps {
  data?: IGeometry;
}

const GeometryForm: React.FC<GeometryFormProps> = () => {
  const { currentModal, closeModal, featureData } = useModalContext();

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: featureData || {},
  });

  const onSubmit = async (formData: IGeometry) => {
    if (currentModal === "update") {
      const response = await _update(featureData?.id as number, formData);
      if (response.success) {
        closeModal();
      }
      return;
    }

    const response = await _create(formData);
    if (response.success) {
      closeModal();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input name="wkt" label="WKT*" />
        <Input name="name" label="Name*" />
        <Button type="submit" color="success" size="md" rounded="md">
          {methods.formState.isLoading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default GeometryForm;
