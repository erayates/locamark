"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import React from "react";

type CustomInputProps = {
  name: string;
  placeholder?: string;
  type?: string;
  label: string;
};

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  placeholder,
  type,
  label,
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full relative">
          <FormLabel className="absolute left-4 top-2 after:border-b after:w-full after:absolute after:-left-4 after:pb-1 after:top-4 w-full text-muted-foreground">
            {label}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              className="text-muted-foreground text-xs rounded-lg pl-4 pt-10 pb-4 h-auto"
              placeholder={placeholder}
              type={type ? type : "text"}
            />
          </FormControl>
          <FormMessage className="text-xs font-semibold" />
        </FormItem>
      )}
    />
  );
};

export default CustomInput;
