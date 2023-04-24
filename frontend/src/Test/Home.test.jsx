import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Home from '../components/Main/Home';

jest.mock('axios');

describe('Home component', () => {
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

test('title daas service monitor exsists', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
  const headerElement = screen.getByText('DAAS Service Monitor', { exact: false });
  expect(headerElement).toBeInTheDocument();
});

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
