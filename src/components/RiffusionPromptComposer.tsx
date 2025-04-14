'use client';

import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Input} from '@/components/ui/input';
import {Slider} from '@/components/ui/slider';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Label} from '@/components/ui/label';

const initialPromptLayers = [
  {id: 1, prompt: '', strength: 100, start: 0, end: 10},
  {id: 2, prompt: '', strength: 100, start: 0, end: 10},
  {id: 3, prompt: '', strength: 100, start: 0, end: 10},
];

export const RiffusionPromptComposer = () => {
  const [promptLayers, setPromptLayers] = useState(initialPromptLayers);
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  const handlePromptChange = (id: number, field: string, value: any) => {
    setPromptLayers(prevLayers =>
      prevLayers.map(layer =>
        layer.id === id ? {...layer, [field]: value} : layer
      )
    );
  };

  const handleGeneratePrompt = () => {
    // Combine prompts from layers based on strength and time
    const combinedPrompt = promptLayers.map(layer =>
      `(${layer.prompt}:${layer.strength / 100})`
    ).join(' ');
    setGeneratedPrompt(combinedPrompt);
  };

  return (
    <div className="flex flex-col space-y-4 w-full max-w-3xl">
      <Tabs defaultValue="prompt" className="w-full">
        <TabsList>
          <TabsTrigger value="prompt">Prompts</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="presets">Presets</TabsTrigger>
        </TabsList>
        <TabsContent value="prompt">
          {promptLayers.map(layer => (
            <Card key={layer.id}>
              <CardHeader>
                <CardTitle>Prompt Layer {layer.id}</CardTitle>
                <CardDescription>Adjust settings for this layer.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor={`prompt-${layer.id}`}>Prompt</Label>
                  <Textarea
                    id={`prompt-${layer.id}`}
                    value={layer.prompt}
                    onChange={(e) => handlePromptChange(layer.id, 'prompt', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor={`strength-${layer.id}`}>Strength (%)</Label>
                    <Input
                      type="number"
                      id={`strength-${layer.id}`}
                      value={layer.strength}
                      onChange={(e) => handlePromptChange(layer.id, 'strength', Number(e.target.value))}
                    />
                    <Slider
                      defaultValue={[layer.strength]}
                      max={100}
                      min={0}
                      step={1}
                      onValueChange={(value) => handlePromptChange(layer.id, 'strength', value[0])}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Start & End Time (seconds)</Label>
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="Start"
                        value={layer.start}
                        onChange={(e) => handlePromptChange(layer.id, 'start', Number(e.target.value))}
                      />
                      <Input
                        type="number"
                        placeholder="End"
                        value={layer.end}
                        onChange={(e) => handlePromptChange(layer.id, 'end', Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="suggestions">
          <p>AI-powered suggestions will be implemented here.</p>
          {/* AI-Powered Suggestions UI */}
        </TabsContent>
        <TabsContent value="presets">
          <p>Preset management will be implemented here.</p>
          {/* Preset Management UI */}
        </TabsContent>
      </Tabs>

      <Button onClick={handleGeneratePrompt}>Generate Prompt</Button>
      {generatedPrompt && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Prompt</CardTitle>
            <CardDescription>Here is your combined prompt. Edit as needed.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea value={generatedPrompt} readOnly />
          </CardContent>
        </Card>
      )}
    </div>
  );
};
