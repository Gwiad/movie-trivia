import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router';
import {HashRouter} from 'react-router-dom';
import styled from 'styled-components';
import HomePage from 'components/HomePage';
import Question from 'components/Question';
import GameOver from 'components/GameOver';
import {useSelector} from 'react-redux';
import {RootState} from 'app/store';

const OuterContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d0f0c033;
  position: relative;
`;
const InnerContainer = styled.div`
  width: 300px;
  height: 600px;
`;
const ScoreContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  text-align: left;
  width: 150px;
`;
const Text = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;
function App() {
  const currentScore = useSelector((state: RootState) => state.currentScore);
  return (
    <OuterContainer>
      <InnerContainer>
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/play/:questionId" element={<Question />} />
            <Route path="/gameover" element={<GameOver />} />
            <Route path="/error">error</Route>
            <Route>lost in 404</Route>
          </Routes>
        </HashRouter>
      </InnerContainer>
      <ScoreContainer>
        <Text>current score: {currentScore}</Text>
      </ScoreContainer>
    </OuterContainer>
  );
}

export default React.memo(App);
