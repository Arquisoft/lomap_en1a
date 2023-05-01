import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

test('renders learn react link', async () => {
  const { container, getByText } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
    );

  const button = getByText("Enter now!");
  fireEvent.click(button);

  expect(await getByText("Log in with your POD!")).toBeInTheDocument();
});
