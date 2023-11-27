import { createContext } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";
import { Constantes } from "../helpers/Constantes";

const AuthContext = createContext();
{/*Para que todos los componentes tengan aceso a la info del useContext, el componente AuthProvider debe envolver a todos los demás */}
{/*Usamos Provider para poder añadir el value con la info */}
{/*Dentro de AuthProvider envolveremos todos los demás componentes hijos, children, para recibir la info*/}
export const AuthProvider = ({children}) => {

  //Objetos que vamos a recibir del usuario registrado por el token
  const[auth, setAuth] = useState({});
  const[counter, setCounter] = useState({});
  const[loading, setLoading] = useState(true);

    //Usamos useEffect para que cada vez que cargue un componente, verifiquemos y tengamos los datos del usuario
    useEffect(() =>{
      getDataUser();
    }, []);

    //Bloque donde validamos y obtenemos los datos del usuario
    const getDataUser = async() =>{
      //Obtenemos el token y user del localStorage
      let token = localStorage.getItem("token");
      let user = localStorage.getItem("user");

      if(!token || !user) {
        setLoading(false);
        return false;
      }

      const user_obj = JSON.parse(user);
      console.log(user_obj._id);
      
      try {
        //Petición ajax al servidor para objeter los datos del usuario a través de su id
        const request = await fetch(Constantes.url_api + "user/getDataUserProfile/"+user_obj._id, {
          method: "GET",
          headers:{
            "Content-Type": "application/json",
            "Authorization": JSON.stringify(token)
          }
        });

        const data = await request.json();
        //user_finded es el objeto de usuario que devuelve la bbdd ya actualizada
        //si usáramos user_token_identity setearímos siempre el usuario con los datos del token del login, no mostrando la última actualización
        //de esta manera, conseguimos que siempre aparezcan los nuevos datos en pantalla.
        console.log(data.user_finded)
        setAuth(data.user_finded);
        setLoading(false);
        
      } catch (error) {
        console.log("Error en la petición.");
      }

      try {
        //Petición ajax al servidor para objeter los contadores del usuario según su id
        const requestCounter = await fetch(Constantes.url_api + "user/counter/"+user_obj._id, {
          method: "GET",
          headers:{
            "Content-Type": "application/json",
            "Authorization": JSON.stringify(token)
          }
        });

        const dataCounter = await requestCounter.json();
        setCounter(dataCounter);
        setLoading(false);

      } catch (error) {
        console.log("Error en la petición.");
      } 
    }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        counter,
        setCounter,
        loading,
        setLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node // Validación para la propiedad 'children'
};

export default AuthContext;
