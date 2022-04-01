import React from 'react';
import {START_TIMER} from 'features/timer/timer.slice';
import styled from 'styled-components';
import {PlayButtonT} from 'types';
import {useNavigate} from 'react-router';
import {RESET_SCORE} from 'features/currentScore/currentScore.slice';
import {FETCH_MOVIES} from 'features/movies/movies.slice';
import {useDispatch} from 'react-redux';

const Button = styled.button`
  width: 200px;
  height: 80px;
  border-radius: 50px;
  background: #013220;
  color: #d0f0c0;
  border: none;

  -webkit-transition: transform 0.5s ease-in-out;
  -moz-transition: transform 0.5s ease-in-out;
  -ms-transition: transform 0.5s ease-in-out;

  &:hover {
    background: #d0f0c0;
    color: #013220;

    -moz-transform: scale(1.3);
    -webkit-transform: scale(1.3);
    -o-transform: scale(1.3);
    -ms-transform: scale(1.3);
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
  }
`;
const Text = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const PlayButton = (props: PlayButtonT) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch({type: FETCH_MOVIES});
    dispatch({type: START_TIMER});
    dispatch({type: RESET_SCORE});
    navigate('/play/0');
  };
  const {title} = props;

  return (
    <Button onClick={handleClick}>
      <Text>{title}</Text>
    </Button>
  );
};

export default React.memo(PlayButton);
