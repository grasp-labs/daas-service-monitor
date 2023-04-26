/**
 * This module contains tests for the Login component.
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Login from '../Login';

describe('Login component', () => {
  /**
   * This test verifies that login button exists when button is clicked.
   */
  test('Login button exists', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>,
    );
    const loginElement = screen.getByText('Log in');
    expect(loginElement).toBeInTheDocument();
  });

  /**
   * This test verifies that Email lable exists in the login page.
   */
  test('Email lable exists', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>,
    );
    const emailLableNode = screen.getByText('Email');
    expect(emailLableNode).toBeInTheDocument();
  });

  /**
   * This test verifies that Email input exists in the login page.
   */
  test('Email input exists', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>,
    );
    const emailInputNode = screen.getByLabelText('Email');
    expect(emailInputNode.getAttribute('name')).toBe('email');
  });

  /**
   * This test verifies that user can type in the email input field
   * and the user types the expected email address in the email input field.
   */
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

  /**
   * This test verifies that password lable exists in the login page.
   */
  test('password lable exists', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>,
    );
    const loginElement = screen.getByText('Password');
    expect(loginElement).toBeInTheDocument();
  });

  /**
   * This test verifies that passowrd input exists in the login page.
   */
  test('password input exists', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>,
    );
    const passwordInputNode = screen.getByLabelText('Password');
    expect(passwordInputNode.getAttribute('name')).toBe('password');
  });

  /**
   * This test verifies that user can type in the password input field
   * and the user types the expected password in the password input field.
   */
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

  /**
   * This test verifies that if user enters wrong email and/or password,
   * the error message will be shown in the login page.
   */
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
