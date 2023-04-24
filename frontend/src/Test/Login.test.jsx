import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Login from '../components/Main/Login';

describe('Login component', () => {
  test('Login button exists', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>,
    );
    const loginElement = screen.getByText('Log in');
    expect(loginElement).toBeInTheDocument();
  });

  test('Email lable exists', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>,
    );
    const emailLableNode = screen.getByText('Email');
    expect(emailLableNode).toBeInTheDocument();
  });

  test('Email input exists', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>,
    );
    const emailInputNode = screen.getByLabelText('Email');
    expect(emailInputNode.getAttribute('name')).toBe('email');
  });

  test('Email input should accept text which matches with the expected user email input', () => {
    const expectedEmailUserInput = 'demo2@graspdemo.com';
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>,
    );
    const emailInputNode = screen.getByLabelText('Email');
    expect(emailInputNode.value).toMatch('');
    fireEvent.change(emailInputNode, { target: { value: expectedEmailUserInput } });
    expect(emailInputNode.value).toMatch(expectedEmailUserInput);
  });

  test('password lable exists', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>,
    );
    const loginElement = screen.getByText('Password');
    expect(loginElement).toBeInTheDocument();
  });

  test('password input exists', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>,
    );
    const passwordInputNode = screen.getByLabelText('Password');
    expect(passwordInputNode.getAttribute('name')).toBe('password');
  });

  test('Passowrd input should accept text which matches with the expected user password input', () => {
    const expectedPasswordUserInput = 'dummy';
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>,
    );
    const passwordInputNode = screen.getByLabelText('Email');
    expect(passwordInputNode.value).toMatch('');
    fireEvent.change(passwordInputNode, { target: { value: expectedPasswordUserInput } });
    expect(passwordInputNode.value).toMatch(expectedPasswordUserInput);
  });

  test('renders login error message if login fails', async () => {
    render(

      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>,
    );
    const loginButton = await screen.findByRole('button');
    userEvent.click(loginButton);

    const outputElement = await screen.findByText('Incorrect username or password.');
    expect(outputElement).toBeInTheDocument();
  });
});
