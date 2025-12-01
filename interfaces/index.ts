import { ReactNode } from "react";

export interface ComponentProps {
  children: ReactNode
}

export interface ButtonProps {
  title: string
  action?: () => void
}

export interface MovieProps {
  id: string; 
  title: string;
  posterImage: string | null;
  releaseYear: number;
}


export interface MoviesProps {
  id: string;
  titleText: {
    text: string;
  };
  primaryImage: {
    url: string | null;
  };
  releaseYear: {
    year: number;
  };
}

export interface MovieCardProps {
  title: string;
  posterImage: string | null;
  releaseYear: number;
}
export interface MovieDetailsProps {
  id: string;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: { id: number; name: string }[];
  budget: number;
  revenue: number;
  status: string;
  original_language: string;
  production_companies: { name: string }[];
  videos?: {
    results: {
      key: string;
      name: string;
      type: string;
      site: string;
    }[];
  };
}

export interface Props {
  movie: MovieDetailsProps;
}

