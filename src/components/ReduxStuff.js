import React from 'react';
import { Card, Colors, Button } from '@blueprintjs/core';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../actions';

const ReduxStuff = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <Card interactive className='counter-card' style={{ backgroundColor: Colors.DARK_GRAY5 }}>
      <h1>
        Counter: {counter}
      </h1>
      <Button large intent='primary' onClick={() => dispatch(increment())}>+</Button>
      <Button large intent='warning' onClick={() => dispatch(decrement())}>-</Button>
    </Card>
  );
};

export default ReduxStuff;
