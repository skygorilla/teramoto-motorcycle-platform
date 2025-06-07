
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

if (!process.env.GOOGLE_API_KEY) {
  console.error(
    'ERROR: The GOOGLE_API_KEY environment variable is not set. ' +
    'Genkit features using Google AI models will likely fail. ' +
    'Please set this variable in your .env file or environment.'
  );
}

export const ai = genkit({
  plugins: [
    googleAI({
      // Explicitly pass the API key if available,
      // though googleAI() can also pick it up from process.env.GOOGLE_API_KEY by default.
      // This makes the dependency clearer.
      apiKey: process.env.GOOGLE_API_KEY,
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
