'use client';

import React, {useState, useEffect, useRef} from 'react';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Input} from '@/components/ui/input';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {
  generateLayeredOutput,
  GenerateLayeredOutputInput,
  GenerateLayeredOutputOutput,
} from '@/ai/flows/generate-layered-output';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Badge} from '@/components/ui/badge';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Checkbox} from '@/components/ui/checkbox';
import {Icons} from '@/components/icons';
import {useToast} from '@/hooks/use-toast';
import {ScrollArea} from "@/components/ui/scroll-area";
import { generateLyrics, GenerateLyricsInput, GenerateLyricsOutput } from '@/ai/flows/generate-lyrics';

const moodList = [
  "Upbeat", "Catchy", "Radiant", "Anthemic", "Danceable", "Bubble-gum", "Hopeful", "Vulnerable", "Lonely",
  "Rebellious", "Gritty", "Driving", "Raw", "Defiant", "Anxious", "Resolute", "Smooth", "Sultry",
  "Sophisticated", "Improvisational", "Laid-back", "Swinging", "Majestic", "Serene", "Dramatic", "Contemplative",
  "Pastoral", "Romantic", "Futuristic", "Hypnotic", "Trippy", "Aggressive", "Fierce", "Intense",
  "Brooding", "Epic", "Technical", "Meditative", "Ethereal", "Spacious", "Minimalistic", "Transcendental",
  "Organic", "Groovy", "Uplifting", "I-rie", "Skanking", "Earthy", "Earnest", "Wistful",
  "Acoustic", "Storytelling", "Happy", "Cheerful", "Joyful", "Bright", "Sunny", "Optimistic",
  "Playful", "Energetic", "Excited", "Triumphant", "Empowering", "Motivational", "Pounding", "Sad",
  "Melancholic", "Sorrowful", "Mournful", "Heartbreaking", "Pensive", "Desolate", "Calm", "Peaceful",
  "Dreamy", "Chill", "Mellow", "Soothing", "Tender", "Intimate", "Sensual", "Passionate",
  "Dark", "Ominous", "Suspenseful", "Tense", "Foreboding", "Eerie", "Haunting", "Spiritual",
  "Transcendent", "Mystical", "Worshipful", "Reflective", "Introspective", "Thoughtful", "Philosophical", "Yearning",
  "Vintage", "Retro", "Whimsical", "Quirky", "Humorous", "Fun", "Cinematic", "Grand",
  "Heroic", "Monumental", "Funky", "Jazzy", "Atmospheric", "Ambient", "Spacey", "Brutal",
  "Innocent", "Childlike", "Naïve", "Euphoric", "Blissful", "Lighthearted", "Jovial", "Exuberant",
  "Lively", "Enthusiastic", "Inspirational", "Confident", "Victorious", "Proud", "Celebratory", "Festive",
  "Loving", "Affectionate", "Sexy", "Sentimental", "Warm", "Cozy", "Relaxing", "Tranquil",
  "Mysterious", "Enigmatic", "Nervous", "Apprehensive", "Fearful", "Scary", "Grieving", "Heartbroken",
  "Despairing", "Depressed", "Gloomy", "Bleak", "Isolated", "Alienated", "Bittersweet", "Poignant",
  "Tragic", "Angry", "Hostile", "Resentful", "Frustrated", "Irritated", "Bitter", "Cynical",
  "Sarcastic", "Sardonic", "Powerful", "Dynamic", "Ambiguous", "Complex", "Conflicted", "Confused",
  "Uncertain", "Ambivalent", "Fragile", "Delicate", "Somber", "Grave", "Serious", "Solemn",
  "Heavy", "Weighty", "Profound", "Deep", "Thought-provoking", "Intellectual", "Cerebral", "Pure",
  "Simple", "Guileless", "Trusting", "Open", "Honest", "Sincere", "Direct", "Uncomplicated",
  "Clear", "Lucid", "Refreshing", "Revitalizing", "Invigorating", "Stimulating", "Thrilling", "Exhilarating",
  "Electrifying", "Animated", "Sprightly", "Peppy", "Bouncy", "Trance-inducing", "Evocative", "Suggestive",
  "Imaginative", "Cathartic", "Therapeutic", "Healing", "Comforting", "Nurturing", "Gentle", "Soft",
  "Longing", "Retrospective", "Forward-looking", "Humble", "Modest", "Unassuming"
];

