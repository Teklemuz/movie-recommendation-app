//src/service/api.tsx
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '9422b4e345928db76a562a666f024402';
const BASE_URL = 'https://api.themoviedb.org/3';

export const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Basic Movie interface for trending and recommended movies
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

// Detailed Movie interface for movie details endpoint
export interface MovieDetails extends Movie {
  runtime?: number;
  genres?: { id: number; name: string }[];
}

export const getTrendingMovies = async (): Promise<Movie[]> => {
  const response = await api.get('/trending/movie/week');
  return response.data.results;
};

export const getRecommendedMovies = async (): Promise<Movie[]> => {
  const response = await api.get('/movie/top_rated');
  return response.data.results;
};

export const getMovieDetails = async (id: string): Promise<MovieDetails> => {
  const response = await api.get(`/movie/${id}`);
  return response.data;
};
