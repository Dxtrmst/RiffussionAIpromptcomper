'use server';
/**
 * @fileOverview Provides AI-powered suggestions for Riffusion prompt elements.
 *
 * - suggestPromptElements - A function that suggests core descriptors, emotional/mood context, and seed image instructions.
 * - SuggestPromptElementsInput - The input type for the suggestPromptElements function.
 * - SuggestPromptElementsOutput - The return type for the suggestPromptElements function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SuggestPromptElementsInputSchema = z.object({
  userInput: z.string().describe('The user input to generate prompt elements from.'),
});
export type SuggestPromptElementsInput = z.infer<typeof SuggestPromptElementsInputSchema>;

const SuggestPromptElementsOutputSchema = z.object({
  coreDescriptors: z.string().describe('Suggested core descriptors for the Riffusion prompt.'),
  emotionalMoodContext: z.string().describe('Suggested emotional and mood context for the Riffusion prompt.'),
  seedImageInstruction: z.string().describe('Suggested seed image instruction for the Riffusion prompt.'),
});
export type SuggestPromptElementsOutput = z.infer<typeof SuggestPromptElementsOutputSchema>;

export async function suggestPromptElements(input: SuggestPromptElementsInput): Promise<SuggestPromptElementsOutput> {
  return suggestPromptElementsFlow(input);
}

const suggestPromptElementsPrompt = ai.definePrompt({
  name: 'suggestPromptElementsPrompt',
  input: {
    schema: z.object({
      userInput: z.string().describe('The user input to generate prompt elements from.'),
    }),
  },
  output: {
    schema: z.object({
      coreDescriptors: z.string().describe('Suggested core descriptors for the Riffusion prompt.'),
      emotionalMoodContext: z.string().describe('Suggested emotional and mood context for the Riffusion prompt.'),
      seedImageInstruction: z.string().describe('Suggested seed image instruction for the Riffusion prompt.'),
    }),
  },
  prompt: `You are an AI assistant designed to help users generate music prompts for Riffusion.

  Based on the user's input, provide suggestions for the following prompt elements:
  - Core Descriptors: Descriptive adjectives and artistic keywords outlining the sound texture or style.
  - Emotional/Mood & Instrumentation Context: A brief narrative or description to establish the song’s atmosphere, mood, and key instrumental cues.
  - Seed Image Instruction: An instruction for the type of image to use if using an img2img or seed image approach.

  User Input: {{{userInput}}}

  Respond with the suggestions, making sure to fill all fields in the output schema. Do not return anything besides the JSON response.
  `,
});

const suggestPromptElementsFlow = ai.defineFlow<
  typeof SuggestPromptElementsInputSchema,
  typeof SuggestPromptElementsOutputSchema
>({
  name: 'suggestPromptElementsFlow',
  inputSchema: SuggestPromptElementsInputSchema,
  outputSchema: SuggestPromptElementsOutputSchema,
},
async input => {
  const {output} = await suggestPromptElementsPrompt(input);
  return output!;
});
