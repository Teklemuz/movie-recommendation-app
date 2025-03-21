import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Movie, getMovieDetails } from '../../services/api';
import { Loading } from '../../components/Loading';
import { GlobalStyle } from '../../styles/GlobalStyle';
import { useFavorites } from '../../hooks/useFavorites';

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const MovieDetail = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Poster = styled.img`
  max-width: 320px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.2rem;
  color: #222;
  margin-bottom: 1rem;
`;

const Overview = styled.p`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const Button = styled.button<{ isFavorite: boolean }>`
  padding: 0.75rem 1.5rem;
  background: ${({ isFavorite }) => (isFavorite ? '#ff5555' : '#3498db')};
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ isFavorite }) => (isFavorite ? '#e63939' : '#2b87c9')};
  }
`;

const ErrorMessage = styled.div`
  color: #e63939;
  font-size: 1.2rem;
  text-align: center;
  padding: 2rem;
`;

interface MovieDetailProps {
  movie: Movie | null;
  error: string | null;
}

export default function MoviePage({ movie, error }: MovieDetailProps) {
  const { saveFavorite, removeFavorite, favorites } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (movie) setIsFavorite(favorites.some(fav => fav.id === movie.id));
  }, [favorites, movie]);

  const handleFavoriteToggle = () => {
    if (isFavorite) removeFavorite(movie!);
    else saveFavorite(movie!);
    setIsFavorite(!isFavorite);
  };

  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;
  if (!movie) return <Loading />;

  return (
    <Container>
      <GlobalStyle />
      <MovieDetail>
        <Poster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div>
          <Title>{movie.title}</Title>
          <Overview>{movie.overview}</Overview>
          <Button isFavorite={isFavorite} onClick={handleFavoriteToggle}>
            {isFavorite ? 'Remove from Favorites' : 'Save to Favorites'}
          </Button>
        </div>
      </MovieDetail>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params!;
  try {
    const movie = await getMovieDetails(id as string);
    return { props: { movie, error: null } };
  } catch (error) {
    return { props: { movie: null, error: 'Failed to fetch movie details' } };
  }
};
