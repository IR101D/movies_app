import Button from "@/components/commons/Button";
import Loading from "@/components/commons/Loading";
import MovieCard from "@/components/commons/MovieCard";
import { MoviesProps } from "@/interfaces";
import { useCallback, useEffect, useState } from "react";

interface MProps {
  movies: MoviesProps[];
}

const Movies: React.FC<MProps> = () => {
  const [page, setPage] = useState<number>(1);
  const [year, setYear] = useState<number | null>(null);
  const [genre, setGenre] = useState<string>("All");
  const [movies, setMovies] = useState<MoviesProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/fetch-movies', {
        method: 'POST',
        body: JSON.stringify({
          page,
          year, 
          genre: genre === "All" ? "" : genre
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      });

      if (!response.ok) {
        // Get more specific error information
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} ${response.statusText}. ${errorText}`);
      }

      const data = await response.json();
      const results = data.movies;
      console.log(results);
      
      // Check if movies data exists
      if (!results || !Array.isArray(results)) {
        throw new Error('Invalid data format received from API');
      }
      
      setMovies(results);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError(error instanceof Error ? error.message : 'Something went wrong while fetching movies');
      setMovies([]); // Clear movies on error
    } finally {
      setLoading(false);
    }
  }, [page, year, genre]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Handle page navigation safely
  const handlePrevious = () => {
    setPage(prev => prev > 1 ? prev - 1 : 1);
  };

  const handleNext = () => {
    setPage(prev => prev + 1);
  };

  // Reset to page 1 when year or genre changes
  useEffect(() => {
    setPage(1);
  }, [year, genre]);

  return (
    <div className="min-h-screen bg-[#110F17] text-white px-4 md:px-10 lg:px-44">
      <div className="py-16">
        <div className="flex flex-col md:flex-row justify-between mb-4 items-center space-x-0 md:space-x-4">
          <input
            type="text"
            placeholder="Search for a movie..."
            className="border-2 w-full md:w-96 border-[#E2D609] outline-none bg-transparent px-4 py-2 rounded-full text-white placeholder-gray-400"
          />

          <select
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              const value = event.target.value;
              setYear(value ? Number(value) : null);
            }}
            className="border-2 border-[#E2D609] outline-none bg-transparent px-4 md:px-8 py-2 mt-4 md:mt-0 rounded-full w-full md:w-auto"
          >
            <option value="">Select Year</option>
            {[2024, 2023, 2022, 2021, 2020, 2019].map((year: number) => (
              <option value={year} key={year}>{year}</option>
            ))}
          </select>
        </div>

        <p className="text-[#E2D609] text-xl mb-6 mt-6">Online streaming</p>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-lg md:text-6xl font-bold">
            {year || ''} {genre} Movie List
          </h1>
          <div className="flex flex-wrap space-x-0 md:space-x-4 mt-4 md:mt-0">
            {['All', 'Animation', 'Comedy', 'Fantasy'].map((genreItem: string, key: number) => (
              <Button 
                title={genreItem} 
                key={key} 
                action={() => setGenre(genreItem)} 
              />
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-900/50 border border-red-500 rounded-lg">
            <p className="text-red-200">{error}</p>
            <button 
              onClick={fetchMovies}
              className="mt-2 px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Movies output */}
        {!error && (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-10">
              {movies?.map((movie: MoviesProps, key: number) => (
                  <MovieCard
                    id={movie.id} 
                    title={movie?.titleText.text}
                   posterImage={movie?.primaryImage?.url}
                   releaseYear={movie?.releaseYear?.year}
                  key={key}
                  />
              ))}
            </div>

            {/* No movies found message */}
            {movies.length === 0 && !loading && (
              <div className="text-center py-10 text-gray-400">
                No movies found for the selected filters.
              </div>
            )}

            <div className="flex justify-end space-x-4 mt-6">
              <Button 
                title="Previous" 
                action={handlePrevious}
             //   disabled={page === 1 || loading}
              />
              <Button 
                title="Next" 
                action={handleNext}
              //  disabled={loading}
              />
            </div>
          </>
        )}
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default Movies;