import Login from './components/Main/Login';
import Home from './components/Main/Home';
import Logout from './components/Main/Logout';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {

  return (
  <BrowserRouter>
    <Routes>
     <Route path="/" element={<Login/>} /> 
     <Route path= "/Home" element = {<Home/>} />
     <Route path="/logout"element={<Logout/>} onclick={Logout} /> 
    </Routes>
  </BrowserRouter>
 )
}
export default App;




