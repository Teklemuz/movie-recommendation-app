import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Movie, MovieDetails, getMovieDetails } from '../services/api';
import { useFavorites } from '../hooks/useFavorites';
import { Loading } from './Loading';

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
}

const Card = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-bottom: 1px solid #f0f0f0;

  @media (max-width: 768px) {
    height: 240px;
  }

  @media (max-width: 480px) {
    height: 200px;
  }
`;

const Content = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #222;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ExtraInfo = styled.p`
  margin: 0.5rem 0 0;
  font-size: 0.85rem;
  color: #777;
`;

const FavoriteButton = styled.button<{ isFavorite: boolean }>`
  width: 100%;
  margin-top: 0.75rem;
  padding: 0.6rem;
  background: ${({ isFavorite }) => (isFavorite ? '#ff5555' : '#3498db')};
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ isFavorite }) => (isFavorite ? '#e63939' : '#2b87c9')};
  }

  &:active {
    background: ${({ isFavorite }) => (isFavorite ? '#cc3333' : '#1f6ca8')};
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 0.5rem;
  }
`;

const FavoriteButtonWithoutProps = styled(FavoriteButton).withConfig({
  shouldForwardProp: (prop) => prop !== 'isFavorite',
})``;

export const MovieCard: React.FC<MovieCardProps> = ({ movie, isFavorite }) => {
  const { saveFavorite, removeFavorite } = useFavorites();
  const [isLoading, setIsLoading] = useState(true);
  const [extraData, setExtraData] = useState<Pick<MovieDetails, 'runtime' | 'genres'> | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchExtraData = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      try {
        const details = await getMovieDetails(movie.id.toString());
        if (isMounted) {
          setExtraData({ runtime: details.runtime, genres: details.genres });
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch extra movie data:', error);
        if (isMounted) setIsLoading(false);
      }
    };

    fetchExtraData();
    return () => { isMounted = false; };
  }, [movie.id]);

  const handleFavoriteClick = () => {
    if (isFavorite) removeFavorite(movie);
    else saveFavorite(movie);
  };

  if (isLoading) return <Card><Loading /></Card>;

  return (
    <Card>
      <Link href={`/movie/${movie.id}`}>
        <Poster
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          loading="lazy"
        />
      </Link>
      <Content>
        <Title>{movie.title}</Title>
        {extraData && (
          <ExtraInfo>
            {extraData.runtime ? `${extraData.runtime} min | ` : ''}
            {extraData.genres?.map(genre => genre.name).join(', ') || 'No genres'}
          </ExtraInfo>
        )}
        <FavoriteButtonWithoutProps isFavorite={isFavorite} onClick={handleFavoriteClick}>
          {isFavorite ? 'Remove from Favorites' : 'Save to Favorites'}
        </FavoriteButtonWithoutProps>
      </Content>
    </Card>
  );
};