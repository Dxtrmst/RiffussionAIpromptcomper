# **App Name**: Riffusion AI Prompt Composer

## Core Features:

- Prompt Generation: Generate Riffusion music prompts based on the provided system instructions, following the formula: [Core Descriptors] + {Emotional/Mood & Instrumentation Context} + [Optional: Seed Image Instruction]. The tool will adhere to the do's and don'ts for effective prompt generation.
- Prompt Layering: Provide a user interface with three prompt layers, each with adjustable strength percentage (0-100%) and start/end times (in seconds).
- Prompt Display & Editing: Display the generated prompts in a clear, editable text area for easy review and modification before use in Riffusion.
- Preset Management: Allow users to save and load prompt configurations (including layer settings) for future use.
- AI-Powered Suggestions: The tool will provide suggestions for 'Core Descriptors', 'Emotional/Mood & Instrumentation Context' and 'Seed Image Instructions' using AI, accessible through UI elements.

## Style Guidelines:

- Primary color: Dark gray (#333333) for a professional feel.
- Secondary color: Light gray (#f0f0f0) for contrast and readability.
- Accent: Teal (#008080) for interactive elements and highlights, suggesting creativity and innovation.
- Clean, sans-serif fonts for readability and a modern look.
- Use simple, line-based icons for a minimalist aesthetic.
- A clean, well-organized layout with clear sections for prompt generation, layering, and settings.
- Subtle animations for feedback on user interactions, like button presses and prompt generation.

## Original User Request:
an app for riffusion  ai music prompt writer with the following system instructions:
Below is a sample system instruction prompt designed for generating effective music prompts specifically for Riffusion. This instruction includes a formula for constructing your prompt, along with an example and clear do’s and don’ts to assist the LLM in producing quality prompts.

──────────────────────────────
SYSTEM INSTRUCTION – Riffusion Music Prompt Creation

Goal: Create a detailed music prompt for Riffusion that describes the desired sonic outcome using evocative adjectives, instrumental and mood descriptions, and optional guidance for seed image usage. Follow the formula and guidelines below.

──────────────────────────────
Prompt Formula:
  [Core Descriptors] + {Emotional/Mood & Instrumentation Context} + [Optional: Seed Image Instruction]

1. [Core Descriptors]:
 • Use descriptive adjectives and artistic keywords to outline the sound texture or style.
 • Example: “ambient, dreamy, experimental”

2. {Emotional/Mood & Instrumentation Context}:
 • Provide a brief narrative or description to establish the song’s atmosphere, mood, and key instrumental cues.
 • Example: “A slowly evolving soundscape with gentle piano motifs and subtle, ethereal synth layers that evoke a mysterious, twilight vibe.”

3. [Optional: Seed Image Instruction]:
 • If using an img2img or seed image approach, include an instruction for the type of image to use, and optionally note any parameters (like denoising strength).
 • Example: “Seed image: an abstract, blurred night sky with soft colors. Set denoising_strength to 0.6 to balance structure and creative variance.”

──────────────────────────────
General Guidelines (Do’s and Don’ts):

Do’s:
 • Do start with vivid, artistic descriptors that naturally hint at sonic textures.
 • Do include a contextual description that defines the mood, instrumental details, or evolving structure.
 • Do mention a seed image if you want to guide the visual spectrogram generation—this is very powerful in shaping the output.
 • Do iterate and refine your prompt. Listen to the output, then adjust adjectives, instrument cues, or the seed image instructions to get closer to your vision.

Don’ts:
 • Don’t overload the prompt with too many conflicting adjectives (e.g., “rapid and slow” in one sentence) unless you intend to create a dynamic contrast.
 • Don’t use overly technical musical jargon (like BPM or chord progressions) since Riffusion works best with descriptive imagery.
 • Don’t ignore the optional seed image benefit if you have a clear visual representation of your ideal sound.
 • Don’t be vague; a prompt like “good music” will likely yield generic results.

──────────────────────────────
Example Prompt (combining all elements):

  [ambient, dreamy, experimental] 
  {A slowly evolving soundscape featuring gentle piano motifs layered with soft, ethereal synths, aiming to evoke a mysterious, twilight ambiance that feels both calming and slightly surreal.} 
  [Optional: Seed image is an abstract, blurred night sky with pastel color gradients; use a denoising strength of 0.6 for a balanced interpretation.]

──────────────────────────────
End Instruction

also, there shall be three prompt layers for mixing prompts. include a strength percentage and suggested time start and end for each
  