export const RiffusionPromptComposer = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const {toast} = useToast();

  const genreList = [
    'Acid House', 'Acid Jazz', 'Action', 'Afrobeat', 'Afro House', 'Afro Pop', 'Afro Punk', 'Aggrotech', 'Alternative', 'Alternative Country', 'Alternative Dance', 'Alternative Hip Hop', 'Alternative Metal', 'Alternative Rock', 'Ambient', 'Anarcho-punk', 'Anime', 'Arabic Pop', 'Arena Rock', 'Arpa', 'Art Pop', 'Art Rock', 'Asia Pop', 'Atmospheric Black Metal', 'Atmospheric Drum and Bass', 'Atmospheric Folk Black Metal', 'Atmospheric Sludge Metal', 'Audiobook', 'Avant-Garde', 'Avant-Garde Black Metal', 'Avant-Garde Jazz', 'Bachata', 'Bachata Urbana', 'Banda', 'Baroque Pop', 'Bass House', 'Bass Music', 'Bassline', 'Bebop', 'Big Band', 'Black Metal', 'Black Roll', 'Bluegrass', 'Blues', 'Blues Rock', 'Bollywood', 'Bongo Flava', 'Bossa Nova', 'Breakbeat', 'Breakcore', 'Britpop', 'Brostep', 'Bubblegum Dance', 'C-Pop', 'Cantonese Pop', 'Celtic', 'Celtic Folk', 'Celtic Punk', 'Chill Hop', 'Chill Trance', 'Chillwave', 'Chinese Hip Hop', 'Chinese Pop', 'Christian & Gospel', 'Christian Alternative Rock', 'Christian Metal', 'Christian Pop', 'Christian Rock', 'Classic Blues', 'Classic Country', 'Classic Hip Hop', 'Classic House', 'Classic Rock', 'Classical', 'Club', 'Comedy', 'Complextro', 'Contemporary Blues', 'Contemporary Country', 'Contemporary Folk', 'Contemporary R&B', 'Cool Jazz', 'Country', 'Country Blues', 'Country Folk', 'Country Pop', 'Crunk', 'Crust Punk', 'Cybergrind', 'Dance', 'Dance-Pop', 'Dance-Punk', 'Dancehall', 'Dark Ambient', 'Dark Electro', 'Dark Folk', 'Dark Psytrance', 'Darkwave', 'Death Metal', 'Deathcore', 'Deep House', 'Delta Blues', 'Desert Rock', 'Detroit Techno', 'Digital Hardcore', 'Disco', 'Dixieland', 'Djent', 'Doom Metal', 'Downtempo', 'Dream Pop', 'Drone', 'Drum and Bass', 'Dub', 'Dub Techno', 'Dubstep', 'Dubstep Riddim', 'Early Music', 'East Coast Hip Hop', 'Easy Listening', 'EDM', 'Electro', 'Electro House', 'Electro Pop', 'Electro Rock', 'Electronic', 'Electronic Body Music', 'Electronica', 'Electropop', 'Emo', 'Enka', 'Ethnic Electronica', 'Europop', 'Experimental', 'Experimental Electronic', 'Experimental Hip Hop', 'Experimental Metal', 'Fado', 'Folk', 'Folk Black Metal', 'Folk Metal', 'Folk Pop', 'Folktronica', 'Freak Folk', 'Frenchcore', 'Funk', 'Funeral Doom Metal', 'Funky House', 'Fusion', 'Gabber', 'Gangsta Rap', 'Garage', 'Garage House', 'Garage Rock', 'German Hip Hop', 'Glam Metal', 'Glam Rock', 'Glitch Hop', 'Gospel', 'Gothic Metal', 'Gothic Rock', 'Grime', 'Grindcore', 'Grunge', 'Gypsy Jazz', 'Happy Hardcore', 'Hard Bop', 'Hard House', 'Hard Rock', 'Hard Techno', 'Hard Trance', 'Hardcore', 'Hardcore Hip Hop', 'Hardcore Punk', 'Hands Up', 'Happy Punk', 'Heavy Metal', 'Hi-NRG', 'Highlife', 'Hip Hop', 'Hip Hop Beats', 'Holiday', 'Honky Tonk', 'House', 'IDM', 'Indian Pop', 'Indie', 'Indie Dance', 'Indie Electronic', 'Indie Folk', 'Indie Pop', 'Indie Rock', 'Industrial', 'Industrial Metal', 'Industrial Rock', 'Instrumental Hip Hop', 'Instrumental Rock', 'Intelligent Dance Music', 'Irish Folk', 'Italo Dance', 'Italo Disco', 'J-Pop', 'J-Rock', 'Jam Band', 'Jazz', 'Jazz Blues', 'Jazz Fusion', 'Jazz Funk', 'Jazz Rap', 'Jazz Rock', 'Jungle', 'K-Pop', 'Kayokyoku', 'Kizomba', 'Krautrock', 'Latin', 'Latin Ballad', 'Latin Hip Hop', 'Latin Jazz', 'Latin Pop', 'Latin Rock', 'Lo-Fi', 'Lo-Fi Hip Hop', 'Lounge', 'Lowercase', 'Madchester', 'Mainstream Hip Hop', 'Malaysian Pop', 'Mambo', 'Manele', 'Maringue', 'Mathcore', 'Math Rock', 'Medieval Folk', 'Melodic Black Metal', 'Melodic Death Metal', 'Melodic Hardcore', 'Melodic Metalcore', 'Metal', 'Metalcore', 'Mexican Pop', 'Microhouse', 'Military Music', 'Minimal', 'Minimal Techno', 'Modern Classical', 'Modal Jazz', 'Motown', 'Neo-Classical', 'Neo-Classical Darkwave', 'Neo-Classical Metal', 'Neo-Folk', 'Neo-Psychedelia', 'Neo-Soul', 'Neofolk', 'New Age', 'New Jack Swing', 'New Romantic', 'New Wave', 'New Wave Pop', 'Noise', 'Nintendocore', 'Noise Pop', 'Noisecore', 'Nu Disco', 'Nu Gaze', 'Nu Jazz', 'Nu Metal', 'Oi!', 'Old School Hip Hop', 'Old-time Music', 'Opera', 'Outlaw Country', 'Outsider House', 'P-Funk', 'Pagan Black Metal', 'Pagan Metal', 'Paisley Pop', 'Pop', 'Pop Punk', 'Pop Rap', 'Pop Rock', 'Post-Britpop', 'Post-Grunge', 'Post-Hardcore', 'Post-Metal', 'Post-Punk', 'Post-Rock', 'Power Electronics', 'Power Metal', 'Power Pop', 'Progressive', 'Progressive Death Metal', 'Progressive Electronic', 'Progressive Folk', 'Progressive House', 'Progressive Metal', 'Progressive Rock', 'Psy-Trance', 'Psychedelic', 'Psychedelic Blues', 'Psychedelic Folk', 'Psychedelic Pop', 'Psychedelic Rock', 'Psychobilly', 'Punk', 'Punk Blues', 'Punk Folk', 'Punk Rock', 'Queercore', 'R&B', 'Ragga-Jungle', 'Raggaeton', 'Raggae', 'Ragtime', 'Rap', 'Rap Metal', 'Rap Rock', 'Rapcore', 'Rave', 'Reggae', 'Reggaeton', 'Regional Mexican', 'Retro Electro', 'Retro Rock', 'Riot Grrrl', 'Rock & Roll', 'Rockabilly', 'Rocksteady', 'Roots Reggae', 'Roots Rock', 'Russian Rap', 'Salsa', 'Sambas', 'Samba', 'Sanat Müziği', 'Schlager', 'Screamo', 'Shoegaze', 'Singer-Songwriter', 'Ska', 'Ska Punk', 'Skate Punk', 'Slowcore', 'Sludge Metal', 'Smooth Jazz', 'Soft Rock', 'Soul', 'Soul Funk', 'Soundtrack', 'Southern Rock', 'Southern Soul', 'Spanish Pop', 'Speed Garage', 'Speed Metal', 'Speedcore', 'Spoken Word', 'Stoner Rock', 'Straight Edge', 'Surf Rock', 'Swing', 'Synth-pop', 'Synthpop', 'Synthwave', 'T-Pop', 'Tamil Pop', 'Tech House', 'Technical Death Metal', 'Techno', 'Tejano', 'Terrorcore', 'Thai Pop', 'Thrash Metal', 'Third Stream', 'Timba', 'Traditional Blues', 'Traditional Celtic', 'Traditional Country', 'Traditional Folk', 'Traditional Irish', 'Trance', 'Trap', 'Trap Metal', 'Tribal House', 'Trip Hop', 'Turkish Pop', 'Turkish Rock', 'Turk Halk Müziği', 'Turk Sanat Müziği', 'UK Garage', 'UK Hip Hop', 'Underground Hip Hop', 'Urban Contemporary', 'V-Pop', 'Vallenato', 'Vaporwave', 'Viking Metal', 'Visual Kei', 'Vocal House', 'Vocal Trance', 'World', 'World Beat', 'World Fusion', 'World Music', 'Worship', 'Xmas', 'Yacht Rock', 'Yo-pop', 'Zouk'
  ];

  const [theme, setTheme] = useState('');
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [aiLayers, setAiLayers] = useState<GenerateLayeredOutputOutput | null>(null);
  const [moodsOpen, setMoodsOpen] = useState(false);
  const [genresOpen, setGenresOpen] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [lyrics, setLyrics] = useState<string | null>(null);
  const [isGeneratingLyrics, setIsGeneratingLyrics] = useState(false);
  const [moodSearchTerm, setMoodSearchTerm] = useState('');
  const [genreSearchTerm, setGenreSearchTerm] = useState('');

  const handleGenerateRiffusionPrompt = () => {
    if (!aiLayers) {
      toast({
        title: 'No AI suggestions available.',
        description: 'Please generate suggestions first.',
        variant: 'destructive',
      });
      return;
    }

    // Define stop words to exclude from keywords
    const stopWords = new Set([
      'the',
      'a',
      'an',
      'is',
      'are',
      'was',
      'were',
      'be',
      'been',
      'being',
      'of',
      'with',
      'and',
      'or',
      'but',
      'in',
      'on',
      'at',
      'to',
      'from',
      'by',
      'for',
      'about',
      'above',
      'below',
      'than',
      'then',
      'since',
      'before',
      'after',
      'during',
      'without',
      'under',
      'over',
      'between',
      'among',
      'through',
      'into',
      'onto',
      'as',
      'like',
      'that',
      'which',
      'who',
      'whom',
      'this',
      'these',
      'those',
      'it',
      'its',
      'he',
      'she',
      'him',
      'her',
      'his',
      'hers',
      'we',
      'us',
      'our',
      'ours',
      'you',
      'your',
      'yours',
      'they',
      'them',
      'their',
      'theirs',
    ]);

    // Extract keywords from each layer, filter out stop words, and join them with commas
    const combinedPrompt = [aiLayers.layer1Prompt, aiLayers.layer2Prompt, aiLayers.layer3Prompt]
      .filter(p => p)
      .map(prompt => {
        // Basic keyword extraction (split by spaces and commas)
        const keywords = prompt
          .split(/[,\s]+/)
          .filter(word => word.length > 2 && !stopWords.has(word.toLowerCase())) // Filter out short and stop words
          .filter(Boolean);
        return keywords.join(', ');
      })
      .join(', ');

    setGeneratedPrompt(combinedPrompt);
    toast({
      title: 'Riffusion prompt generated!',
      description: 'Ready to be copied.',
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
      title: 'Copied combined prompt to clipboard!',
    });
  };

  const handleCopyLayerClick = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied layer suggestion to clipboard!',
    });
  };

  const handleAISuggestion = async () => {
    if (!theme || selectedMoods.length === 0 || selectedGenres.length === 0) {
      toast({
        title: 'Input missing',
        description: 'Please provide a theme, at least one mood, and at least one genre.',
        variant: 'warning',
      });
      return;
    }
    setIsSuggesting(true);
    setAiLayers(null);
    setGeneratedPrompt('');
    setLyrics(null);
    const input: GenerateLayeredOutputInput = {
      theme,
      mood: selectedMoods.join(', '),
      genres: selectedGenres,
    };
    try {
      console.log('Calling generateLayeredOutput with:', input);
      const layers = await generateLayeredOutput(input);
      setAiLayers(layers);
      toast({
        title: 'AI Suggestions Generated!',
      });
      console.log('Received layers:', layers);
    } catch (error) {
      console.error('Error generating AI layers:', error);
      toast({
        title: 'Error Generating Suggestions',
        description: error instanceof Error ? error.message : 'An unknown error occurred.',
        variant: 'destructive',
      });
      setAiLayers(null);
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleGenerateLyrics = async () => {
    if (!theme || selectedMoods.length === 0 || selectedGenres.length === 0) {
      toast({
        title: 'Input missing',
        description: 'Please provide a theme, at least one mood, and at least one genre.',
        variant: 'warning',
      });
      return;
    }
    setIsGeneratingLyrics(true);
    setLyrics(null);

    const input: GenerateLyricsInput = {
      theme,
      mood: selectedMoods,
      genre: selectedGenres,
    };

    try {
      const lyricsResult = await generateLyrics(input);
      setLyrics(lyricsResult.lyrics);
      toast({
        title: 'Lyrics Generated!',
      });
    } catch (error) {
      console.error('Error generating lyrics:', error);
      toast({
        title: 'Error Generating Lyrics',
        description: error instanceof Error ? error.message : 'An unknown error occurred.',
        variant: 'destructive',
      });
      setLyrics(null);
    } finally {
      setIsGeneratingLyrics(false);
    }
  };

  const handleCopyLyricsClick = () => {
    if (!lyrics) return;
    navigator.clipboard.writeText(lyrics);
    toast({
      title: 'Copied lyrics to clipboard!',
    });
  };

  const filteredMoodList = moodList.filter(mood =>
    mood.toLowerCase().includes(moodSearchTerm.toLowerCase())
  );

  const filteredGenreList = genreList.filter(genre =>
    genre.toLowerCase().includes(genreSearchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col space-y-4 w-full max-w-3xl">
      <div className="grid gap-4 p-4 border rounded-md">
        <h2 className="text-xl font-semibold mb-2">Generate Prompt Suggestions</h2>
        <div className="grid gap-2">
          <Label htmlFor="theme">Theme</Label>
          <Input
            id="theme"
            value={theme}
            onChange={e => setTheme(e.target.value)}
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
                type="button"
                aria-haspopup="dialog"
              >
                {selectedMoods.length > 0
                  ? `${selectedMoods.length} selected`
                  : 'Select mood(s)...'}
                <Icons.chevronDown className="h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <Input
                placeholder="Search moods..."
                value={moodSearchTerm}
                onChange={(e) => setMoodSearchTerm(e.target.value)}
                className="mb-2"
              />
              <ScrollArea className="h-72 w-full">
                <div className="p-2">
                  {filteredMoodList.map(mood => (
                    <div key={mood} className="flex items-center p-1">
                      <Checkbox
                        id={`mood-${mood}`}
                        checked={selectedMoods.includes(mood)}
                        onCheckedChange={() => handleMoodSelect(mood)}
                        disabled={isSuggesting}
                      />
                      <Label
                        htmlFor={`mood-${mood}`}
                        className={`cursor-pointer ${isSuggesting ? 'text-muted-foreground' : ''}`}
                      >
                        {mood}
                      </Label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
          {selectedMoods.map(mood => (
            <Badge key={mood} variant="secondary">
              {mood} &times;
            </Badge>
          ))}
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
                type="button"
                aria-haspopup="dialog"
              >
                {selectedGenres.length > 0
                  ? `${selectedGenres.length} selected`
                  : 'Select genre(s)...'}
                <Icons.chevronDown className="h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <Input
                placeholder="Search genres..."
                value={genreSearchTerm}
                onChange={(e) => setGenreSearchTerm(e.target.value)}
                className="mb-2"
              />
              <ScrollArea className="h-72 w-full">
                <div className="p-2">
                  {filteredGenreList.map(genre => (
                    <div key={genre} className="flex items-center p-1">
                      <Checkbox
                        id={`genre-${genre}`}
                        checked={selectedGenres.includes(genre)}
                        onCheckedChange={() => handleGenreSelect(genre)}
                        disabled={isSuggesting}
                      />
                      <Label
                        htmlFor={`genre-${genre}`}
                        className={`cursor-pointer ${isSuggesting ? 'text-muted-foreground' : ''}`}
                      >
                        {genre}
                      </Label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
          {selectedGenres.map(genre => (
            <Badge key={genre} variant="secondary">
              {genre} &times;
            </Badge>
          ))}
        </div>

        {/* Button to trigger AI suggestion */}
        <Button
          onClick={handleAISuggestion}
          disabled={!theme || selectedMoods.length === 0 || selectedGenres.length === 0 || isSuggesting}
        >
          {isSuggesting ? (
            <>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Suggesting...
            </>
          ) : (
            'Suggest Prompt Layers'
          )}
        </Button>

        {/* Display Generated AI Layers */}
        {aiLayers && !isSuggesting && (
          <>
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>
                  Generated Layer Suggestions:
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {title: 'Layer 1 (Foundational)', prompt: aiLayers.layer1Prompt},
                  {title: 'Layer 2 (Supporting)', prompt: aiLayers.layer2Prompt},
                  {title: 'Layer 3 (Intricate)', prompt: aiLayers.layer3Prompt},
                ].map((layer, index) => layer.prompt && (
                    <div key={index} className="grid gap-2">
                      <div className="flex justify-between items-center">
                        <Label>{layer.title}</Label>
                        <Button onClick={() => handleCopyLayerClick(layer.prompt)} size="sm" className="ml-2">
                          Copy
                        </Button>
                      </div>
                      <Textarea readOnly value={layer.prompt} className="min-h-[80px]" />
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Lyrics Generation UI */}
            <LyricsCard
              theme={theme}
              selectedMoods={selectedMoods}
              selectedGenres={selectedGenres}
              lyrics={lyrics}
              isGeneratingLyrics={isGeneratingLyrics}
              handleGenerateLyrics={handleGenerateLyrics}
              handleCopyLyricsClick={handleCopyLyricsClick} // Pass the copy lyrics function
            />
          </>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Generate Final Prompt
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            onClick={handleGenerateRiffusionPrompt}
            className="w-full"
            disabled={!aiLayers || isSuggesting}
          >
            Generate Riffusion Prompt
          </Button>
          {generatedPrompt && (
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label>Final Combined Prompt</Label>
                <Button onClick={handleCopyClick} size="sm" className="ml-2">
                  Copy
                </Button>
              </div>
              <Textarea readOnly value={generatedPrompt} className="min-h-[80px]" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

interface LyricsCardProps {
  theme: string;
  selectedMoods: string[];
  selectedGenres: string[];
  lyrics: string | null;
  isGeneratingLyrics: boolean;
  handleGenerateLyrics: () => Promise<void>;
  handleCopyLyricsClick: () => void; // Add the copy lyrics function to the props
}

const LyricsCard: React.FC<LyricsCardProps> = ({
  theme,
  selectedMoods,
  selectedGenres,
  lyrics,
  isGeneratingLyrics,
  handleGenerateLyrics,
  handleCopyLyricsClick, // Destructure it
}) => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>
          Generate Lyrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handleGenerateLyrics}
          className="w-full"
          disabled={!theme || selectedMoods.length === 0 || selectedGenres.length === 0 || isGeneratingLyrics}
        >
          {isGeneratingLyrics ? (
            <>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Generating Lyrics...
            </>
          ) : (
            'Generate Lyrics'
          )}
        </Button>
        {lyrics && (
          <div className="grid gap-2 mt-4">
            <div className="flex justify-between items-center">
              <Label>Generated Lyrics</Label>
              <Button onClick={handleCopyLyricsClick} size="sm" className="ml-2">
                Copy
              </Button>
            </div>
            <Textarea readOnly value={lyrics} className="min-h-[120px]" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
