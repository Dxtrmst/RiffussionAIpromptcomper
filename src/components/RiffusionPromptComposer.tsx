'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; // Removed CardFooter as it wasn't used
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { generateLayeredOutput, GenerateLayeredOutputInput, GenerateLayeredOutputOutput } from '@/ai/flows/generate-layered-output';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // Keep Popover for multi-select simulation if Select doesn't support multi-select out of the box
import { Checkbox } from "@/components/ui/checkbox"; // For multi-select within Popover
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";


const initialPromptLayers = [
  { id: 1, prompt: '', strength: 100, start: 0, end: 10 },
  { id: 2, prompt: '', strength: 100, start: 0, end: 10 },
  { id: 3, prompt: '', strength: 100, start: 0, end: 10 },
];

export const RiffusionPromptComposer = () => {
  const [promptLayers, setPromptLayers] = useState(initialPromptLayers);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const { toast } = useToast();

  const moodList = [
    'Happy', 'Sad', 'Energetic', 'Calm', 'Romantic', 'Angry', 'Mysterious', 'Hopeful', 'Melancholic', 'Uplifting', 'Peaceful', 'Dark', 'Dreamy', 'Aggressive', 'Chill', 'Epic', 'Nostalgic', 'Anxious', 'Excited', 'Reflective', 'Funky', 'Groovy', 'Intense', 'Playful', 'Solemn'
  ];

  const genreList = [
    'Acid House', 'Acid Jazz', 'Action', 'Afrobeat', 'Afro House', 'Afro Pop', 'Afro Punk', 'Aggrotech', 'Alternative', 'Alternative Country', 'Alternative Dance', 'Alternative Hip Hop', 'Alternative Metal', 'Alternative Rock', 'Ambient', 'Anarcho-punk', 'Anime', 'Arabic Pop', 'Arena Rock', 'Arpa', 'Art Pop', 'Art Rock', 'Asia Pop', 'Atmospheric Black Metal', 'Atmospheric Drum and Bass', 'Atmospheric Folk Black Metal', 'Atmospheric Sludge Metal', 'Audiobook', 'Avant-Garde', 'Avant-Garde Black Metal', 'Avant-Garde Jazz', 'Bachata', 'Bachata Urbana', 'Banda', 'Baroque Pop', 'Bass House', 'Bass Music', 'Bassline', 'Bebop', 'Big Band', 'Black Metal', 'Black Roll', 'Bluegrass', 'Blues', 'Blues Rock', 'Bollywood', 'Bongo Flava', 'Bossa Nova', 'Breakbeat', 'Breakcore', 'Britpop', 'Brostep', 'Bubblegum Dance', 'C-Pop', 'Cantonese Pop', 'Celtic', 'Celtic Folk', 'Celtic Punk', 'Chill Hop', 'Chill Trance', 'Chillwave', 'Chinese Hip Hop', 'Chinese Pop', 'Christian & Gospel', 'Christian Alternative Rock', 'Christian Metal', 'Christian Pop', 'Christian Rock', 'Classic Blues', 'Classic Country', 'Classic Hip Hop', 'Classic House', 'Classic Rock', 'Classical', 'Club', 'Comedy', 'Complextro', 'Contemporary Blues', 'Contemporary Country', 'Contemporary Folk', 'Contemporary R&B', 'Cool Jazz', 'Country', 'Country Blues', 'Country Folk', 'Country Pop', 'Crunk', 'Crust Punk', 'Cybergrind', 'Dance', 'Dance-Pop', 'Dance-Punk', 'Dancehall', 'Dark Ambient', 'Dark Electro', 'Dark Folk', 'Dark Psytrance', 'Darkwave', 'Death Metal', 'Deathcore', 'Deep House', 'Delta Blues', 'Desert Rock', 'Detroit Techno', 'Digital Hardcore', 'Disco', 'Dixieland', 'Djent', 'Doom Metal', 'Downtempo', 'Dream Pop', 'Drone', 'Drum and Bass', 'Dub', 'Dub Techno', 'Dubstep', 'Dubstep Riddim', 'Early Music', 'East Coast Hip Hop', 'Easy Listening', 'EDM', 'Electro', 'Electro House', 'Electro Pop', 'Electro Rock', 'Electronic', 'Electronic Body Music', 'Electronica', 'Electropop', 'Emo', 'Enka', 'Ethnic Electronica', 'Europop', 'Experimental', 'Experimental Electronic', 'Experimental Hip Hop', 'Experimental Metal', 'Fado', 'Folk', 'Folk Black Metal', 'Folk Metal', 'Folk Pop', 'Folktronica', 'Freak Folk', 'Frenchcore', 'Funk', 'Funeral Doom Metal', 'Funky House', 'Fusion', 'Gabber', 'Gangsta Rap', 'Garage', 'Garage House', 'Garage Rock', 'German Hip Hop', 'Glam Metal', 'Glam Rock', 'Glitch Hop', 'Gospel', 'Gothic Metal', 'Gothic Rock', 'Grime', 'Grindcore', 'Grunge', 'Gypsy Jazz', 'Happy Hardcore', 'Hard Bop', 'Hard House', 'Hard Rock', 'Hard Techno', 'Hard Trance', 'Hardcore', 'Hardcore Hip Hop', 'Hardcore Punk', 'Hands Up', 'Happy Punk', 'Heavy Metal', 'Hi-NRG', 'Highlife', 'Hip Hop', 'Hip Hop Beats', 'Holiday', 'Honky Tonk', 'House', 'IDM', 'Indian Pop', 'Indie', 'Indie Dance', 'Indie Electronic', 'Indie Folk', 'Indie Pop', 'Indie Rock', 'Industrial', 'Industrial Metal', 'Industrial Rock', 'Instrumental Hip Hop', 'Instrumental Rock', 'Intelligent Dance Music', 'Irish Folk', 'Italo Dance', 'Italo Disco', 'J-Pop', 'J-Rock', 'Jam Band', 'Jazz', 'Jazz Blues', 'Jazz Fusion', 'Jazz Funk', 'Jazz Rap', 'Jazz Rock', 'Jungle', 'K-Pop', 'Kayokyoku', 'Kizomba', 'Krautrock', 'Latin', 'Latin Ballad', 'Latin Hip Hop', 'Latin Jazz', 'Latin Pop', 'Latin Rock', 'Lo-Fi', 'Lo-Fi Hip Hop', 'Lounge', 'Lowercase', 'Madchester', 'Mainstream Hip Hop', 'Malaysian Pop', 'Mambo', 'Manele', 'Maringue', 'Mathcore', 'Math Rock', 'Medieval Folk', 'Melodic Black Metal', 'Melodic Death Metal', 'Melodic Hardcore', 'Melodic Metalcore', 'Metal', 'Metalcore', 'Mexican Pop', 'Microhouse', 'Military Music', 'Minimal', 'Minimal Techno', 'Modern Classical', 'Modal Jazz', 'Motown', 'Neo-Classical', 'Neo-Classical Darkwave', 'Neo-Classical Metal', 'Neo-Folk', 'Neo-Psychedelia', 'Neo-Soul', 'Neofolk', 'New Age', 'New Jack Swing', 'New Romantic', 'New Wave', 'New Wave Pop', 'Noise', 'Nintendocore', 'Noise Pop', 'Noisecore', 'Nu Disco', 'Nu Gaze', 'Nu Jazz', 'Nu Metal', 'Oi!', 'Old School Hip Hop', 'Old-time Music', 'Opera', 'Outlaw Country', 'Outsider House', 'P-Funk', 'Pagan Black Metal', 'Pagan Metal', 'Paisley Pop', 'Pop', 'Pop Punk', 'Pop Rap', 'Pop Rock', 'Post-Britpop', 'Post-Grunge', 'Post-Hardcore', 'Post-Metal', 'Post-Punk', 'Post-Rock', 'Power Electronics', 'Power Metal', 'Power Pop', 'Progressive', 'Progressive Death Metal', 'Progressive Electronic', 'Progressive Folk', 'Progressive House', 'Progressive Metal', 'Progressive Rock', 'Psy-Trance', 'Psychedelic', 'Psychedelic Blues', 'Psychedelic Folk', 'Psychedelic Pop', 'Psychedelic Rock', 'Psychobilly', 'Punk', 'Punk Blues', 'Punk Folk', 'Punk Rock', 'Queercore', 'R&B', 'Ragga-Jungle', 'Raggaeton', 'Raggae', 'Ragtime', 'Rap', 'Rap Metal', 'Rap Rock', 'Rapcore', 'Rave', 'Reggae', 'Reggaeton', 'Regional Mexican', 'Retro Electro', 'Retro Rock', 'Riot Grrrl', 'Rock & Roll', 'Rockabilly', 'Rocksteady', 'Roots Reggae', 'Roots Rock', 'Russian Rap', 'Salsa', 'Sambas', 'Samba', 'Sanat Müziği', 'Schlager', 'Screamo', 'Shoegaze', 'Singer-Songwriter', 'Ska', 'Ska Punk', 'Skate Punk', 'Slowcore', 'Sludge Metal', 'Smooth Jazz', 'Soft Rock', 'Soul', 'Soul Funk', 'Soundtrack', 'Southern Rock', 'Southern Soul', 'Spanish Pop', 'Speed Garage', 'Speed Metal', 'Speedcore', 'Spoken Word', 'Stoner Rock', 'Straight Edge', 'Surf Rock', 'Swing', 'Synth-pop', 'Synthpop', 'Synthwave', 'T-Pop', 'Tamil Pop', 'Tech House', 'Technical Death Metal', 'Techno', 'Tejano', 'Terrorcore', 'Thai Pop', 'Thrash Metal', 'Third Stream', 'Timba', 'Traditional Blues', 'Traditional Celtic', 'Traditional Country', 'Traditional Folk', 'Traditional Irish', 'Trance', 'Trap', 'Trap Metal', 'Tribal House', 'Trip Hop', 'Turkish Pop', 'Turkish Rock', 'Turk Halk Müziği', 'Turk Sanat Müziği', 'UK Garage', 'UK Hip Hop', 'Underground Hip Hop', 'Urban Contemporary', 'V-Pop', 'Vallenato', 'Vaporwave', 'Viking Metal', 'Visual Kei', 'Vocal House', 'Vocal Trance', 'World', 'World Beat', 'World Fusion', 'World Music', 'Worship', 'Xmas', 'Yacht Rock', 'Yo-pop', 'Zouk'
  ];

  const [theme, setTheme] = useState('');
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [aiLayers, setAiLayers] = useState<GenerateLayeredOutputOutput | null>(null);
  const [moodsOpen, setMoodsOpen] = useState(false);
  const [genresOpen, setGenresOpen] = useState(false);


  const handlePromptChange = (id: number, field: string, value: any) => {
    setPromptLayers(prevLayers =>
      prevLayers.map(layer =>
        layer.id === id ? { ...layer, [field]: value } : layer
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

  const handleMoodSelect = (mood: string) => {
    setSelectedMoods(prev =>
      prev.includes(mood)
        ? prev.filter(m => m !== mood)
        : [...prev, mood]
    );
  };

  const handleGenreSelect = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast({
      title: "Copied to clipboard!",
    });
  };

  const handleCopyLayerClick = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
    });
  };


  return (
    <div className="flex flex-col space-y-4 w-full max-w-3xl">
      <Tabs defaultValue="suggestions" className="w-full"> {/* Default to suggestions */}
        <TabsList>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="prompt">Manual Prompts</TabsTrigger>
          <TabsTrigger value="presets">Presets</TabsTrigger>
        </TabsList>
        <TabsContent value="suggestions">
          <div className="grid gap-4 p-4"> {/* Added padding */}
            <div className="grid gap-2">
              <Label htmlFor="theme">Theme</Label>
              <Input
                id="theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="e.g., Underwater City, Cyberpunk Forest"
              />
            </div>

            {/* Mood Multi-Select using Popover */}
            <div className="grid gap-2">
              <Label>Moods</Label>
              <Popover open={moodsOpen} onOpenChange={setMoodsOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={moodsOpen}
                    className="w-full justify-between"
                  >
                    {selectedMoods.length > 0
                      ? `${selectedMoods.length} selected`
                      : "Select mood(s)..."}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                   <div className="p-2 max-h-60 overflow-y-auto"> {/* Scrollable div */}
                     {moodList.map((mood) => (
                       <div
                         key={mood}
                         className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md cursor-pointer"
                         onClick={() => handleMoodSelect(mood)}
                       >
                         <Checkbox
                           id={`mood-${mood}`}
                           checked={selectedMoods.includes(mood)}
                           onCheckedChange={() => handleMoodSelect(mood)}
                         />
                         <Label htmlFor={`mood-${mood}`} className="cursor-pointer">
                           {mood}
                         </Label>
                       </div>
                     ))}
                   </div>
                </PopoverContent>
              </Popover>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedMoods.map((mood) => (
                  <Badge key={mood} variant="secondary" className="cursor-pointer" onClick={() => handleMoodSelect(mood)}>
                    {mood} &times; {/* Add remove icon */}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Genre Multi-Select using Popover */}
            <div className="grid gap-2">
              <Label>Genres</Label>
              <Popover open={genresOpen} onOpenChange={setGenresOpen}>
                 <PopoverTrigger asChild>
                   <Button
                     variant="outline"
                     role="combobox"
                     aria-expanded={genresOpen}
                     className="w-full justify-between"
                   >
                     {selectedGenres.length > 0
                       ? `${selectedGenres.length} selected`
                       : "Select genre(s)..."}
                   </Button>
                 </PopoverTrigger>
                 <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                   <div className="p-2 max-h-60 overflow-y-auto"> {/* Scrollable div */}
                     {genreList.map((genre) => (
                       <div
                         key={genre}
                         className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md cursor-pointer"
                         onClick={() => handleGenreSelect(genre)}
                       >
                         <Checkbox
                           id={`genre-${genre}`}
                           checked={selectedGenres.includes(genre)}
                           onCheckedChange={() => handleGenreSelect(genre)}
                         />
                         <Label htmlFor={`genre-${genre}`} className="cursor-pointer">
                           {genre}
                         </Label>
                       </div>
                     ))}
                   </div>
                 </PopoverContent>
               </Popover>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedGenres.map((genre) => (
                   <Badge key={genre} variant="secondary" className="cursor-pointer" onClick={() => handleGenreSelect(genre)}>
                     {genre} &times; {/* Add remove icon */}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              onClick={async () => {
                if (!theme || selectedMoods.length === 0 || selectedGenres.length === 0) {
                  // Basic validation - ideally show a toast or message
                  console.warn("Please select theme, mood(s), and genre(s).");
                  toast({
                    title: "Please select a theme, mood(s), and genre(s). All are required.",
                  });
                  return;
                }
                const input: GenerateLayeredOutputInput = {
                  theme,
                  mood: selectedMoods.join(', '), // Join moods for the current AI function
                  genres: selectedGenres,
                };
                try {
                  console.log("generateLayeredOutput called with:", { theme, selectedMoods, selectedGenres });

                  const layers = await generateLayeredOutput(input);
                  setAiLayers(layers);

                  if (layers) {
                    // Update prompt layers based on AI suggestions
                    setPromptLayers([
                      { id: 1, prompt: layers.layer1Prompt, strength: 100, start: 0, end: 10 },
                      { id: 2, prompt: layers.layer2Prompt, strength: 100, start: 0, end: 10 },
                      { id: 3, prompt: layers.layer3Prompt, strength: 100, start: 0, end: 10 },
                    ]);
                  }

                } catch (error) {
                  console.error("Error generating AI layers:", error);
                  toast({
                    title: "Error generating AI layers.",
                    description: error instanceof Error ? error.stack : undefined,
                  });
                  // Handle error - maybe show a toast to the user
                }
              }}
              disabled={!theme || selectedMoods.length === 0 || selectedGenres.length === 0} // Disable if inputs missing
            >
              Generate AI Layers
            </Button>
            {aiLayers && (
              <Button variant="outline" size="sm" onClick={handleCopyClick}>
                <Icons.copy className="h-4 w-4 mr-2" /> Copy
              </Button>
            )}

            {/* Display Generated AI Layers */}
            {aiLayers && (
              <div className="grid gap-4 mt-4"> {/* Added margin top */}
                <h3 className="text-lg font-semibold">Generated Layer Suggestions:</h3> {/* Title */}
                <Card>
                  <CardHeader>
                    <CardTitle>Layer 1</CardTitle>
                    <CardDescription>Foundational layer</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea value={aiLayers.layer1Prompt} readOnly rows={4}/>
                     <Button variant="outline" size="sm" onClick={() => handleCopyLayerClick(aiLayers.layer1Prompt)}>
                        <Icons.copy className="h-4 w-4 mr-2" /> Copy Suggestions
                      </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Layer 2</CardTitle>
                    <CardDescription>Supporting layer</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea value={aiLayers.layer2Prompt} readOnly rows={4}/>
                     <Button variant="outline" size="sm" onClick={() => handleCopyLayerClick(aiLayers.layer2Prompt)}>
                        <Icons.copy className="h-4 w-4 mr-2" /> Copy Suggestions
                      </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Layer 3</CardTitle>
                    <CardDescription>Intricate layer</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea value={aiLayers.layer3Prompt} readOnly rows={4}/>
                    <Button variant="outline" size="sm" onClick={() => handleCopyLayerClick(aiLayers.layer3Prompt)}>
                      <Icons.copy className="h-4 w-4 mr-2" /> Copy Suggestions
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="prompt">
          {/* Display Prompt Layers for Manual Editing */}
          <div className="p-4 space-y-4"> {/* Added padding and spacing */}
            <h3 className="text-lg font-semibold">Edit Prompt Layers:</h3> {/* Title */}
             {promptLayers.map(layer => (
              <Card key={layer.id}>
                <CardHeader>
                  <CardTitle>Prompt Layer {layer.id}</CardTitle>
                  <CardDescription>Adjust prompt and settings for this layer.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor={`prompt-${layer.id}`}>Prompt</Label>
                    <Textarea
                      id={`prompt-${layer.id}`}
                      value={layer.prompt}
                      onChange={(e) => handlePromptChange(layer.id, 'prompt', e.target.value)}
                      rows={3} // Slightly smaller text area
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
                        max={100}
                        min={0}
                      />
                      <Slider
                        value={[layer.strength]} // Controlled component
                        max={100}
                        min={0}
                        step={1}
                        onValueChange={(value) => handlePromptChange(layer.id, 'strength', value[0])}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Time (seconds)</Label>
                      <div className="flex space-x-2">
                        <Input
                          type="number"
                          aria-label="Start time"
                          placeholder="Start"
                          value={layer.start}
                          onChange={(e) => handlePromptChange(layer.id, 'start', Number(e.target.value))}
                          min={0}
                        />
                        <Input
                          type="number"
                           aria-label="End time"
                          placeholder="End"
                           value={layer.end}
                           onChange={(e) => handlePromptChange(layer.id, 'end', Number(e.target.value))}
                           min={layer.start > 0 ? layer.start : 0} // End cannot be before start
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        </TabsContent>
        <TabsContent value="presets">
          <div className="p-4"> {/* Added padding */}
            <p>Preset management will be implemented here.</p>
            {/* Preset Management UI */}
          </div>
        </TabsContent>
      </Tabs>

      {/* Generate Final Combined Prompt Button */}
      <div className="p-4 border-t"> {/* Added padding and border */}
        <Button onClick={handleGeneratePrompt} className="w-full" disabled={promptLayers.some(p => !p.prompt)}> {/* Disable if any prompt is empty */}
          Generate Final Combined Prompt
        </Button>
        {generatedPrompt && (
          <Card className="mt-4"> {/* Added margin top */}
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Generated Combined Prompt</CardTitle>
              <Button variant="ghost" size="sm" onClick={handleCopyClick}>
                <Icons.copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </CardHeader>
            <CardDescription>This is the final prompt based on your layers. Use this for Riffusion.</CardDescription>
            <CardContent>
              <Textarea value={generatedPrompt} readOnly rows={4}/>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
