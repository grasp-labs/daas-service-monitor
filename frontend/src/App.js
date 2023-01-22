import './App.css';

import { useState, useEffect } from "react";

import axios from "axios"

import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { ReactTabulator } from 'react-tabulator';

function App() {

  const [rows, setRows] = useState([]);

  var config = {
    method: 'get',
    headers: { 
      'x-api-key': process.env.REACT_APP_API_KEY, 
      'Accept': 'application/json',
    }
  };

  useEffect( () => {
    const fetchMetrics = async () => {
      const rootUrl = process.env.NODE_ENV === "production" ? "https://ollq6b7h96.execute-api.eu-north-1.amazonaws.com" : ""
      await axios.get(`${rootUrl}/dev/monitor/lambda/`, config)
      .then(response => {
        setRows(response.data.body);
    })
      .catch(err => console.error);
    };
    fetchMetrics();
  }, []);

  const columns = [
    { title: "Name", field: "Name", width: 150 },
    { title: "InitMemory (G)", field: "InitMemory", width: 150},
    { title: "Timeout (s)", field: "Timeout", width: 150},
    { title: "LastInvocationTime", field: "LastInvocationTime", width: 150},
    { title: "Duration (s)", field: "LastInvocationDuration", width: 150},
    { title: "Success", field: "Success", hozAlign: "center", formatter: "tickCross", width: 150},
    { title: "Error", field: "Error", hozAlign: "center"},
  ]

  return (
    <div className="App">
      <h1>DAAS Service Monitor</h1>
      <ReactTabulator columns={columns} data={rows}/>
    </div>
  );
}

export default App;
