// src/ai/flows/generate-riffusion-prompt.ts
'use server';

/**
 * @fileOverview A Riffusion music prompt generator flow.
 *
 * - generateRiffusionPromptFlow - A function that generates a Riffusion music prompt based on instructions.
 * - GenerateRiffusionPromptInput - The input type for the generateRiffusionPromptFlow function.
 * - GenerateRiffusionPromptOutput - The return type for the generateRiffusionPromptFlow function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {generateRiffusionPrompt} from '@/services/riffusion';

const GenerateRiffusionPromptInputSchema = z.object({
  instructions: z.string().describe('Instructions for generating the Riffusion prompt, following the Riffusion prompt formula.'),
});
export type GenerateRiffusionPromptInput = z.infer<typeof GenerateRiffusionPromptInputSchema>;

const GenerateRiffusionPromptOutputSchema = z.object({
  coreDescriptors: z.string().describe('Core descriptors outlining the sound texture or style.'),
  emotionalMoodContext: z.string().describe('A description to establish the song’s atmosphere, mood, and key instrumental cues.'),
  seedImageInstruction: z.string().optional().describe('Optional instruction for the type of image to use if using an img2img or seed image approach.'),
});
export type GenerateRiffusionPromptOutput = z.infer<typeof GenerateRiffusionPromptOutputSchema>;

export async function generateRiffusionPromptFlowWrapper(
  input: GenerateRiffusionPromptInput
): Promise<GenerateRiffusionPromptOutput> {
  return generateRiffusionPromptFlow(input);
}

const generateRiffusionPromptFlow = ai.defineFlow<
  typeof GenerateRiffusionPromptInputSchema,
  typeof GenerateRiffusionPromptOutputSchema
>(
  {
    name: 'generateRiffusionPromptFlow',
    inputSchema: GenerateRiffusionPromptInputSchema,
    outputSchema: GenerateRiffusionPromptOutputSchema,
  },
  async input => {
    // Call the riffusion service to generate the prompt
    const riffusionPrompt = await generateRiffusionPrompt(input.instructions);
    return riffusionPrompt;
  }
);
