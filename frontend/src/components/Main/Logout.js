import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'


const Logout = (props)=> {
    const[IsSignedIn,setIsSignedIn]= useState(true);
    const navigate = useNavigate();

    useEffect (()=>{
        localStorage.clear()

        if (IsSignedIn === true) {
            setIsSignedIn(false)
             navigate('/login')
    }
        
      }, [IsSignedIn, navigate] )
    
}
export default Logout;