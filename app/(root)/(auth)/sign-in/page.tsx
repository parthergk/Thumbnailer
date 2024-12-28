"use client";

import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// Define form validation schema using Zod
const formSchema = z.object({
  identifier: z.string().nonempty("Username or Email is required"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

const Page: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [feedback, setFeedback] = useState('');

  // React Hook Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // Form submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null); // Clear previous errors

    try {
      // Capture the current URL or a fallback URL
      // const callbackUrl = new URLSearchParams(window.location.search).get(
      //   "callbackUrl"
      // ) || "/";

      const result = await signIn("credentials", {
        redirect: false,
        identifier: values.identifier, // Use form field value
        password: values.password,     // Use form field value
        // callbackUrl,                  // Redirect to where the user came from
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {        
        setFeedback("Sign Up Successfully");
        form.reset(); // Reset the form upon success
        // Redirect to the callback URL
        // window.location.href = result.url;
      }
    } catch (err) {
      console.error("Unexpected error during sign-in:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <div className="mt-16 flex justify-center w-full">
      <div className="mt-24 md:mt-16 w-full max-w-xs md:max-w-sm h-full max-h-min bg-white shadow-md rounded-lg p-6 border">
        <h2 className="text-black text-2xl font-bold text-center mb-6">Sign In</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Username/Email Field */}
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    Username or Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="text-black outline-none mt-1 block w-full rounded-md shadow-sm sm:text-sm"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm mt-1" />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      className=" text-black outline-none mt-1 block w-full rounded-md shadow-sm sm:text-sm"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm mt-1" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full text-white font-medium py-2 px-4 rounded-md"
            >
              {form.formState.isSubmitting ? "Submitting..." : "Sign In"}
            </Button>
          </form>
        </Form>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        {feedback && <p className="text-green-500 text-sm mt-4">{feedback}</p>}

        {/* Sign Up Redirect */}
        <div className="text-black text-sm mt-4 text-center">
          Don&apos;t have an account?{" "}
          <span className="inline font-medium cursor-pointer underline" onClick={()=> router.push('/sign-up')}>
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
