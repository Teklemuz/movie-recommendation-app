// pages/404.tsx
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { GlobalStyle } from '../styles/GlobalStyle'; 

// Styled components for the 404 page
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  background-color: #f9f9f9; /* Match your app’s background color */
  padding: 20px;
`;

const Heading = styled.h1`
  font-size: 3.5rem;
  color: #2c3e50;
  font-weight: bold;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Message = styled.p`
  font-size: 1.25rem;
  color: #7f8c8d;
  margin-bottom: 2rem;
  max-width: 500px;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HomeButton = styled.a`
  display: inline-block;
  padding: 12px 24px;
  background-color: #e74c3c; 
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;

const FilmIcon = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 1.5rem;
`;

export default function Custom404() {
  return (
    <>
      <GlobalStyle />
      <Container>
        {/* Optional: Movie-themed icon */}
        <FilmIcon src="/film-reel.svg" alt="Film Reel Icon" />
        <Heading>Lost in the Reels?</Heading>
        <Message>
          It seems this page has gone off-script. Let’s get you back to the action with some great movie recommendations!
        </Message>
        <Link href="/" passHref>
          <HomeButton>Return to Home</HomeButton>
        </Link>
      </Container>
    </>
  );
}