import { useState } from "react";
import { Constantes } from "../../helpers/Constantes";
import { PeticionesAyax } from "../../helpers/PeticionesAyax";
import { useForm } from "../../hooks/useForm"

export const Register = () => {

  const {user, change} = useForm();
  const[flag, setFlag] = useState(false);
  const[flag2, setFlag2] = useState(false);
  const[flag3, setFlag3] = useState(false);


  const addUser = async(e) =>{
      e.preventDefault();
      try {
        let {datos} = await PeticionesAyax(Constantes.url_api+"user/addUser", "POST", user)
        if(datos.message == "Usuario guardado correctamente.") setFlag(true) 
        if(datos.message == "Ya existe un usuario con estos datos.") {
          setFlag2(true) 
          setFlag(false)
        }
        console.log(datos.message);
      } catch (error) {
        setFlag3(true)
      }
      
      /*
      try {
        let peticion = await fetch(Constantes.url_api + "user/addUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json" 
          },
          body: JSON.stringify(user) 
          });
          let datos = await peticion.json();
          console.log(datos)
      } catch (error) {
        console.log("Error")
      }
      */
  }

  return (
    <>
    <h2>Regístrate como nuevo usuario</h2>
    {flag ? <h3 className="alert alert-success">Usuario registrado con éxito</h3>: ""}
    {flag2 ? <h3 className="alert alert-danger">Ya existe un usuario con estos datos</h3>: ""}
    {flag3 ? <h3 className="alert alert-danger">Error al registrar el usuario</h3>: ""}
    <br/>
    <form className="form-register" onSubmit={addUser}>
      <div className="form-group">
        <label htmlFor="nombre">Nombre</label>
        <input type="text" name="nombre" onChange={change}/>
      </div>

      <div className="form-group">
        <label htmlFor="nick">Nick</label>
        <input type="text" name="nick" onChange={change}/>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" onChange={change}/>
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="text" name="password" onChange={change}/>
      </div>
      
      <input className="btn btn-success" type="submit" value="Resgistrar"/>
    </form>
    </>
  )
}
