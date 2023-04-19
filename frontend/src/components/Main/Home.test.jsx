import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';

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
  const mockedResponse = [{
    Name: 'daas-service-client-syncer',
    InitMemory: 10240,
    Timeout: 900,
    LastInvocationTime: '',
    LastInvocationDuration: 0,
    Success: true,
    Error: '',
  }];

  axios.get.mockReturnValue(Promise.resolve(mockedResponse));
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
  screen.debug();
  await waitFor(() => {
    const output = screen.getByText('daas-service-client-syncer');
    expect(output).toBeInTheDocument();
  });
  // const output = await screen.findByText('daas-service-client-syncer');
  // expect(output).toBeInTheDocument();
});
