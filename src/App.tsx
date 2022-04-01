import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import styled from 'styled-components';
import HomePage from 'components/HomePage';
import Question from 'components/Question';
import GameOver from 'components/GameOver';

const OuterContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InnerContainer = styled.div`
  width: 300px;
  height: 600px;
  border: 2px solid black;
`;

function App() {
  return (
    <OuterContainer>
      <InnerContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/play/:questionId" element={<Question />} />
            <Route path="/gameover" element={<GameOver />} />
            <Route path="/error">error</Route>
            <Route>lost in 404</Route>
          </Routes>
        </BrowserRouter>
      </InnerContainer>
    </OuterContainer>
  );
}

export default React.memo(App);
