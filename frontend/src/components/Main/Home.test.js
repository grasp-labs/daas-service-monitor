import { render , screen } from '@testing-library/react';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom'


describe('Home component', ()=> {
 test ('Logout button exsists', () => {
  render(
    <MemoryRouter initialEntries={['/logout']}>
      <Home />
    </MemoryRouter>,
  );
  const logoutElement= screen.getByText('Logout');
  expect(logoutElement).toBeInTheDocument();
});
})

test ('title daas service monitor exsists', () => {
  render (
  <MemoryRouter>
  <Home />
 </MemoryRouter>,
    );
    const headerElement= screen.getByText('DAAS Service Monitor AutoRefresh = 0')
    expect(headerElement).toBeInTheDocument();
  });

  test ('renders data(monitor data) if request is successful', async () => {
      window.fetch = jest.fn();
      window.fetch.mockResolvedValueOnce ({
        json: async() => [{Name: 'daas-service-client-syncer' }],
      });
    render(
      <MemoryRouter >
        <Home />
      </MemoryRouter>
     
    );
  });

