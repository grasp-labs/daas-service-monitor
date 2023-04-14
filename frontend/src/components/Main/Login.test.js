import { render , screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { MemoryRouter } from 'react-router-dom'


describe('Login component', ()=> {
 test ('Login button exists', () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <Login  />
    </MemoryRouter>,
  );
  const loginElement= screen.getByText('Log in');
  expect(loginElement).toBeInTheDocument();
});

test ('Email lable exists', () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <Login  />
    </MemoryRouter>,
  );
  const loginElement= screen.getByText('Email');
  expect(loginElement).toBeInTheDocument();
});

test ('password lable exists', () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <Login  />
    </MemoryRouter>,
  );
  const loginElement= screen.getByText('Password');
  expect(loginElement).toBeInTheDocument();
});

test ('Email input works', async() => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <Login  />
    </MemoryRouter>,
  );
  const inputElement= await screen.findAllByRole('input');
  userEvent.click(inputElement)
  const outputElement= screen.getByText('');
  expect(outputElement).toBeInTheDocument();

  
});

})
