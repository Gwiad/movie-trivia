import React from 'react';
import styled from 'styled-components';
import PlayButton from './PlayButton';

const HomePage = () => {
  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  `;

  return (
    <Container>
      <PlayButton title="START PLAYING" />
    </Container>
  );
};

export default React.memo(HomePage);
