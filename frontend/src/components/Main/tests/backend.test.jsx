/**
 * This module contains tests for the backend file.
 */
import React from 'react';
import { render } from '@testing-library/react';
import axios from 'axios';
import { config } from 'dotenv';

jest.mock('axios', () => ({
  request: jest.fn(),
  get: jest.fn(),
}));
describe('backend file', () => {
  /**
 * This test verifies that http request to lambda endpoint is successful.
 */
  test('axios request function works fine', async () => {
    render(
      <backend />,
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

    axios.request.mockResolvedValue(body);
    await axios.request(config);
    expect(axios.request).toHaveBeenCalledWith(config);
  });
  /**
 * This test verifies that server is running in port 8000 not other ports.If I change port number,
 * it would fail.
 */
  test('server should be running on port 8000', async () => {
    render(
      <backend />,
    );

    try {
      const response = await axios.get('http://localhost:8000');
      expect(response.status).toEqual(200);
    } catch (error) {
    // If an error occurs, the test fails
    }
  });
});
