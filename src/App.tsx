import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">homepage</Route>
          <Route path="/play/:questionId">play here</Route>
          <Route path="/gameOver">game over </Route>
          <Route path="/error">error</Route>
          <Route>lost in 404</Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
