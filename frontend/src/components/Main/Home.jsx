import '../../App.css';
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { ReactTabulator } from 'react-tabulator';
import ClipLoader from 'react-spinners/ClipLoader';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState([false]);
  const [autoRefresh, setAutoRefresh] = useState(0);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAutoRefresh((prevAutoRefresh) => prevAutoRefresh + 1);
    }, 600000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const config = {
      method: 'get',
      headers: {
        Content_Type: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'x-api-key': process.env.REACT_APP_API_KEY,
        Accept: 'application/json',
      },
    };
    async function fetchMetrics() {
      const rootUrl = process.env.NODE_ENV === 'production' ? 'https://ollq6b7h96.execute-api.eu-north-1.amazonaws.com' : '';
      await axios.get(`${rootUrl}/dev/monitor/lambda/`, config)
        .then((response) => {
          setRows(response.data.body);
          // console.log(response.data.body);
        })
        .catch((err) => console.log(err));
    }
    fetchMetrics();
  }, []);

  const options = {
    initialSort: [{ column: 'Success', dir: 'asc' }],
  };

  const isLoading = {
    type: [{ type: 'Boolean', defualt: true }],
  };

  const columns = [
    { title: 'Name', field: 'Name', width: 150 },
    { title: 'InitMemory (G)', field: 'InitMemory', width: 150 },
    { title: 'Timeout (s)', field: 'Timeout', width: 150 },
    { title: 'LastInvocationTime', field: 'LastInvocationTime', width: 150 },
    { title: 'Duration (s)', field: 'LastInvocationDuration', width: 150 },
    {
      title: 'Success', field: 'Success', hozAlign: 'center', formatter: 'tickCross', width: 150, sorter: 'boolean',
    },
    { title: 'Error', field: 'Error', hozAlign: 'center' },
  ];

  return (
    <div>
      <header className="Header">
        <Link to="/logout" className="logout__button">Logout</Link>
      </header>

      <div className="App">
        <h1 className="App" id="h1">
          DAAS Service Monitor AutoRefresh =
          {autoRefresh}
        </h1>

        {loading ? (
          <div className="spinning-loader">
            <ClipLoader loading={loading} size={30} />
          </div>
        ) : (
          <ReactTabulator
            columns={columns}
            data={rows}
            options={options}
            isLoading={isLoading}
          />
        )}

      </div>
    </div>
  );
}

export default Home;
