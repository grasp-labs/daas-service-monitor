<<<<<<< Updated upstream
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
=======
import {React} from 'react'
import Home from  './components/Main/Home'
import DashBoard from './components/Main/DashBoard'
import Login from './components/Main/Login'
import { BrowserRouter , Routes, Route, Link} from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import Logout from './components/Main/Logout'

function App() {
return (
   <div>
    <BrowserRouter>
    <header className="p-3 text-bg-dark">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><Link to ="/" className="nav-link px-2 text-white">Home</Link></li>
        </ul>
        <div className="text-end">
          <Link to ="/login" className="btn btn-outline-light me-2">Login</Link>
        </div>
        <div className="text-end">
          <Link to ="/logout" className="btn btn-outline-light me-2">Logout</Link>
        </div>
        
      </div>
>>>>>>> Stashed changes
    </div>
  </header>

    <Routes>
      <Route path="/login" element={<Login/>}  /> 
      <Route element= {<ProtectedRoutes />}>
        <Route path= "/" element = {<Home/>} />
     </Route>
     <Route path= "/DashBoard" element = {<DashBoard/>} />
     <Route path="/logout" onclick={Logout} element={<Logout/>}  /> 
      </Routes>
      </BrowserRouter>
  </div>
 )
}
export default App;




