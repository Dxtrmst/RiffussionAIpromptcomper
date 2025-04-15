'use server';
/**
 * @fileOverview Generates layered music prompts for Riffusion using AI.
 *
 * - generateLayeredOutput - A function that generates three layers of music prompts for Riffusion based on user input.
 * - GenerateLayeredOutputInput - The input type for the generateLayeredOutput function.
 * - GenerateLayeredOutputOutput - The return type for the generateLayeredOutput function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateLayeredOutputInputSchema = z.object({
  theme: z.string().describe('The overall theme or concept for the music.'),
  mood: z.string().describe('The desired mood or emotion the music should evoke.'),
  genres: z.array(z.string()).describe('A list of musical genres to incorporate into the prompts.'),
});
export type GenerateLayeredOutputInput = z.infer<typeof GenerateLayeredOutputInputSchema>;

const GenerateLayeredOutputOutputSchema = z.object({
  layer1Prompt: z.string().describe('Prompt for the foundational layer of the music.'),
  layer2Prompt: z.string().describe('Prompt for the supporting layer, enriching the theme and mood.'),
  layer3Prompt: z.string().describe('Prompt for the intricate layer, adding depth and complexity.'),
});
export type GenerateLayeredOutputOutput = z.infer<typeof GenerateLayeredOutputOutputSchema>;

export async function generateLayeredOutput(input: GenerateLayeredOutputInput): Promise<GenerateLayeredOutputOutput> {
  return generateLayeredOutputFlow(input);
}

const generateLayeredOutputPrompt = ai.definePrompt({
  name: 'generateLayeredOutputPrompt',
  input: {
    schema: z.object({
      theme: z.string().describe('The overall theme or concept for the music.'),
      mood: z.string().describe('The desired mood or emotion the music should evoke.'),
      genres: z.string().describe('A comma-separated list of musical genres to incorporate into the prompts.'),
    }),
  },
  output: {
    schema: z.object({
      layer1Prompt: z.string().describe('Prompt for the foundational layer of the music.'),
      layer2Prompt: z.string().describe('Prompt for the supporting layer, enriching the theme and mood.'),
      layer3Prompt: z.string().describe('Prompt for the intricate layer, adding depth and complexity.'),
    }),
  },
  prompt: `You are an AI music prompt engineer specializing in generating layered prompts for Riffusion.
  Based on the user's desired theme, mood, and genres, provide three distinct prompts, one for each layer.

  The prompts should be descriptive, musical, and creative, suitable for use with Riffusion.
  Each layer should build upon the previous one, adding depth and complexity to the overall musical idea.

  Theme: {{{theme}}}
  Mood: {{{mood}}}
  Genres: {{{genres}}}

  Respond with the three prompts, making sure to fill all fields in the output schema. Do not return anything besides the JSON response.
  `,
});

const generateLayeredOutputFlow = ai.defineFlow<
  typeof GenerateLayeredOutputInputSchema,
  typeof GenerateLayeredOutputOutputSchema
>({
  name: 'generateLayeredOutputFlow',
  inputSchema: GenerateLayeredOutputInputSchema,

  outputSchema: GenerateLayeredOutputOutputSchema,
},
async input => {
  const {theme, mood, genres} = input;
  const {output} = await generateLayeredOutputPrompt({
    theme: theme,
    mood: mood,
    genres: genres.join(', '),
  });
  console.log("generateLayeredOutputFlow input:", input);
  console.log("generateLayeredOutputFlow output:", output);
  if (!output) {
        throw new Error('Failed to generate prompts.');
  }
  return output;
});
