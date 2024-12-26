"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";


const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignin() {
    setIsSubmitting(true);
    setError(null); // Clear previous errors

    try {
      const result = await signIn("credentials", {
        redirect: false,
        identifier: "gauravkumar123@gmail.com", // Replace with test email
        password: "gaurav@kumar@123",          // Replace with test password
      });

      if (result?.error) {
        setError(result.error);
        console.error("Sign-in failed:", result.error);
      } else {
        console.log("Sign-in successful:", result);
        // Redirect or handle success as needed
      }
    } catch (err) {
      console.error("Unexpected error during sign-in:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-16">
      
      <button
        className="text-black border rounded-md px-2"
        onClick={handleSignin}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Page;
