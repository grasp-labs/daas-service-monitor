import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';

jest.mock('axios');
// jest.mock("axios", () => ({
// ...jest.requireActual("axios"),
// get: jest.fn(),
// }));

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

test('renders data(monitor data) if request is successful', async () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );

  const rows = [
    {
      Name: 'daas-service-client-syncer',
      InitMemory: 10240,
      Timeout: 900,
      LastInvocationTime: '',
      LastInvocationDuration: 0,
      Success: true,
      Error: '',
    },
  ];
  axios.get.mockImplementationOnce(() => Promise.resolve({ data: rows }));
  // const { response } = renderHook(()=> Home());
  // await act (() => {
  // response.data.body.fetchMetrics();
  // });
  // expect(response.data.body).toEqual(rows)
  //  window.fetch = jest.fn();
  //  window.fetch.mockResolvedValueOnce ({
  //   json: async() => [{Name: 'daas-service-client-syncer' }],
  // });
  const tabulatorElements = await screen.findAllByTitle('Name');
  expect(tabulatorElements).not.toHaveLength(0);
});
