"use client";

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
    code: z.string().nonempty("Verification code is required").min(4, "Verification code must be at least 4 digits"),
  });
  

const Sign_in: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams?.get('username');
  const [feedback, setFeedback] = useState('');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    setFeedback('');
    
    try {
      const result = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: values.code, username }), // Send code as object
      });
  
      if (result.ok) {
        setFeedback("Verification Successful");
        form.reset();
        // Uncomment to redirect after success
        // const response = await result.json();
        // window.location.href = response.url || '/';
      } else {
        const errorData = await result.json();
        setError(errorData.message || "Verification failed. Please try again.");
      }
    } catch (err) {
      console.error("Unexpected error during verification:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  }
  

  return (
    <div className="mt-16 flex justify-center w-full">
      <div className="mt-24 md:mt-16 w-full max-w-xs md:max-w-sm h-full max-h-min bg-white shadow-md rounded-lg p-6 border">
        <h2 className="text-black text-2xl font-bold text-center mb-6">Email Verification</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    Verification Code
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

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full text-white font-medium py-2 px-4 rounded-md"
            >
              {form.formState.isSubmitting ? "Verifiying..." : "Verifiy"}
            </Button>
          </form>
        </Form>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        {feedback && <p className="text-green-500 text-sm mt-4">{feedback}</p>}
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

export default Page
