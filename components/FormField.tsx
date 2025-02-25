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
        <FormLabel className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </FormLabel>
        <FormControl>
          <Input
            {...field}
            name={name}
            className=" text-black dark:text-neutral-300 dark:bg-transparent outline-none mt-1 block w-full rounded-md shadow-sm sm:text-sm"
          />
        </FormControl>
        <FormMessage className="text-red-500 text-sm mt-1" />
      </FormItem>
    )}
  />
);

export default FormFieldCp;
