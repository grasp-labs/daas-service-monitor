/**
 * This module contains tests for the Home component.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Home from '../Home';

jest.mock('axios');

describe('Home component', () => {
/**
 * This test verifies that logout button exists in the home page.
 */
  test('Logout button exsists', () => {
    render(
      <MemoryRouter initialEntries={['/logout']}>
        <Home />
      </MemoryRouter>,
    );

    const logoutElement = screen.getByText('Logout');
    expect(logoutElement).toBeInTheDocument();
  });
});

/**
 * This test verifies that The home page has a heading which renders "DAAS Service Monitor".
 */
test('title daas service monitor exsists', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
  const headerElement = screen.getByText('DAAS Service Monitor', { exact: false });
  expect(headerElement).toBeInTheDocument();
});

/**
 * This test verifies that tabulator table is fetched and we got response when API call is in place.
 * We use mocking API call instead of actual API call in this test.
 */
test('tabulator table is fetched', async () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );

  const body = [{
    Name: 'daas-service-client-syncer',
    InitMemory: 10240,
    Timeout: 900,
    LastInvocationTime: '',
    LastInvocationDuration: 0,
    Success: true,
    Error: '',
  }];

  axios.get.mockResolvedValue(body);

  expect(axios.get).toHaveBeenCalled();
});
