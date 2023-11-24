import { useState } from "react";
import { useForm } from "../../hooks/useForm"
import {PeticionesAyax} from "../../helpers/PeticionesAyax"
import {Constantes} from "../../helpers/Constantes"
import AuthContext from "../../context/AuthProvider";
import { useContext } from "react";

export const Login = () => {
  const {user, change} = useForm();
  const [flag2, setFlag2] = useState(false);
  const [flag3, setFlag3] = useState(false);
  const [flag4, setFlag4] = useState(false);

  const {nombre} = useContext(AuthContext);
  
  const login = async(e) =>{
    e.preventDefault();
    const {data} = await PeticionesAyax(Constantes.url_api+"user/login", "POST", user);
    if(data.message == "No te has identificado correctamente.") setFlag2(true)&setFlag3(false)&setFlag4(false);
    if(data.message == "No se ha encontrado al usuario deseado.") setFlag3(true)&setFlag2(false)&setFlag4(false);
    if(data.message == "Te has identificado correctamente.") {
      setFlag4(true)&setFlag2(false)&setFlag3(false);
      //Persistimos el token jwt y el usuario en el LocalStorage para guardar la sesión...El hacendado del Interceptor xD
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    console.log(data)
  }

  return (
   <>
      <h2>Identifícate como usuario {nombre}</h2>
      {flag2 && <h3 className="alert alert-danger">No te has identificado correctamente.</h3>}
      {flag3 && <h3 className="alert alert-danger">No se ha encontrado al usuario deseado.</h3>}
      {flag4 && <h3 className="alert alert-success">Te has identificado correctamente.</h3>}
      <br/>
      <form className="form-login" onSubmit={login}>
        <div className="form form-group">
          <label htmlFor="email" name="email">Email</label>
          <input type="email" name="email" onChange={change}/>
        </div>

        <div className="form form-group">
          <label htmlFor="password" name="email">Password</label>
          <input type="text" name="password" onChange={change}/>
        </div>

        <input type="submit" className="btn btn-success" value="Login"/>
      </form>
   </>
  )
}
