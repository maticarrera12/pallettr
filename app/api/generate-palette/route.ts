import { NextRequest, NextResponse } from "next/server";

/**
 * API route for generating color palettes using Google Gemini 1.5 Pro
 * This endpoint accepts a user prompt and returns a curated color palette
 */

// Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function POST(request: NextRequest) {
  try {

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
Generate a professional color palette based on this description: "${prompt}"

CRITICAL REQUIREMENTS:
- Primary, secondary, and tertiary colors MUST NOT be white (#FFFFFF) or black (#000000)
- All colors must comply with WCAG AA contrast standards (minimum 4.5:1 ratio)
- Primary colors should have 10–35% lightness and 85–100% saturation (EXTREMELY BRIGHT, STRONG, and VIBRANT)
- Secondary colors should have 10–35% lightness and 80–100% saturation (VERY BRIGHT, STRONG, and VIBRANT)
- Tertiary colors should have 10–35% lightness and 75–100% saturation (BRIGHT, STRONG, and VIBRANT)
- Colors must generally be varied unless the user explicitly requests a monochromatic palette or a theme that demands dominance of one hue.
- Background colors should be subtle, soft, and never pure white/black
- Card colors must provide clear separation from the background and ensure excellent text contrast
- Text colors must always ensure outstanding readability across all backgrounds

STYLE AND MEANING REQUIREMENTS:
- Always generate palettes that are **harmonious and professional** using color theory (analogous, triadic, or complementary schemes)
- Colors should feel **dynamic, lively, and energetic by default** unless the user’s prompt specifies a calm, muted, or minimalistic vibe
- If the prompt contains **adjectives** (e.g., "playful", "elegant", "futuristic"), strongly reflect them in the palette’s mood
- Always balance **aesthetic appeal, accessibility, and theme relevance**
- Ensure the palette works well in both light and dark modes

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
    console.log("Gemini response data:", JSON.stringify(data, null, 2));

    const generatedText = data.candidates[0]?.content?.parts[0]?.text;

    if (!generatedText) {
      throw new Error("No content generated from Gemini");
    }

    console.log("Generated text:", generatedText);

    // Parse the JSON response from Gemini
    let parsedPalette;
    try {
      // Extract JSON from the response (remove any markdown formatting)
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedPalette = JSON.parse(jsonMatch[0]);
        console.log("Parsed palette:", parsedPalette);
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

    console.log("Returning transformed palette");
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
