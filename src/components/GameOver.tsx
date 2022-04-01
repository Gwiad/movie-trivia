import React from 'react';
import {RootState} from 'app/store';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import PlayButton from './PlayButton';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Text = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;
const GameOver = () => {
  const currentScore = useSelector((state: RootState) => state.currentScore);

  return (
    <Container>
      <div style={{height: '200px'}}>
        <Text>Game Over!</Text>
        <Text>You scored {currentScore} points!</Text>
      </div>
      <div>
        <PlayButton title="PLAY AGAIN" />
      </div>
    </Container>
  );
};

export default React.memo(GameOver);
