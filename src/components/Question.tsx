import {QuestionT} from 'types';
import React from 'react';
import styled from 'styled-components';
import {useNavigate, useParams} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'app/store';
import {ADD_POINT} from 'features/currentScore/currentScore.slice';
import {STOP_TIMER} from 'features/timer/timer.slice';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const Button = styled.button`
  width: 120px;
  height: 60px;
  border-radius: 50px;
  background: #013220;
  color: #d0f0c0;
  border: none;
  &:hover {
    background: #d0f0c0;
    color: #013220;
  }
`;
const Text = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;
const Question = () => {
  const {questionId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const key = parseInt(questionId as string, 10);
  const questions: QuestionT[] = useSelector((state: RootState) => state.questions);
  const question: QuestionT = questions[key];
  const handleClick = (userAnswer: boolean) => {
    if (userAnswer === question.answer) {
      dispatch({type: ADD_POINT});
      navigate(`/play/${key + 1}`);
    }
    if (userAnswer !== question.answer || key === questions.length - 1) {
      dispatch({type: STOP_TIMER});
      navigate('/gameover');
    }
  };

  return (
    <Container>
      <div style={{height: '200px'}}>
        <Text>{question.question}</Text>
      </div>
      <ButtonsContainer>
        <Button onClick={() => handleClick(true)}>
          <Text>YES</Text>
        </Button>
        <Button onClick={() => handleClick(false)}>
          <Text>NO</Text>
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default React.memo(Question);
