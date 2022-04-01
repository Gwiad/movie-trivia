import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {FETCH_MOVIES, MovieStateI} from 'features/movies/movies.slice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'app/store';
import styled from 'styled-components';
import HomePage from 'components/HomePage';

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
  const movies: MovieStateI = useSelector((state: RootState) => state.movies);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!movies.error && !movies.loading && movies.movies.length < 1) {
      dispatch({type: FETCH_MOVIES});
    }
  });
  return (
    <OuterContainer>
      <InnerContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/play/:questionId">play</Route>
            <Route path="/gameOver">game over </Route>
            <Route path="/error">error</Route>
            <Route>lost in 404</Route>
          </Routes>
        </BrowserRouter>
      </InnerContainer>
    </OuterContainer>
  );
}

export default React.memo(App);
