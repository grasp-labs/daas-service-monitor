import './App.css';
import  { useState, useEffect } from "react";
import axios from "axios"
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { ReactTabulator } from 'react-tabulator';
import ClipLoader from "react-spinners/ClipLoader";



function App() {

  const [rows, setRows] = useState([]);
//This 2 usestates are for adding loading indicator(Task 2). 
  const [loading, setLoading] = useState([false])
  const [color, setColor] = useState("#ffffff");

// this one is for adding auto refresh (Task 1)
  const [autoRefresh, setAutoRefresh] = useState(0);


// This useEffect is for adding loading indicator(Task 2)
 useEffect (()=>{
    setLoading(true)
    setColor("green")
    setTimeout(()=> {
      setLoading(false)
   
    },1000)
  }, [],)


// This useEffect is for setting frequency for autorefresh which can be changed based on user needs. Here the interval is every 10 minutes
  useEffect(() => {
  const interval=setInterval(()=>{
    setAutoRefresh((prevAutoRefresh)=>prevAutoRefresh +1);
    // eslint-disable-next-line no-restricted-globals
   },600000)

    return()=>clearInterval(interval)
 }, []);
 
  var config = {
    method: 'get',
    headers: { 
      'x-api-key': process.env.REACT_APP_API_KEY, 
      'Accept': 'application/json',
    }
  };

  useEffect( () => {
     async function fetchMetrics() {
      const rootUrl = process.env.NODE_ENV === "production" ? "https://ollq6b7h96.execute-api.eu-north-1.amazonaws.com" : "";
      await axios.get(`${rootUrl}/dev/monitor/lambda/`, config)
        .then(response => {

          setRows(response.data.body);
        })
        .catch(err => console.error);
    }
    
    fetchMetrics();
  });


// This varaible definition is for sorting(Task 1)
const options = {
  initialSort: [{column : "Success" , dir : "asc" }]
}

// This variable defenition is for loading indicator(Task 2)
const isLoading = {
  type: [{type : 'Boolean' , defualt : true} ]
}

  const columns = [
    { title: "Name", field: "Name", width: 150 },
    { title: "InitMemory (G)", field: "InitMemory", width: 150},
    { title: "Timeout (s)", field: "Timeout", width: 150},
    { title: "LastInvocationTime", field: "LastInvocationTime", width: 150},
    { title: "Duration (s)", field: "LastInvocationDuration", width: 150},
    { title: "Success", field: "Success", hozAlign: "center", formatter: "tickCross", width: 150 , sorter: "boolean"},
    { title: "Error", field: "Error", hozAlign: "center"},
  ]

   return (
    <div className="App">
      <h1>DAAS Service Monitor AutoRefresh = {autoRefresh}</h1>
      <ReactTabulator columns={columns} data={rows} options={options} isLoading = {isLoading}/>
      <ClipLoader color={color} loading={loading} size={50}></ClipLoader>
    </div>
  );
}

export default App;
