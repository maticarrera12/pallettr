"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage("Successfully joined the waitlist!");
        setEmail("");
      } else {
        setIsSuccess(false);
        setMessage(data.error || "Failed to join waitlist");
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen  bg-background-light dark:bg-background-dark flex items-center justify-center p-2">
      <div className= "max-w-[480px]">
        <div className="text-center mb-8 px-4">
          <h1 className="text-3xl font-bold text-text-primary mb-4">
            Join Our Waitlist
          </h1>
          <p className="text-base text-text-secondary px-2">
            Be the first to know when we launch our AI-powered color palette
            generator!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text-primary mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-border-light dark:border-border-dark rounded-lg bg-card-light dark:bg-card-dark text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary-hover active:bg-primary-active text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Joining..." : "Join Waitlist"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 p-4 rounded-lg mx-4 ${
              isSuccess
                ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
