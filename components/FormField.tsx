import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface MyComponentProps {
  name: "name" | "password" | "email" | "username";
  form: UseFormReturn<{
    password: string;
    name: string;
    email: string;
    username: string;
  }>;
}

const FormFieldCp: React.FC<MyComponentProps> = ({ name, form }) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="block text-sm font-medium text-gray-700">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </FormLabel>
        <FormControl>
          <Input
            {...field}
            name={name}
            className=" text-black outline-none mt-1 block w-full rounded-md shadow-sm sm:text-sm"
          />
        </FormControl>
        <FormMessage className="text-red-500 text-sm mt-1" />
      </FormItem>
    )}
  />
);

export default FormFieldCp;
