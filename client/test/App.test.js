import React from 'react';
import ReactDOM from 'react-dom';
import RushTableScreen from '../src/screens/RushTableScreen';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RushTableScreen />, div);
  ReactDOM.unmountComponentAtNode(div);
});
