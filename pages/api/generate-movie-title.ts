// /api/generate-movie-title - FREE ALTERNATIVE
import { NextApiRequest, NextApiResponse } from 'next';

// Creative title generator without external API
function generateCreativeTitle(description: string): string {
  const words = description.toLowerCase().split(/\s+/);
  const keyWords = words.filter(word => 
    word.length > 3 && 
    !['the', 'and', 'for', 'with', 'that', 'this', 'from'].includes(word)
  );

  const prefixes = ['The', 'Echoes of', 'Shadow', 'Digital', 'Final', 'Lost', 'Hidden', 'Ancient', 'Future'];
  const suffixes = ['Quest', 'Legacy', 'Dreams', 'Secret', 'Journey', 'Prophet', 'Code', 'Protocol', 'Whisper'];
  
  const middles = ['the', 'of', 'in', 'and', ''];
  
  if (keyWords.length > 0) {
    const randomKeyWord = keyWords[Math.floor(Math.random() * keyWords.length)];
    const capitalizedWord = randomKeyWord.charAt(0).toUpperCase() + randomKeyWord.slice(1);
    
    const patterns = [
      `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${capitalizedWord}`,
      `${capitalizedWord}'s ${suffixes[Math.floor(Math.random() * suffixes.length)]}`,
      `The ${capitalizedWord} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`,
      `${capitalizedWord} ${middles[Math.floor(Math.random() * middles.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`
    ];
    
    return patterns[Math.floor(Math.random() * patterns.length)].replace(/\s+/g, ' ').trim();
  }
  
  // Fallback creative titles
  const creativeTitles = [
    "The Last Echo", "Digital Ghosts", "Shadow Protocol", 
    "Eternal Dreams", "The Final Stand", "Lost Horizon",
    "Beyond the Veil", "Whispers of Time", "The Hidden Code",
    "Ancient Mysteries", "Future Echoes", "The Silent Prophet",
    "Digital Frontier", "The Last Memory", "Echoes of Tomorrow",
    "The Forgotten Quest", "Shadow Dreams", "The Final Whisper",
    "Beyond Reality", "The Lost Legacy", "Digital Mysteries"
  ];
  
  return creativeTitles[Math.floor(Math.random() * creativeTitles.length)];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { description } = req.body;

    if (!description?.trim()) {
      return res.status(400).json({ error: 'Description is required' });
    }

    try {
      // Try Hugging Face first if API key exists
      if (process.env.HUGGING_FACE_API_KEY) {
        const response = await fetch(
          "https://router.huggingface.co/models/gpt2",
          {
            headers: {
              "Authorization": `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              inputs: `Movie title for: ${description}\nTitle: `,
              parameters: {
                max_new_tokens: 8,
                temperature: 0.8,
                do_sample: true,
              }
            }),
          }
        );

        if (response.ok) {
          const result = await response.json();
          if (result[0]?.generated_text) {
            let title = result[0].generated_text
              .replace(/Movie title for:.*?Title:\s*/gi, '')
              .split('\n')[0]
              .trim();

            if (title && title.length > 2) {
              return res.status(200).json({ 
                title: title,
                source: 'ai'
              });
            }
          }
        }
      }

      // If Hugging Face fails or no API key, use creative generator
      const creativeTitle = generateCreativeTitle(description);
      return res.status(200).json({ 
        title: creativeTitle,
        source: 'creative'
      });

    } catch (error) {
      // Fallback to creative generator on any error
      const creativeTitle = generateCreativeTitle(description);
      return res.status(200).json({ 
        title: creativeTitle,
        source: 'creative_fallback'
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}