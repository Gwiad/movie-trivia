import {START_TIMER} from 'features/timer/timer.slice';
import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import styled from 'styled-components';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  `;
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

  const handleClick = () => {
    dispatch({type: START_TIMER});
    navigate('/play');
  };
  return (
    <Container>
      <Button onClick={handleClick}>
        <Text>START PLAYING</Text>
      </Button>
    </Container>
  );
};

export default React.memo(HomePage);
