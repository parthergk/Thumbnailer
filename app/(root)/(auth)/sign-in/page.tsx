"use client";

import { signIn } from "next-auth/react";
import React, { Suspense, useState } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
  email: z.string().nonempty("Email is required"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

const Sign_in: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [feedback, setFeedback] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);

    try {
      const callbackUrl = searchParams?.get("callbackUrl") ?? "/";

      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        setFeedback("Sign Up Successfully");
        form.reset();

        if (callbackUrl) {
          router.replace(result.url || callbackUrl);
        }
      }
    } catch (err) {
      console.error("Unexpected error during sign-in:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <div className="mt-16 flex justify-center w-full">
      <div className="mt-24 md:mt-16 w-full max-w-xs md:max-w-sm h-full max-h-min bg-white dark:bg-neutral-900 shadow-md rounded-lg p-6 border">
        <h2 className="text-black dark:text-white text-2xl font-bold text-center mb-6">
          Sign In
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="text-black dark:text-neutral-300 dark:bg-transparent outline-none mt-1 block w-full rounded-md shadow-sm sm:text-sm"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      className=" text-black dark:text-neutral-300 dark:bg-transparent outline-none mt-1 block w-full rounded-md shadow-sm sm:text-sm"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm mt-1" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full text-white dark:text-neutral-950 font-medium py-2 px-4 rounded-md"
            >
              {form.formState.isSubmitting ? "Submitting..." : "Sign In"}
            </Button>
          </form>
        </Form>

        <div className=" w-full flex">
          <p className=" w-full border-b"></p>or
          <p className=" w-full border-b"></p>
        </div>
        <Button
          type="submit"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full text-white dark:text-neutral-950 font-medium py-2 px-4 rounded-md"
        >
          Login with Google
        </Button>
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        {feedback && <p className="text-green-500 text-sm mt-4">{feedback}</p>}

        <div className="text-black dark:text-neutral-400 text-sm mt-4 text-center">
          Don&apos;t have an account?{" "}
          <span
            className="inline font-medium cursor-pointer underline"
            onClick={() => router.replace("/sign-up")}
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

const Page: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Sign_in />
    </Suspense>
  );
};

export default Page;
