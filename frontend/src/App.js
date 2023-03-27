
import './App.css';
import Login from './components/Main/Login';
import Logout from './components/Main/Logout';
import Home from './components/Main/Home';
import DashBoard from './components/Main/DashBoard';
import ProtectedRoutes from './ProtectedRoutes';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

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




