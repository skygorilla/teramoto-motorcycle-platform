'use server';

import { z } from 'zod';

// Use the server-side Google API key for verification, not the public Firebase key.
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const RECAPTCHA_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const RecaptchaInputSchema = z.object({
  token: z.string(),
  action: z.string(),
});

type VerificationResult = {
  success: boolean;
  message: string;
  score?: number;
};

export async function verifyRecaptcha(input: z.infer<typeof RecaptchaInputSchema>): Promise<VerificationResult> {
  const parsedInput = RecaptchaInputSchema.safeParse(input);

  if (!parsedInput.success) {
    return { success: false, message: 'Invalid input.' };
  }

  if (!GOOGLE_API_KEY || !RECAPTCHA_PROJECT_ID || !RECAPTCHA_SITE_KEY) {
    console.error("reCAPTCHA or Google API Key environment variables are not fully set.");
    return { success: false, message: 'Server configuration error for reCAPTCHA.' };
  }

  try {
    const response = await fetch(`https://recaptchaenterprise.googleapis.com/v1/projects/${RECAPTCHA_PROJECT_ID}/assessments?key=${GOOGLE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: {
          token: parsedInput.data.token,
          siteKey: RECAPTCHA_SITE_KEY,
          expectedAction: parsedInput.data.action,
        },
      }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("reCAPTCHA assessment API error:", response.status, errorBody);
        return { success: false, message: 'Failed to create reCAPTCHA assessment.' };
    }

    const data = await response.json();

    if (!data.tokenProperties?.valid) {
      console.log('reCAPTCHA verification failed: Invalid token.', data.tokenProperties?.invalidReason);
      return { success: false, message: `Verification failed: ${data.tokenProperties?.invalidReason}` };
    }
    
    if (data.tokenProperties.action !== parsedInput.data.action) {
        console.log(`reCAPTCHA verification failed: Action mismatch. Expected ${parsedInput.data.action} but got ${data.tokenProperties.action}`);
        return { success: false, message: 'Verification failed: Action mismatch.' };
    }

    const score = data.riskAnalysis?.score;
    if (score === undefined) {
        console.warn("reCAPTCHA score not available in response. Assuming checkbox challenge passed.");
        return { success: true, message: 'Verification successful (no score).', score: undefined };
    }

    // Scores range from 0.0 (likely bot) to 1.0 (likely human).
    // A score of 0.5 is a common threshold.
    if (score < 0.5) {
      console.log(`reCAPTCHA verification failed: Low score (${score}).`);
      return { success: false, message: `Verification failed: Low score.`, score };
    }

    console.log(`reCAPTCHA verification successful with score: ${score}`);
    return { success: true, message: 'Verification successful.', score };

  } catch (error) {
    console.error('Error during reCAPTCHA verification:', error);
    return { success: false, message: 'An unexpected error occurred during verification.' };
  }
}
