import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";
import { getClientIP, isAllowedIP } from "@/app/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);

    if (isAllowedIP(clientIP)) {
      return NextResponse.json({
        remainingRequests: 999, // IPs permitidas tienen acceso ilimitado
        resetTime: new Date().toISOString(),
      });
    }

    const { data: usage, error } = await supabase
      .from("api_usage")
      .select("usage_count, last_used")
      .eq("ip_address", clientIP)
      .single();

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    const MAX_FREE_REQUESTS = 5;
    const RATE_LIMIT_WINDOW_HOURS = 24;

    if (!usage) {
      return NextResponse.json({
        remainingRequests: MAX_FREE_REQUESTS,
        resetTime: new Date().toISOString(),
      });
    }

    // Verificar si han pasado 24 horas
    const lastUsed = new Date(usage.last_used);
    const now = new Date();
    const hoursSinceLastUse =
      (now.getTime() - lastUsed.getTime()) / (1000 * 60 * 60);

    if (hoursSinceLastUse >= RATE_LIMIT_WINDOW_HOURS) {
      return NextResponse.json({
        remainingRequests: MAX_FREE_REQUESTS,
        resetTime: now.toISOString(),
      });
    }

    const remainingRequests = Math.max(
      0,
      MAX_FREE_REQUESTS - usage.usage_count
    );
    const resetTime = new Date(
      lastUsed.getTime() + RATE_LIMIT_WINDOW_HOURS * 60 * 60 * 1000
    );

    return NextResponse.json({
      remainingRequests,
      resetTime: resetTime.toISOString(),
    });
  } catch (error) {
    console.error("Error checking usage:", error);
    return NextResponse.json(
      { error: "Failed to check usage" },
      { status: 500 }
    );
  }
}
