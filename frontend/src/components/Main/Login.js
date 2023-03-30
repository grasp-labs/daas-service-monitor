import {React, useState} from 'react' 
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import './Login.css' 
import ErrorModal from '../../UI/ErrorModal'


function Login () {
 const [EnteredEmail, setEnteredEmail] =useState('');
 const [EnteredPassword, setEnteredPassword] =useState('');
 const[IsSignedIn,setIsSignedIn]= useState(false);
 const [error, setError]=useState();
 const navigate = useNavigate();
 const user = {
  email: EnteredEmail,
  password: EnteredPassword,
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
    navigate("/Home");
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
  <div className="body">
      {error && <ErrorModal title={error.title} message={error.message} onConfirm= {errorHandler} />}
      <form className="form-login" method="post" onSubmit={handleSubmit}>

         <h1 className="form-login__message">Please Login</h1>

         <div className="form-login__lable">
            <label>Email</label>
            <br></br>
            <input id="Input" placeholder="name@example.com" value={EnteredEmail} onChange= {(e) => setEnteredEmail(e.target.value)} type="email" name="email"/>
         </div>
            
         <div className="form-login__lable">
            <label>Password</label>
            <br></br>
            <input id="Password" placeholder="Password" value={EnteredPassword} onChange= {(e) => setEnteredPassword(e.target.value)} type="password" name="Password"/>
         </div>

         <div>
            <button className="form-login__button" type="submit">Login</button>
         </div>

      </form>
        
   </div>
   )  
   }
export default Login
