"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormFieldCp from "@/components/FormField";

// Define validation schema using Zod
const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  username: z.string().nonempty("Username is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Page: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const fieldNames: (keyof z.infer<typeof formSchema>)[] = [
    "name",
    "username",
    "email",
    "password",
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Form Values:", values);
      // Perform form submission logic
    } catch (submissionError) {
      setError("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div className="mt-16 flex justify-center w-full">
      <div className="mt-4 w-full max-w-xs md:max-w-sm h-full max-h-min bg-white shadow-md rounded-lg p-6 border">
        <h2 className="text-black text-2xl font-bold text-center mb-6">
          Sign Up
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {fieldNames.map((name) => (
              <FormFieldCp key={name} name={name} form={form} />
            ))}

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full text-white font-medium py-2 px-4 rounded-md"
            >
              {form.formState.isSubmitting ? "Submitting..." : "Sign Up"}
            </Button>
          </form>
        </Form>
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        <div className="text-black text-sm mt-4 text-center">
          Already have an account?{" "}
          <span className="inline font-medium cursor-pointer underline">
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
