import {React, useState} from 'react' 
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import './Login.css' 
import ErrorModal from '../../UI/ErrorModal'

function Login () {
 const [email, setEmail] =useState('');
 const [password, setPassword] =useState('');
 const[IsSignedIn,setIsSignedIn]= useState(false);
 const [error, setError]=useState();
 const navigate = useNavigate();
 const user = {
  email: email,
  password: password,
}
    const handleSubmit = async (e) => {
    e.preventDefault();
     await axios.post('https://auth-dev.grasp-daas.com/rest-auth/login/', {
     "email": user.email ,
    "password": user.password
    })
   .then((data) => {
    localStorage.setItem('access_token', data.data['access_token']);
    localStorage.setItem('refresh_token', data.data['refresh_token']);
    console.log(localStorage)
    if (IsSignedIn === false) {
    setIsSignedIn(true)
    }
    navigate("/DashBoard");

    
    
    
   }).catch((err) => {
      console.log(err.response.status)
      setError({
         title: 'Invalid Credentials',
         message: 'Please enter valid credentials'
      })
      return err.response})};
    const errorHandler = () => {
      setError(null);
    }
   return (
   <div>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm= {errorHandler} />}
      <div>  
        <main className="form-signin w-100 m-auto">
          <form method="post" onSubmit= {handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div className="form-floating">
            <input  className="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange= {(e) => setEmail(e.target.value)} type="email" name="email"/> 
            <label htmlFor="floatingInput">Email address:</label>
            </div>
            <div className="form-floating">
            <input className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange= {(e) => setPassword(e.target.value)} type="password" name="Password"/>
          <label htmlFor="floatingPassword">Password:</label>
          
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
       </form>
        </main>
       </div>
    </div>
   )  
    
   }
export default Login
