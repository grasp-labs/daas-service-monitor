import './App.css';

import { useState, useEffect } from "react";

import axios from "axios"

import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { ReactTabulator } from 'react-tabulator';

function App() {

  const [rows, setRows] = useState([]);

  useEffect( () => {
    const fetchMetrics = async () => {
      await axios.get("https://884f1eoyk4.execute-api.eu-north-1.amazonaws.com/lambda")
      .then(response => setRows(response.data))
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
    { title: "FunctionError", field: "FunctionError", hozAlign: "center", formatter: "tickCross", width: 150},
    { title: "RunTimeoutError", field: "RunTimeoutError", hozAlign: "center", formatter: "tickCross"},
  ]

  return (
    <div className="App">
      <h1>DAAS Service Monitor</h1>
      <ReactTabulator columns={columns} data={rows}/>
    </div>
  );
}

export default App;
