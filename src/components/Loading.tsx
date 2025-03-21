import React from 'react';
import styled from 'styled-components';

// Define the loading spinner using styled-components
const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.8s ease-in-out infinite;
  margin: 20px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Styled component for the loading text
const LoadingText = styled.p`
  text-align: center;
  font-size: 1.5rem;
  color: #3498db;
`;

// The Loading component
export const Loading = () => {  
  return (
    <div aria-live="polite">
      <Spinner /> {/* Display the loading spinner */}
      <LoadingText>Loading movies...</LoadingText> {/* Loading text */}
    </div>
  );
};