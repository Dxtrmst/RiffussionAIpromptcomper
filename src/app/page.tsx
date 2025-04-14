import {RiffusionPromptComposer} from '@/components/RiffusionPromptComposer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-12">
      <h1 className="text-3xl font-bold mb-6">Riffusion AI Prompt Composer</h1>
      <RiffusionPromptComposer />
    </main>
  );
}
