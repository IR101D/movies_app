import { useState } from 'react';
import Button from '@/components/commons/Button';
import Loading from '@/components/commons/Loading';

const GenerateMoviePage = () => {
  const [description, setDescription] = useState('');
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateTitle = async () => {
    if (!description.trim()) {
      setError('Please enter a movie description');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/generate-movie-title', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate title');
      }

      setGeneratedTitle(data.title);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDescription('');
    setGeneratedTitle('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#110F17] text-white px-4 md:px-10 lg:px-44 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
          AI Movie Title Generator
        </h1>
        
        <p className="text-gray-300 text-center mb-12 text-lg">
          Describe your movie plot and let AI generate creative titles for you
        </p>

        <div className="bg-[#1A1721] rounded-lg p-8 border border-[#E2D609]">
          {/* Description Input */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-lg font-semibold mb-3 text-[#E2D609]">
              Movie Plot Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your movie plot... (e.g., A young wizard discovers his magical heritage and must defeat a dark lord who killed his parents)"
              className="w-full h-32 px-4 py-3 bg-[#110F17] border-2 border-[#E2D609] rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-[#c9c208]"
            />
          </div>

          {/* Generate Button */}
          <div className="flex justify-center mb-6">
            <Button
              title={loading ? "Generating..." : "Generate Movie Title"}
              action={generateTitle}
           //   disabled={loading || !description.trim()}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg">
              <p className="text-red-200">{error}</p>
            </div>
          )}

          {/* Generated Title */}
          {generatedTitle && (
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-3 text-[#E2D609]">
                Your Movie Title:
              </h3>
              <div className="bg-[#110F17] border-2 border-[#E2D609] rounded-lg p-6 mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {generatedTitle}
                </h2>
              </div>
              
              <div className="flex justify-center gap-4">
                <Button
                  title="Generate Another"
                  action={resetForm}
                />
                <Button
                  title="Copy Title"
                  action={() => navigator.clipboard.writeText(generatedTitle)}
                />
              </div>
            </div>
          )}

          {/* Examples */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <h4 className="text-lg font-semibold mb-3 text-[#E2D609]">Example Descriptions:</h4>
            <div className="grid gap-2 text-sm text-gray-300">
              <button
                onClick={() => setDescription("A group of teenagers discover they have superpowers and must save their town from a mysterious threat")}
                className="text-left hover:text-[#E2D609] transition-colors"
              >
                • A group of teenagers discover they have superpowers...
              </button>
              <button
                onClick={() => setDescription("A retired detective is forced to solve one last case when his daughter goes missing in a futuristic city")}
                className="text-left hover:text-[#E2D609] transition-colors"
              >
                • A retired detective solves one last case in a futuristic city...
              </button>
              <button
                onClick={() => setDescription("An archaeologist discovers an ancient artifact that can control time, but a secret organization wants it for themselves")}
                className="text-left hover:text-[#E2D609] transition-colors"
              >
                • An archaeologist finds a time-controlling artifact...
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading && <Loading />}
    </div>
  );
};

export default GenerateMoviePage;