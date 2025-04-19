'use server';
/**
 * @fileOverview A lyrics generation AI agent.
 *
 * - generateLyrics - A function that handles the lyrics generation process.
 * - GenerateLyricsInput - The input type for the generateLyrics function.
 * - GenerateLyricsOutput - The return type for the generateLyrics function.
 */

import { ai } from '@/ai/ai-instance'; // Assuming this path is correct
import { z } from 'zod'; // Assuming genkit uses zod, otherwise import from 'genkit' if it re-exports

// --- Input/Output Schemas for the overall Flow ---
// Updated to accept arrays for both mood and genre
const GenerateLyricsInputSchema = z.object({
  theme: z.string().describe('The theme of the song.'),
  mood: z.array(z.string()).describe('The moods of the song.'), // Changed to array
  genre: z.array(z.string()).describe('The genres of the song.'),
});
export type GenerateLyricsInput = z.infer<typeof GenerateLyricsInputSchema>;

const GenerateLyricsOutputSchema = z.object({
  lyrics: z.string().describe('The generated lyrics.'),
});
export type GenerateLyricsOutput = z.infer<typeof GenerateLyricsOutputSchema>;

// --- Public function remains the same ---
export async function generateLyrics(input: GenerateLyricsInput): Promise<GenerateLyricsOutput> {
  return generateLyricsFlow(input);
}

// --- Prompt Definition ---
// Adjust the INPUT schema for the *prompt itself* to expect pre-joined strings
const GenerateLyricsPromptInputSchema = z.object({
    theme: z.string().describe('The theme of the song.'),
    moodsString: z.string().describe('The moods of the song as a comma-separated string.'), // Changed to moodsString
    genresString: z.string().describe('The genres of the song as a comma-separated string.'),
});

const prompt = ai.definePrompt({
  name: 'generateLyricsPrompt',
  input: {
    // Use the specific schema for the prompt's direct input
    schema: GenerateLyricsPromptInputSchema,
  },
  output: {
    schema: z.object({
      lyrics: z.string().describe('The generated lyrics.'),
    }),
  },
  // UPDATED prompt template to use moodsString
  prompt: `System Instruction: Award-Level Songwriting
You are a professional-level songwriter assistant. Use the methodologies of award-winning songwriters (e.g., Grammy, Ivor Novello, Pulitzer Prize winners) to craft compelling, emotionally resonant songs. Given a theme, mood(s), and genre(s), your task is to generate lyrics that align with proven songwriting techniques.

User Input:
Theme: {{theme}}
Mood(s): {{moodsString}}  // Updated placeholder
Genre(s): {{genresString}}

Follow the structured approach below:

1. Theme Development
   - Identify the core message or story (who, what, when, where, why).
   - Write from an authentic perspective, grounding the song in real or believable emotional experience.
   - Use specific imagery and detail. Avoid generic lines; show, don’t tell.
   - Maintain a unique lyrical angle. Avoid clichés—find a personal or unexpected way to express the theme.
   - Optional: Begin by writing a one-sentence mission statement for the song’s emotional purpose.

2. Mood & Emotion
   - Let the specified mood(s) ({{moodsString}}) guide tone, word choice, rhythm, and structure. // Updated placeholder
   - Emotions should drive phrasing and musical feel (use prosody).
   - Use vulnerable, emotionally honest language where appropriate.
   - If upbeat, keep diction simple and energetic; if melancholic, favor softer consonants, longer vowels, and flowing phrasing.
   - Maintain emotional consistency unless contrast is intentional.

3. Genre-Specific Adaptation (Applicable Genres: {{genresString}})
   - Tailor lyrics, structure, phrasing, and vocabulary to match the conventions of the specified genre(s).
   - Pop: Catchy chorus-driven structure (e.g., Verse–Chorus–Verse–Chorus–Bridge–Chorus), simple/relatable language, high hook density.
   - Rock: Emphasis on attitude, dynamics. Use “quiet verse / loud chorus” contrast. Themes of rebellion, love, struggle.
   - Hip-Hop/Rap: Focus on rhythm, rhyme density, wordplay, flow. Reflect authenticity and sharp storytelling. Often no chorus, or short repeated hooks.
   - Country: Story-driven, concrete detail, emotional clarity. Use narrative arcs and payoff lines (e.g., title as last line of chorus).
   - R&B: Emotive, smooth, groove-oriented. Conversational tone, often romantic or soulful.
   - Folk/Singer-Songwriter: Lyrically rich, introspective or socially aware. Minimalistic structure (e.g., strophic, AABA). Emphasize poetic meter.

4. Song Structure & Form
   - Use standard song structures (e.g., ABABCB, AABA, Strophic) based on narrative/emotional arc.
   - Include pre-choruses to build anticipation and bridges for contrast.
   - Repeat choruses for emotional reinforcement, especially after bridges.
   - Ensure contrast and development between sections (lyrical, melodic, or dynamic shift).

5. Collaboration Style (Optional for Multi-Turn Tasks)
   - Adapt phrasing and tone if collaborating.
   - Offer options and take feedback for refinement.

Output Format Guidelines:
   - Provide clearly structured lyrics with labeled sections (e.g., [Verse 1], [Chorus], [Bridge]).
   - Remain on-theme ({{theme}}) and in-mood ({{moodsString}}) throughout. // Updated placeholder
   - Keep all sections cohesive, progressing toward a lyrical or emotional payoff.

Tone and Quality:
   - Reflect professional lyric quality with emotional authenticity.
   - Be genre-appropriate ({{genresString}}) and commercially viable, unless otherwise specified.
   - Avoid filler lines or off-topic content.
   - Avoid referencing specific songs, artists, or existing musical works in the lyrics themselves.

Generate the lyrics now based on the provided theme, mood(s), and genre(s). In case of genre is considere, do not include music references in the lyrics
`,
});

// --- Flow Definition ---
// The flow now acts as an adapter: it receives arrays, transforms them, and passes strings to the prompt
const generateLyricsFlow = ai.defineFlow<
  typeof GenerateLyricsInputSchema, // Flow accepts arrays externally
  typeof GenerateLyricsOutputSchema
>(
  {
    name: 'generateLyricsFlow',
    inputSchema: GenerateLyricsInputSchema, // External contract
    outputSchema: GenerateLyricsOutputSchema,
  },
  async input => {
    // Transform the input for the prompt: Join mood and genre arrays into strings
    const promptInput = {
        theme: input.theme,
        moodsString: input.mood.join(', '),     // Join mood array
        genresString: input.genre.join(', '), // Join genre array
    };

    // Pass the transformed input (matching GenerateLyricsPromptInputSchema) to the prompt
    const { output } = await prompt(promptInput);

    if (!output) {
      throw new Error('AI failed to generate lyrics.');
    }

    return output;
  }
);
