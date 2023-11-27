import { useContext } from "react"
import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import AuthContext from "../../context/AuthProvider";

export const Logout = () => {

    const{setAuth, setCounter} = useContext(AuthContext);

    useEffect(() =>{
        //Vaciar el localStorage
        localStorage.clear();
        setAuth({});
        setCounter({});
        <Navigate to="/login"/>
    }, []);
    
  return (
    <h1>Cerrando sesión...</h1>
  )
}
