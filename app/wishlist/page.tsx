"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function WishlistPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Successfully joined the waitlist!");
        setEmail("");
      } else {
        if (
          data.error?.includes("already exists") ||
          data.error?.includes("already in use")
        ) {
          toast.error("This email is already on our waitlist!");
        } else if (data.error?.includes("Invalid email")) {
          toast.error("Please enter a valid email address");
        } else {
          toast.error(data.error || "Failed to join waitlist");
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-2">
      <div className="max-w-[480px] text-center">
        <h1 className="text-4xl font-extrabold text-theme mb-3">
          🎨 Discover stunning color palettes instantly
        </h1>
        <p className="text-lg text-theme/80 mb-6">
          Join our waitlist and be the first to explore AI-powered color
          palettes tailored for your creativity!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 px-4">
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-card-dark dark:border-card-light rounded-lg 
                         bg-card-light dark:bg-card-dark text-theme placeholder-theme opacity-60 
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary-hover active:scale-95 
                       text-white font-semibold py-3 px-6 rounded-lg 
                       transition-all duration-300 disabled:opacity-50 
                       hover:shadow-xl hover:scale-[1.02]"
          >
            {isLoading ? "⏳ Joining..." : "✨ Join the Waitlist"}
          </button>
        </form>

        <p className="text-xs text-theme/60 mt-3">
          🔒 No spam. Only updates about our palette generator.
        </p>
      </div>
    </div>
  );
}
