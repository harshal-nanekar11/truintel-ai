import { NextRequest, NextResponse } from "next/server";
import { analyzeReview } from "@/lib/analyzeReview";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { review } = body as { review: string };

    if (!review || typeof review !== "string") {
      return NextResponse.json(
        { error: "Review text is required" },
        { status: 400 }
      );
    }

    if (review.trim().length < 5) {
      return NextResponse.json(
        { error: "Review is too short to analyze" },
        { status: 400 }
      );
    }

    if (review.length > 5000) {
      return NextResponse.json(
        { error: "Review exceeds maximum length of 5000 characters" },
        { status: 400 }
      );
    }

    // Simulate AI processing delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 1200 + Math.random() * 800));

    const result = analyzeReview(review);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Internal server error during analysis" },
      { status: 500 }
    );
  }
}
