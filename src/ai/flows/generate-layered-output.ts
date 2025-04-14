// src/ai/flows/generate-layered-output.ts

interface LayeredOutput {
  Layer1: {
    description: string;
    suggestedItems: string[];
  };
  Layer2: {
    description: string;
    suggestedItems: string[];
  };
  Layer3: {
    description: string;
    suggestedItems: string[];
  };
}

interface InputData {
  theme: string;
  mood: string;
  genres: string[];
}

function generateLayeredOutput(input: InputData): LayeredOutput {
  const { theme, mood, genres } = input;
  const genreString = genres.join(', ');

  const layer1 = {
    description: `Establish the core of a ${mood} experience within the ${theme} realm, focusing on the foundational genres: ${genreString}.`,
    suggestedItems: [
      `The essence of ${theme} infused with ${mood}`,
      `Dominant traits reflecting ${mood}`,
      `Genre backbone: ${genreString}`,
    ],
  };

  const layer2 = {
    description: `Introduce supporting elements to enrich the ${theme} and ${mood} interplay, drawing inspiration from related genres.`,
    suggestedItems: [
      `Harmonizing details that echo ${theme}`,
      `Nuances that amplify the ${mood}`,
      `Genre variations subtly woven in`,
    ],
  };

  const layer3 = {
    description: `Incorporate intricate details that add depth and complexity to the ${theme} and ${mood} fusion, hinting at cross-genre influences.`,
    suggestedItems: [
      `Delicate touches that define ${theme}`,
      `Subliminal cues that evoke ${mood}`,
      `Cross-genre blends subtly integrated`,
    ],
  };

  return { Layer1: layer1, Layer2: layer2, Layer3: layer3 };
}

export { generateLayeredOutput };
export type {InputData, LayeredOutput}