//src/pages/index 
import { GetServerSideProps } from 'next';

import styled from 'styled-components';
import { Movie, getTrendingMovies, getRecommendedMovies } from '../services/api';
import { MovieCard } from '../components/MovieCard';
import { Loading } from '../components/Loading';
import { GlobalStyle } from '../styles/GlobalStyle';
import { useFavorites } from '../hooks/useFavorites';

const Dashboard = styled.div`
  min-height: 100vh;
  background: #f7f9fc;
`;

const Header = styled.header`
  background: #fff;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #eee;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
`;

const Title = styled.h1`
  margin: 0;
  color: #333;
  font-size: 2rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const Section = styled.section`
  margin: 3rem 0;
`;

const SectionTitle = styled.h2`
  color: #333;
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-left: 1rem;
  border-left: 5px solid;
  border-image: linear-gradient(to bottom, #3498db, #74c0fc) 1;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #888;
  font-size: 1.1rem;
  padding: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1rem;
  }
`;

const ErrorMessage = styled.div`
  color: #e63939;
  font-size: 1.2rem;
  text-align: center;
  padding: 2rem;
`;

interface HomeProps {
  trending: Movie[];
  recommended: Movie[];
  error: string | null;
}

export default function Home({ trending, recommended, error }: HomeProps) {
  const { favorites } = useFavorites();

  if (error) return <Dashboard><ErrorMessage>{error}</ErrorMessage></Dashboard>;

  return (
    <Dashboard>
      <GlobalStyle />
      <Header>
        <Container>
          <Title>Movie Dashboard</Title>
        </Container>
      </Header>
      <Container>
        <Section>
          <SectionTitle>Favorites</SectionTitle>
          {favorites.length > 0 ? (
            <Grid>
              {favorites.map(movie => (
                <MovieCard key={movie.id} movie={movie} isFavorite={true} />
              ))}
            </Grid>
          ) : (
            <EmptyMessage>No favorites added yet</EmptyMessage>
          )}
        </Section>
        <Section>
          <SectionTitle>Trending Movies</SectionTitle>
          <Grid>
            {trending.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={favorites.some(fav => fav.id === movie.id)}
              />
            ))}
          </Grid>
        </Section>
        <Section>
          <SectionTitle>Recommended Movies</SectionTitle>
          <Grid>
            {recommended.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={favorites.some(fav => fav.id === movie.id)}
              />
            ))}
          </Grid>
        </Section>
      </Container>
    </Dashboard>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [trendingData, recommendedData] = await Promise.all([
      getTrendingMovies(),
      getRecommendedMovies(),
    ]);
    return { props: { trending: trendingData, recommended: recommendedData, error: null } };
  } catch (error) {
    return { props: { trending: [], recommended: [], error: 'Failed to fetch movies. Please try later.' } };
  }
};