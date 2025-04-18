'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { generateLayeredOutput, GenerateLayeredOutputInput, GenerateLayeredOutputOutput } from '@/ai/flows/generate-layered-output';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";



export const RiffusionPromptComposer = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const { toast } = useToast();

  const moodList = [
    'Happy', 'Sad', 'Energetic', 'Calm', 'Romantic', 'Angry', 'Mysterious', 'Hopeful', 'Melancholic', 'Uplifting', 'Peaceful', 'Dark', 'Dreamy', 'Aggressive', 'Chill', 'Epic', 'Nostalgic', 'Anxious', 'Excited', 'Reflective', 'Funky', 'Groovy', 'Intense', 'Playful', 'Solemn'
  ];
  const genreList = [
    "Acid House", "Acid Jazz", "Action", "Afrobeat", "Afro House", "Afro Pop", "Afro Punk", "Aggrotech", "Alternative", "Alternative Country", "Alternative Dance", "Alternative Hip Hop", "Alternative Metal", "Alternative Rock", "Ambient", "Anarcho-punk", "Anime", "Arabic Pop", "Arena Rock", "Arpa", "Art Pop", "Art Rock", "Asia Pop", "Atmospheric Black Metal", "Atmospheric Drum and Bass", "Atmospheric Folk Black Metal", "Atmospheric Sludge Metal", "Audiobook", "Avant-Garde", "Avant-Garde Black Metal", "Avant-Garde Jazz", "Bachata", "Bachata Urbana", "Banda", "Baroque Pop", "Bass House", "Bass Music", "Bassline", "Bebop", "Big Band", "Black Metal", "Black Roll", "Bluegrass", "Blues", "Blues Rock", "Bollywood", "Bongo Flava", "Bossa Nova", "Breakbeat", "Breakcore", "Britpop", "Brostep", "Bubblegum Dance", "C-Pop", "Cantonese Pop", "Celtic", "Celtic Folk", "Celtic Punk", "Chill Hop", "Chill Trance", "Chillwave", "Chinese Hip Hop", "Chinese Pop", "Christian & Gospel", "Christian Alternative Rock", "Christian Metal", "Christian Pop", "Christian Rock", "Classic Blues", "Classic Country", "Classic Hip Hop", "Classic House", "Classic Rock", "Classical", "Club", "Comedy", "Complextro", "Contemporary Blues", "Contemporary Country", "Contemporary Folk", "Contemporary R&B", "Cool Jazz", "Country", "Country Blues", "Country Folk", "Country Pop", "Crunk", "Crust Punk", "Cybergrind", "Dance", "Dance-Pop", "Dance-Punk", "Dancehall", "Dark Ambient", "Dark Electro", "Dark Folk", "Dark Psytrance", "Darkwave", "Death Metal", "Deathcore", "Deep House", "Delta Blues", "Desert Rock", "Detroit Techno", "Digital Hardcore", "Disco", "Dixieland", "Djent", "Doom Metal", "Downtempo", "Dream Pop", "Drone", "Drum and Bass", "Dub", "Dub Techno", "Dubstep", "Dubstep Riddim", "Early Music", "East Coast Hip Hop", "Easy Listening", "EDM", "Electro", "Electro House", "Electro Pop", "Electro Rock", "Electronic", "Electronic Body Music", "Electronica", "Electropop", "Emo", "Enka", "Ethnic Electronica", "Europop", "Experimental", "Experimental Electronic", "Experimental Hip Hop", "Experimental Metal", "Fado", "Folk", "Folk Black Metal", "Folk Metal", "Folk Pop", "Folktronica", "Freak Folk", "Frenchcore", "Funk", "Funeral Doom Metal", "Funky House", "Fusion", "Gabber", "Gangsta Rap", "Garage", "Garage House", "Garage Rock", "German Hip Hop", "Glam Metal", "Glam Rock", "Glitch Hop", "Gospel", "Gothic Metal", "Gothic Rock", "Grime", "Grindcore", "Grunge", "Gypsy Jazz", "Happy Hardcore", "Hard Bop", "Hard House", "Hard Rock", "Hard Techno", "Hard Trance", "Hardcore", "Hardcore Hip Hop", "Hardcore Punk", "Hands Up", "Happy Punk", "Heavy Metal", "Hi-NRG", "Highlife", "Hip Hop", "Hip Hop Beats", "Holiday", "Honky Tonk", "House", "IDM", "Indian Pop", "Indie", "Indie Dance", "Indie Electronic", "Indie Folk", "Indie Pop", "Indie Rock", "Industrial", "Industrial Metal", "Industrial Rock", "Instrumental Hip Hop", "Instrumental Rock", "Intelligent Dance Music", "Irish Folk", "Italo Dance", "Italo Disco", "J-Pop", "J-Rock", "Jam Band", "Jazz", "Jazz Blues", "Jazz Fusion", "Jazz Funk", "Jazz Rap", "Jazz Rock", "Jungle", "K-Pop", "Kayokyoku", "Kizomba", "Krautrock", "Latin", "Latin Ballad", "Latin Hip Hop", "Latin Jazz", "Latin Pop", "Latin Rock", "Lo-Fi", "Lo-Fi Hip Hop", "Lounge", "Lowercase", "Madchester", "Mainstream Hip Hop", "Malaysian Pop", "Mambo", "Manele", "Maringue", "Mathcore", "Math Rock", "Medieval Folk", "Melodic Black Metal", "Melodic Death Metal", "Melodic Hardcore", "Melodic Metalcore", "Metal", "Metalcore", "Mexican Pop", "Microhouse", "Military Music", "Minimal", "Minimal Techno", "Modern Classical", "Modal Jazz", "Motown", "Neo-Classical", "Neo-Classical Darkwave", "Neo-Classical Metal", "Neo-Folk", "Neo-Psychedelia", "Neo-Soul", "Neofolk", "New Age", "New Jack Swing", "New Romantic", "New Wave", "New Wave Pop", "Noise", "Nintendocore", "Noise Pop", "Noisecore", "Nu Disco", "Nu Gaze", "Nu Jazz", "Nu Metal", "Oi!", "Old School Hip Hop", "Old-time Music", "Opera", "Outlaw Country", "Outsider House", "P-Funk", "Pagan Black Metal", "Pagan Metal", "Paisley Pop", "Pop", "Pop Punk", "Pop Rap", "Pop Rock", "Post-Britpop", "Post-Grunge", "Post-Hardcore", "Post-Metal", "Post-Punk", "Post-Rock", "Power Electronics", "Power Metal", "Power Pop", "Progressive", "Progressive Death Metal", "Progressive Electronic", "Progressive Folk", "Progressive House", "Progressive Metal", "Progressive Rock", "Psy-Trance", "Psychedelic", "Psychedelic Blues", "Psychedelic Folk", "Psychedelic Pop", "Psychedelic Rock", "Psychobilly", "Punk", "Punk Blues", "Punk Folk", "Punk Rock", "Queercore", "R&B", "Ragga-Jungle", "Raggaeton", "Raggae", "Ragtime", "Rap", "Rap Metal", "Rap Rock", "Rapcore", "Rave", "Reggae", "Reggaeton", "Regional Mexican", "Retro Electro", "Retro Rock", "Riot Grrrl", "Rock & Roll", "Rockabilly", "Rocksteady", "Roots Reggae", "Roots Rock", "Russian Rap", "Salsa", "Sambas", "Samba", "Sanat Müziği", "Schlager", "Screamo", "Shoegaze", "Singer-Songwriter", "Ska", "Ska Punk", "Skate Punk", "Slowcore", "Sludge Metal", "Smooth Jazz", "Soft Rock", "Soul", "Soul Funk", "Soundtrack", "Southern Rock", "Southern Soul", "Spanish Pop", "Speed Garage", "Speed Metal", "Speedcore", "Spoken Word", "Stoner Rock", "Straight Edge", "Surf Rock", "Swing", "Synth-pop", "Synthpop", "Synthwave", "T-Pop", "Tamil Pop", "Tech House", "Technical Death Metal", "Techno", "Tejano", "Terrorcore", "Thai Pop", "Thrash Metal", "Third Stream", "Timba", "Traditional Blues", "Traditional Celtic", "Traditional Country", "Traditional Folk", "Traditional Irish", "Trance", "Trap", "Trap Metal", "Tribal House", "Trip Hop", "Turkish Pop", "Turkish Rock", "Turk Halk Müziği", "Turk Sanat Müziği", "UK Garage", "UK Hip Hop", "Underground Hip Hop", "Urban Contemporary", "V-Pop", "Vallenato", "Vaporwave", "Viking Metal", "Visual Kei", "Vocal House", "Vocal Trance", "World", "World Beat", "World Fusion", "World Music", "Worship", "Xmas", "Yacht Rock", "Yo-pop", "Zouk"
  ];

  const [theme, setTheme] = useState('');
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [aiLayers, setAiLayers] = useState<GenerateLayeredOutputOutput | null>(null);
  const [moodsOpen, setMoodsOpen] = useState(false);
  const [genresOpen, setGenresOpen] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const handleGenerateRiffusionPrompt = () => {
    if (!aiLayers) {
       toast({
         title: "No AI suggestions available.",
         description: "Please generate suggestions first.",
         variant: "destructive",
       });
       return;
    }
    // Extract keywords from each layer and join them with commas
    const combinedPrompt = [
        aiLayers.layer1Prompt,
        aiLayers.layer2Prompt,
        aiLayers.layer3Prompt
    ].filter(p => p)
     .map(prompt => {
         // Basic keyword extraction (split by spaces and commas)
         const keywords = prompt.split(/[,\s]+/).filter(Boolean);
         return keywords.join(', ');
     })
    .join(', ');

    setGeneratedPrompt(combinedPrompt);
     toast({
       title: "Riffusion prompt generated!",
       description: "Ready to be copied.",
     });
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
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    toast({
      title: "Copied combined prompt to clipboard!",
    });
  };

  const handleCopyLayerClick = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied layer suggestion to clipboard!",
    });
  };

  const handleAISuggestion = async () => {
    if (!theme || selectedMoods.length === 0 || selectedGenres.length === 0) {
      toast({
        title: "Input missing",
        description: "Please provide a theme, at least one mood, and at least one genre.",
        variant: "warning",
      });
      return;
    }
    setIsSuggesting(true);
    setAiLayers(null);
    setGeneratedPrompt('');
    const input: GenerateLayeredOutputInput = {
      theme,
      mood: selectedMoods.join(', '),
      genres: selectedGenres,
    };
    try {
      console.log("Calling generateLayeredOutput with:", input);
      const layers = await generateLayeredOutput(input);
      setAiLayers(layers);
      toast({
        title: "AI Suggestions Generated!",
      });
       console.log("Received layers:", layers);
    } catch (error) {
      console.error("Error generating AI layers:", error);
      toast({
        title: "Error Generating Suggestions",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
       setAiLayers(null);
    } finally {
       setIsSuggesting(false);
    }
  };


  return (
    <div className="flex flex-col space-y-4 w-full max-w-3xl">
      <div className="grid gap-4 p-4 border rounded-md">
        <h2 className="text-xl font-semibold mb-2">Generate Prompt Suggestions</h2>
        <div className="grid gap-2">
          <Label htmlFor="theme">Theme</Label>
          <Input
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="e.g., Underwater City, Cyberpunk Forest"
            disabled={isSuggesting}
          />
        </div>

        {/* Mood Multi-Select */}
        <div className="grid gap-2">
          <Label>Moods</Label>
          <Popover open={moodsOpen} onOpenChange={setMoodsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={moodsOpen}
                className="w-full justify-between"
                 disabled={isSuggesting}
              >
                {selectedMoods.length > 0
                  ? `${selectedMoods.length} selected`
                  : "Select mood(s)..."}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
               <div className="p-2 max-h-60 overflow-y-auto">
                 {moodList.map((mood) => (
                   <div
                     key={mood}
                     className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md cursor-pointer"
                     onClick={() => !isSuggesting && handleMoodSelect(mood)}
                   >
                     <Checkbox
                       id={`mood-${mood}`}
                       checked={selectedMoods.includes(mood)}
                       onCheckedChange={() => handleMoodSelect(mood)}
                       disabled={isSuggesting}
                     />
                     <Label htmlFor={`mood-${mood}`} className={`cursor-pointer ${isSuggesting ? 'text-muted-foreground' : ''}`}>
                       {mood}
                     </Label>
                   </div>
                 ))}
               </div>
            </PopoverContent>
          </Popover>
          <div className="flex flex-wrap gap-1 mt-1">
            {selectedMoods.map((mood) => (
              <Badge key={mood} variant="secondary" className="cursor-pointer" onClick={() => !isSuggesting && handleMoodSelect(mood)}>
                {mood} &times;
              </Badge>
            ))}
          </div>
        </div>

        {/* Genre Multi-Select */}
        <div className="grid gap-2">
          <Label>Genres</Label>
          <Popover open={genresOpen} onOpenChange={setGenresOpen}>
             <PopoverTrigger asChild>
               <Button
                 variant="outline"
                 role="combobox"
                 aria-expanded={genresOpen}
                 className="w-full justify-between"
                 disabled={isSuggesting}
               >
                 {selectedGenres.length > 0
                   ? `${selectedGenres.length} selected`
                   : "Select genre(s)..."}
               </Button>
             </PopoverTrigger>
             <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
               <div className="p-2 max-h-60 overflow-y-auto">
                 {genreList.map((genre) => (
                   <div
                     key={genre}
                     className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md cursor-pointer"
                     onClick={() => !isSuggesting && handleGenreSelect(genre)}
                   >
                     <Checkbox
                       id={`genre-${genre}`}
                       checked={selectedGenres.includes(genre)}
                       onCheckedChange={() => handleGenreSelect(genre)}
                       disabled={isSuggesting}
                     />
                     <Label htmlFor={`genre-${genre}`} className={`cursor-pointer ${isSuggesting ? 'text-muted-foreground' : ''}`}>
                       {genre}
                     </Label>
                   </div>
                 ))}
               </div>
             </PopoverContent>
           </Popover>
          <div className="flex flex-wrap gap-1 mt-1">
            {selectedGenres.map((genre) => (
               <Badge key={genre} variant="secondary" className="cursor-pointer" onClick={() => !isSuggesting && handleGenreSelect(genre)}>
                 {genre} &times;
              </Badge>
            ))}
          </div>
        </div>

        {/* Button to trigger AI suggestion */}
        <Button
          onClick={handleAISuggestion}
          disabled={!theme || selectedMoods.length === 0 || selectedGenres.length === 0 || isSuggesting}
        >
         {isSuggesting ? <><Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> Suggesting...</> : "Suggest Prompt Layers"}
        </Button>

        {/* Display Generated AI Layers */}
        {aiLayers && !isSuggesting && (
          <div className="grid gap-4 mt-4 border-t pt-4">
            <h3 className="text-lg font-semibold">Generated Layer Suggestions:</h3>
             {[
                { title: "Layer 1 (Foundational)", prompt: aiLayers.layer1Prompt },
                { title: "Layer 2 (Supporting)", prompt: aiLayers.layer2Prompt },
                { title: "Layer 3 (Intricate)", prompt: aiLayers.layer3Prompt },
             ].map((layer, index) => layer.prompt && (
                 <Card key={index}>
                   <CardHeader className="pb-2 pt-4">
                     <div className="flex justify-between items-center">
                        <CardTitle className="text-base">{layer.title}</CardTitle>
                         <Button variant="outline" size="sm" onClick={() => handleCopyLayerClick(layer.prompt)}>
                            <Icons.copy className="h-3 w-3 mr-1" /> Copy
                         </Button>
                     </div>
                   </CardHeader>
                   <CardContent>
                     <p className="text-sm text-muted-foreground">{layer.prompt}</p>
                   </CardContent>
                 </Card>
             ))}
          </div>
        )}
      </div>

      <div className="p-4 border rounded-md mt-4">
        <h2 className="text-xl font-semibold mb-2">Generate Final Prompt</h2>
        <Button
           onClick={handleGenerateRiffusionPrompt}
           className="w-full"
           disabled={!aiLayers || isSuggesting}
        >
          Generate Riffusion Prompt
        </Button>
        {generatedPrompt && (
          <Card className="mt-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base">Final Combined Prompt</CardTitle>
              <Button variant="ghost" size="sm" onClick={handleCopyClick} disabled={!generatedPrompt}>
                <Icons.copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </CardHeader>
            <CardContent>
              <Textarea value={generatedPrompt} readOnly rows={4}/>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
