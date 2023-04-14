import { React, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'
import './Login.css'; 
import  axios  from 'axios';


function Login (props) {
 const [EnteredEmail, setEnteredEmail] =useState('');
 const [EnteredPassword, setEnteredPassword] =useState('');
 const [error, setError]=useState();
 const[IsSignedIn,setIsSignedIn]= useState(false);
 const navigate =useNavigate();

 const user = {
   email: EnteredEmail ,
   password: EnteredPassword
  };

 const handleSubmit = async(e) => {
   e.preventDefault();
   await axios.post('https://auth-dev.grasp-daas.com/rest-auth/login/', {
     "email": user.email ,
     "password": user.password
})
.then ((data) => {  
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
        message: 'Incorrect username or password.'
     })
     return err.response})};
     const errorHandler = (auth) => {
        setError('null');
     }
   return ( 
     
    <div className="body" id="login">
         
          
      <div>  
         <form className="form-login" method="post" onSubmit={handleSubmit}>
            

      <div className="form-login__lable">
         <label>Email</label>
         <br></br>
         <input id="Input" value={EnteredEmail} onChange= {(e) => setEnteredEmail(e.target.value)} type="email" name="email"/>
      </div>
            
      <div className="form-login__lable">
         <label>Password</label>
         <br></br>
         <input id="Password"  value={EnteredPassword} onChange= {(e) => setEnteredPassword(e.target.value)} type="password" name="Password"/>
      </div>

      <div >
         {error && <p className="form-login__ErrorMessage" onconfirm={errorHandler} >{error.message}</p>}
         </div>
      

      <button className="form-login__button" type="submit">Log in</button>
         </form> 

      </div>
    </div>
     
   )  
   }
export default Login
