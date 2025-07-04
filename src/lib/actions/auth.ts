
"use server";

export async function verifyRecaptcha(token: string, action: string) {
  const secretKey = process.env.GOOGLE_API_KEY;
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (!secretKey || !siteKey || !projectId) {
    console.error("Missing reCAPTCHA or Firebase environment variables");
    return { success: false, message: "Server configuration error." };
  }

  try {
    const response = await fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${secretKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: {
            token: token,
            siteKey: siteKey,
            expectedAction: action,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("reCAPTCHA API error:", data);
      return { success: false, message: "reCAPTCHA verification failed due to API error." };
    }
    
    // A score of > 0.5 is generally considered low risk.
    // Check for token validity and appropriate action.
    if (data.tokenProperties?.valid && data.tokenProperties?.action === action && data.riskAnalysis?.score > 0.5) {
      return { success: true };
    } else {
      console.log("reCAPTCHA validation failed:", { 
        valid: data.tokenProperties?.valid, 
        invalidReason: data.tokenProperties?.invalidReason,
        action: data.tokenProperties?.action,
        score: data.riskAnalysis?.score 
      });
      return { success: false, message: "reCAPTCHA validation failed. Please try again." };
    }
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return { success: false, message: "An unexpected error occurred during verification." };
  }
}
