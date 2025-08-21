"use client";

import { useState, useEffect } from "react";

interface UsageInfo {
  remainingRequests: number;
  resetTime: string;
}

export function UsageCounter() {
  const [usageInfo, setUsageInfo] = useState<UsageInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Obtener información de uso actual
    const checkUsage = async () => {
      try {
        const response = await fetch("/api/check-usage");
        if (response.ok) {
          const data = await response.json();
          setUsageInfo(data);
        }
      } catch (error) {
        console.error("Error checking usage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUsage();
  }, []);

  if (isLoading) return null;

  if (!usageInfo) return null;

  const resetDate = new Date(usageInfo.resetTime);
  const now = new Date();
  const timeUntilReset = resetDate.getTime() - now.getTime();
  const hoursUntilReset = Math.ceil(timeUntilReset / (1000 * 60 * 60));

  return (
    <div className="text-sm text-muted-foreground">
      <span className="font-medium">
        {usageInfo.remainingRequests} free requests remaining
      </span>
      {hoursUntilReset > 0 && (
        <span className="ml-2">• Resets in {hoursUntilReset}h</span>
      )}
    </div>
  );
}
