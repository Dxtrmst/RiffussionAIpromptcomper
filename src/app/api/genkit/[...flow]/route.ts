'use server';
/**
 * @fileOverview Genkit route for Next.js.
 */
import { handleGenkitCall } from '@genkit-ai/next';

// Import your flows (ensure paths are correct)
import { suggestPromptElementsFlowWrapper } from '@/ai/flows/suggest-prompt-elements';
import { generateRiffusionPromptFlowWrapper } from '@/ai/flows/generate-riffusion-prompt';
import { generateLayeredOutput } from '@/ai/flows/generate-layered-output';

export const { GET, POST } = handleGenkitCall({
  flows: {
    suggestPromptElementsFlow: suggestPromptElementsFlowWrapper,
    generateRiffusionPromptFlow: generateRiffusionPromptFlowWrapper,
    generateLayeredOutputFlow: generateLayeredOutput,
  },
});

