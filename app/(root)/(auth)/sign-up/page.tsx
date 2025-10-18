"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormFieldCp from "@/components/FormField";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

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
  const [feedback, setFeedback] = useState<string>("");
  const router = useRouter();

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
    setError(null);
    setFeedback("");

    try {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const result = await response.json();

        if (result.success) {
          setFeedback(
            "Account created successfully! Please check your email to verify your account."
          );

          form.reset();

          const queryParams = new URLSearchParams({
            username: result.username,
          }).toString();
          const url = `/verifiyUser?${queryParams}`;
          router.replace(url);
        } else {
          setError(result.message || "Something went wrong. Please try again.");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to sign up. Please try again.");
      }
    } catch (submissionError) {
      setError("Unable to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="mt-16 flex justify-center w-full">
      <div className="mt-4 w-full max-w-xs md:max-w-sm h-full max-h-min bg-white dark:bg-neutral-900 shadow-md rounded-lg p-6 border">
        <h2 className="text-black dark:text-white text-2xl font-bold text-center mb-6">
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
              className="w-full text-white dark:text-neutral-950 font-medium py-2 px-4 rounded-md"
            >
              {form.formState.isSubmitting ? "Submitting..." : "Sign Up"}
            </Button>
          </form>
        </Form>

        <div className=" w-full text-center my-2 flex justify-center items-center">
          <p className=" h-px w-full bg-neutral-200"></p>
          <span className=" mx-2">Or</span>
          <p className=" h-px w-full bg-neutral-200"></p>
        </div>
        <Button
          type="submit"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full text-white dark:text-neutral-950 font-medium py-2 px-4 rounded-md"
        >
          Sign Up with Google
        </Button>
        {/* Feedback/Error Messages */}
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        {feedback && <p className="text-green-500 text-sm mt-4">{feedback}</p>}

        <div className="text-black dark:text-neutral-400 text-sm mt-4 text-center">
          Already have an account?{" "}
          <span
            className="inline font-medium cursor-pointer underline"
            onClick={() => router.replace("/sign-in")}
          >
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
