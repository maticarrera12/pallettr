import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";
import { getClientIP, isAllowedIP } from "@/app/lib/utils";

/**
 * API route for generating color palettes using Google Gemini 1.5 Pro
 * This endpoint accepts a user prompt and returns a curated color palette
 */

// Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Configuración del rate limiting
const MAX_FREE_REQUESTS = 5;
const RATE_LIMIT_WINDOW_HOURS = 24; // Reset cada 24 horas

export async function POST(request: NextRequest) {
  try {
    // Obtener IP del cliente
    const clientIP = getClientIP(request);
    console.log("🔍 Client IP:", clientIP);
    console.log("🔍 Is allowed IP:", isAllowedIP(clientIP));

    // Verificar rate limiting (excepto para IPs permitidas en desarrollo)
    if (!isAllowedIP(clientIP)) {
      console.log("🔍 Checking rate limit for IP:", clientIP);
      const rateLimitResult = await checkRateLimit(clientIP);
      console.log("🔍 Rate limit result:", rateLimitResult);

      if (!rateLimitResult.allowed) {
        console.log("🚫 Rate limit exceeded for IP:", clientIP);
        return NextResponse.json(
          {
            error: "Rate limit exceeded",
            message:
              "You've reached your free trial limit. Please join our wishlist for unlimited access.",
            redirectTo: "/wishlist",
            remainingRequests: rateLimitResult.remainingRequests,
            resetTime: rateLimitResult.resetTime,
          },
          { status: 429 }
        );
      }
    } else {
      console.log("✅ IP allowed, skipping rate limit check");
    }

    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Invalid prompt provided" },
        { status: 400 }
      );
    }

    if (!GEMINI_API_KEY) {
      console.log("No API key - returning error");
      return NextResponse.json(
        {
          error:
            "Gemini API key not configured. Please set GEMINI_API_KEY in your .env.local file",
        },
        { status: 500 }
      );
    }

    console.log("Calling Gemini API...");

    // Construct the prompt for Gemini with specific requirements
    const geminiPrompt = `
Generate a professional, vibrant, and harmonious color palette for UI design based on this description: "${prompt}".

1. Color Roles and Requirements:

Primary color: 1 color, Lightness 10–35%, Saturation 85–100% (EXTREMELY BRIGHT, STRONG, VIBRANT).

Secondary color: 1 color, Lightness 10–35%, Saturation 80–100% (VERY BRIGHT, STRONG, VIBRANT).

Tertiary color: 1 color, Lightness 10–35%, Saturation 75–100% (BRIGHT, STRONG, VIBRANT).

Background colors: 2 colors (Light and Dark), subtle and soft, never pure white (#FFFFFF) or pure black (#000000).

Card colors: 2 colors (Light and Dark), distinct from background, ensuring excellent text contrast.

Text colors: black and white variants, always readable over all backgrounds and cards.

All colors must comply with WCAG AA standards (contrast ratio ≥ 4.5:1).

Colors should generally be varied and distinct unless a monochromatic palette is explicitly requested.

2. Style and Mood:

Palette must be harmonious, professional, and energetic by default.

Reflect adjectives like 'playful', 'elegant', or 'futuristic' if provided.

Palette must work well in both light and dark UI modes.

3. Color Theory Awareness:

Analogous: colors next to each other on the color wheel, creating smooth harmony.

Complementary: colors opposite each other on the wheel, creating strong contrast and balance.

Split-complementary: one main color with the two colors adjacent to its complement, offering contrast without intensity.

Monochromatic: variations of a single hue using different lightness and saturation levels, creating cohesion and softness. Understand this as a concept, but only use it if specifically requested.

Triadic: three colors evenly spaced on the wheel, for balanced dynamism.

Tetradic (double-complementary): four colors arranged as two complementary pairs, giving richness while maintaining harmony.

4. Output Requirements:

Provide exactly: 1 Primary, 1 Secondary, 1 Tertiary, 2 Backgrounds (Light and Dark), 2 Card colors (Light and Dark), and 2 Text colors (black and white).

Include hex codes, RGB, and HSL values.

Label each color with its role.

Ensure excellent accessibility, contrast, and readability.

OUTPUT FORMAT:
Return ONLY a JSON object with this exact structure:
{
  "primary": "#HEXCODE",
  "secondary": "#HEXCODE",
  "tertiary": "#HEXCODE",
  "backgroundLight": "#HEXCODE",
  "backgroundDark": "#HEXCODE",
  "cardLight": "#HEXCODE",
  "cardDark": "#HEXCODE",
  "textBlack": "#HEXCODE",
  "textWhite": "#HEXCODE"
}
`;

    // Call Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: geminiPrompt,
              },
            ],
          },
        ],
      }),
    });

    console.log("Gemini response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error response:", errorText);

      if (response.status === 429) {
        throw new Error(
          "Rate limit exceeded. Please wait a moment and try again. You've made too many requests to the Gemini API."
        );
      }

      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    // console.log("Gemini response data:", JSON.stringify(data, null, 2)); // ← Comentar esta línea

    const generatedText = data.candidates[0]?.content?.parts[0]?.text;

    if (!generatedText) {
      throw new Error("No content generated from Gemini");
    }

    // console.log("Generated text:", generatedText); // ← Comentar esta línea

    // Parse the JSON response from Gemini
    let parsedPalette;
    try {
      // Extract JSON from the response (remove any markdown formatting)
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedPalette = JSON.parse(jsonMatch[0]);
        // console.log("Parsed palette:", parsedPalette); // ← Comentar esta línea
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", parseError);
      throw new Error("Invalid JSON response from Gemini");
    }

    // Transform the parsed palette to our expected format with hover/active states
    const transformedPalette = {
      primary: {
        base: parsedPalette.primary,
        hover: darkenColor(parsedPalette.primary, 0.15),
        active: darkenColor(parsedPalette.primary, 0.25),
      },
      secondary: {
        base: parsedPalette.secondary,
        hover: darkenColor(parsedPalette.secondary, 0.15),
        active: darkenColor(parsedPalette.secondary, 0.25),
      },
      tertiary: {
        base: parsedPalette.tertiary,
        hover: darkenColor(parsedPalette.tertiary, 0.15),
        active: darkenColor(parsedPalette.tertiary, 0.25),
      },
      background: {
        light: parsedPalette.backgroundLight,
        dark: parsedPalette.backgroundDark,
      },
      card: {
        light: parsedPalette.cardLight,
        dark: parsedPalette.cardDark,
      },
      text: {
        black: parsedPalette.textBlack,
        white: parsedPalette.textWhite,
      },
    };

    // IMPORTANTE: Incrementar el contador de uso ANTES de retornar la respuesta
    console.log("🔍 Incrementing usage count for IP:", clientIP);
    await incrementUsageCount(clientIP);
    console.log("✅ Usage count incremented successfully");

    return NextResponse.json({ palette: transformedPalette });
  } catch (error) {
    console.error("Error generating palette:", error);
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack"
    );

    return NextResponse.json(
      {
        error: "Failed to generate palette",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * Verifica si el usuario puede hacer más requests
 */
async function checkRateLimit(ip: string): Promise<{
  allowed: boolean;
  remainingRequests: number;
  resetTime: string;
}> {
  try {
    console.log("🔍 Checking rate limit for IP:", ip);

    // Obtener el uso actual
    const { data: usage, error } = await supabase
      .from("api_usage")
      .select("usage_count, last_used")
      .eq("ip_address", ip)
      .single();

    console.log("🔍 Supabase query result:", { usage, error });

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows found
      console.error("❌ Error checking rate limit:", error);
      // En caso de error, permitir la request (fail open)
      return {
        allowed: true,
        remainingRequests: MAX_FREE_REQUESTS,
        resetTime: new Date().toISOString(),
      };
    }

    if (!usage) {
      console.log("🆕 First time using API for IP:", ip);
      // Primera vez usando la API
      return {
        allowed: true,
        remainingRequests: MAX_FREE_REQUESTS,
        resetTime: new Date().toISOString(),
      };
    }

    console.log("📊 Current usage for IP:", ip, "Count:", usage.usage_count);

    // Verificar si han pasado 24 horas desde el último uso
    const lastUsed = new Date(usage.last_used);
    const now = new Date();
    const hoursSinceLastUse =
      (now.getTime() - lastUsed.getTime()) / (1000 * 60 * 60);

    if (hoursSinceLastUse >= RATE_LIMIT_WINDOW_HOURS) {
      // Reset del contador después de 24 horas
      await supabase
        .from("api_usage")
        .update({ usage_count: 0, last_used: now.toISOString() })
        .eq("ip_address", ip);

      return {
        allowed: true,
        remainingRequests: MAX_FREE_REQUESTS,
        resetTime: now.toISOString(),
      };
    }

    const remainingRequests = Math.max(
      0,
      MAX_FREE_REQUESTS - usage.usage_count
    );
    const allowed = usage.usage_count < MAX_FREE_REQUESTS;

    // Calcular cuándo se resetea el contador
    const resetTime = new Date(
      lastUsed.getTime() + RATE_LIMIT_WINDOW_HOURS * 60 * 60 * 1000
    );

    console.log("📊 Rate limit check result:", { allowed, remainingRequests });

    return {
      allowed,
      remainingRequests,
      resetTime: resetTime.toISOString(),
    };
  } catch (error) {
    console.error("❌ Error in checkRateLimit:", error);
    // En caso de error, permitir la request (fail open)
    return {
      allowed: true,
      remainingRequests: MAX_FREE_REQUESTS,
      resetTime: new Date().toISOString(),
    };
  }
}

/**
 * Incrementa el contador de uso para una IP
 */
async function incrementUsageCount(ip: string): Promise<void> {
  try {
    console.log("📊 Attempting to increment usage count for IP:", ip);

    // Usar la función SQL que creamos
    const { data, error } = await supabase.rpc("update_api_usage", { ip });

    console.log("🔍 RPC result:", { data, error });

    if (error) {
      console.error("❌ Error with RPC, trying fallback method:", error);
      // Fallback: intentar insert/update manual
      const { data: existing } = await supabase
        .from("api_usage")
        .select("usage_count")
        .eq("ip_address", ip)
        .single();

      if (existing) {
        await supabase
          .from("api_usage")
          .update({
            usage_count: existing.usage_count + 1,
            last_used: new Date().toISOString(),
          })
          .eq("ip_address", ip);
      } else {
        await supabase.from("api_usage").insert({
          ip_address: ip,
          usage_count: 1,
          last_used: new Date().toISOString(),
        });
      }
    } else {
      console.log("✅ RPC call successful, data:", data);
    }
  } catch (error) {
    console.error("❌ Error in incrementUsageCount:", error);
  }
}

// Simple function to darken colors for hover/active states
function darkenColor(hex: string, amount: number = 0.2): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * amount * 100);
  const R = Math.max(0, (num >> 16) - amt);
  const G = Math.max(0, ((num >> 8) & 0x00ff) - amt);
  const B = Math.max(0, (num & 0x0000ff) - amt);

  return (
    "#" +
    R.toString(16).padStart(2, "0") +
    G.toString(16).padStart(2, "0") +
    B.toString(16).padStart(2, "0")
  );
}
