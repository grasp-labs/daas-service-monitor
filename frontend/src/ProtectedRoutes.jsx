
import Home from './components/Main/DashBoard'
import Login from './components/Main/Login';

const useAuth = () => {
    const user= {loggedIn: false}
    return user && user.loggedIn; 
};

const ProtectedRoutes = () => {
    const isAuth = useAuth ();
    return isAuth ? <Home /> : <Login />;
};
export default ProtectedRoutes