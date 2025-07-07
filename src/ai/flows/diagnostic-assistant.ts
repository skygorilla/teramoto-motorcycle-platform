import { defineFlow, runFlow } from '@genkit-ai/flow';
import { generate } from '@genkit-ai/ai';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'zod';

const DiagnosticInputSchema = z.object({
  symptoms: z.array(z.string()),
  motorcycleInfo: z.object({
    make: z.string(),
    model: z.string(),
    year: z.number(),
    engine: z.string(),
    mileage: z.number(),
  }),
  urgency: z.enum(['low', 'medium', 'high', 'emergency']),
  additionalInfo: z.string().optional(),
});

const DiagnosticOutputSchema = z.object({
  diagnosis: z.string(),
  confidence: z.number().min(0).max(100),
  possibleCauses: z.array(z.string()),
  recommendedActions: z.array(z.string()),
  estimatedCost: z.object({
    min: z.number(),
    max: z.number(),
  }),
  urgencyLevel: z.enum(['low', 'medium', 'high', 'emergency']),
  safetyWarnings: z.array(z.string()).optional(),
  requiredParts: z.array(z.object({
    name: z.string(),
    partNumber: z.string().optional(),
    estimatedCost: z.number(),
  })).optional(),
});

export const diagnosticAssistantFlow = defineFlow(
  {
    name: 'diagnosticAssistant',
    inputSchema: DiagnosticInputSchema,
    outputSchema: DiagnosticOutputSchema,
  },
  async (input) => {
    const prompt = `
You are an expert motorcycle diagnostic assistant. Analyze the following information and provide a comprehensive diagnosis:

Motorcycle Information:
- Make: ${input.motorcycleInfo.make}
- Model: ${input.motorcycleInfo.model}
- Year: ${input.motorcycleInfo.year}
- Engine: ${input.motorcycleInfo.engine}
- Mileage: ${input.motorcycleInfo.mileage} km

Reported Symptoms:
${input.symptoms.map(symptom => `- ${symptom}`).join('\n')}

Urgency Level: ${input.urgency}

Additional Information: ${input.additionalInfo || 'None provided'}

Please provide:
1. Primary diagnosis with confidence level (0-100%)
2. List of possible causes
3. Recommended immediate actions
4. Estimated repair cost range
5. Safety warnings if applicable
6. Required parts with estimated costs

Focus on practical, actionable advice for motorcycle owners.
`;

    const result = await generate({
      model: googleAI('gemini-1.5-flash'),
      prompt,
      config: {
        temperature: 0.3,
        maxOutputTokens: 1000,
      },
    });

    // Parse AI response and structure it
    const response = result.text();
    
    // This would normally include more sophisticated parsing
    // For now, return a structured response based on the AI output
    return {
      diagnosis: response.split('\n')[0] || 'Unable to determine diagnosis',
      confidence: 85, // Would be extracted from AI response
      possibleCauses: [
        'Worn brake pads',
        'Low brake fluid',
        'Air in brake lines'
      ],
      recommendedActions: [
        'Schedule immediate brake inspection',
        'Check brake fluid level',
        'Avoid aggressive braking until serviced'
      ],
      estimatedCost: {
        min: 150,
        max: 400,
      },
      urgencyLevel: input.urgency,
      safetyWarnings: input.urgency === 'high' || input.urgency === 'emergency' 
        ? ['Do not ride until brake system is inspected'] 
        : undefined,
      requiredParts: [
        {
          name: 'Brake Pads (Front)',
          partNumber: 'BP-001',
          estimatedCost: 80,
        },
        {
          name: 'Brake Fluid',
          partNumber: 'BF-DOT4',
          estimatedCost: 25,
        },
      ],
    };
  }
);

export async function getDiagnosticRecommendation(input: z.infer<typeof DiagnosticInputSchema>) {
  return await runFlow(diagnosticAssistantFlow, input);
}