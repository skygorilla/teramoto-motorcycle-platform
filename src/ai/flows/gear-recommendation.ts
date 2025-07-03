// Gear Recommendation AI agent.
//
// - gearRecommendation - A function that handles the gear recommendation process.
// - GearRecommendationInput - The input type for the gearRecommendation function.
// - GearRecommendationOutput - The return type for the gearRecommendation function.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GearRecommendationInputSchema = z.object({
  ridingStyle: z
    .string()
    .describe('The riding style of the user (e.g., road, mountain, touring).'),
  weatherConditions: z
    .string()
    .describe('The typical weather conditions the user rides in (e.g., sunny, rainy, cold).'),
  budget: z
    .string()
    .describe('The budget of the user (e.g., low, medium, high).'),
});
export type GearRecommendationInput = z.infer<typeof GearRecommendationInputSchema>;

const GearRecommendationOutputSchema = z.object({
  recommendedGear: z.array(
    z.object({
      name: z.string().describe('The name of the recommended gear item.'),
      description: z.string().describe('A brief description of the gear item.'),
      justification: z
        .string()
        .describe('Why this gear is recommended based on the user inputs.'),
    })
  ).describe('A list of recommended gear items.'),
});
export type GearRecommendationOutput = z.infer<typeof GearRecommendationOutputSchema>;

export async function gearRecommendation(input: GearRecommendationInput): Promise<GearRecommendationOutput> {
  if (!process.env.GOOGLE_API_KEY) {
    // This will be caught by the UI and displayed to the user.
    throw new Error("The GOOGLE_API_KEY environment variable is not set. The AI Assistant cannot function without it.");
  }
  return gearRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'gearRecommendationPrompt',
  input: {schema: GearRecommendationInputSchema},
  output: {schema: GearRecommendationOutputSchema},
  prompt: `You are an expert in motorcycle gear and equipment.

  Based on the rider's style, typical weather conditions, and budget, recommend specific gear items.
  Explain why each item is suitable for their needs.

  Riding Style: {{{ridingStyle}}}
  Weather Conditions: {{{weatherConditions}}}
  Budget: {{{budget}}}

  Format your response as a JSON array of gear items, including the name, description, and justification for each recommendation.
  `,
});

const gearRecommendationFlow = ai.defineFlow(
  {
    name: 'gearRecommendationFlow',
    inputSchema: GearRecommendationInputSchema,
    outputSchema: GearRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
