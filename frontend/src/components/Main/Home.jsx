/**
 * This moodule contains a component which is responsible for rendering home page as a resposne
 * in a react tabulator format with information about different servers and services.
 */
import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactTabulator } from 'react-tabulator';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import './Home.css';
import '../../App.css';
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
// import Cookies from 'js-cookie';

/** Home function is resposnible for fetching data.
 *  Showing loading snipper to show the user to wait until data is fetched.
 *  Auto refreshing the home page based on set intervals.
 *  useEffect is used For handling each of these tasks(one useEffect per each task).
 */
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
    /** This fetchMetrics function is asynchronous function which sends get request to API
     * and waits for response to be fetched.
     * if response is successful, update state and returns response which is array of objects.
     * otherwise it throws error and retruns error.
     *
    * @returns {Array} response - returns the response which is array of objects.
    * @returns {Object} err - returns error whith status code and error message.
    */

    const fetchMetrics = async () => {
      try {
        const config = {
          method: 'get',
          headers: {
            Content_Type: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            Accept: 'application/json',
          },
        };
        const response = await axios.get('http://localhost:8000/lambda', config);
        setRows(response.data);
        return response;
      } catch (err) {
        return err;
      }
    };

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
