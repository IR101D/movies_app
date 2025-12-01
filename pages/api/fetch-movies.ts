import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "POST") {
    try {
      const { year, page = 1, genre } = request.body;
      
      if (!process.env.TMDB_API_KEY) {
        return response.status(500).json({ 
          error: "TMDB API key not configured" 
        });
      }

      const currentYear = new Date().getFullYear();
      const searchYear = year || currentYear;

      // First, get genre IDs if genre is specified
      let genreId = "";
      if (genre && genre !== "All") {
        const genreResp = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`
        );
        const genreData = await genreResp.json();
        const foundGenre = genreData.genres.find((g: any) => 
          g.name.toLowerCase() === genre.toLowerCase()
        );
        if (foundGenre) {
          genreId = foundGenre.id;
        }
      }

      // Build TMDB API URL
      let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&year=${searchYear}&page=${page}&sort_by=popularity.desc`;

      if (genreId) {
        apiUrl += `&with_genres=${genreId}`;
      }

      const resp = await fetch(apiUrl);

      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }

      const data = await resp.json();

      // Transform TMDB response to match your expected format
      const movies: MoviesProps[] = data.results ? data.results.map((item: any) => ({
        id: item.id.toString(),
        titleText: {
          text: item.title || 'Unknown Title'
        },
        primaryImage: {
          url: item.poster_path 
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : null
        },
        releaseYear: {
          year: parseInt(item.release_date?.split('-')[0]) || searchYear
        }
      })) : [];

      return response.status(200).json({
        movies,
        totalPages: data.total_pages || 1
      });

    } catch (error) {
      console.error('API Error:', error);
      return response.status(500).json({
        error: error instanceof Error ? error.message : "Failed to fetch movies"
      });
    }
  } else {
    response.setHeader('Allow', ['POST']);
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}