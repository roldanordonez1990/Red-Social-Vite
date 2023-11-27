import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { Constantes } from "../../helpers/Constantes";
import { Serialize } from "../../helpers/Serialize";

export const Config = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);

  const token = localStorage.getItem("token");

  const updateUser = async (e) => {
    e.preventDefault();
    let obj = Serialize(e.target);
    try {
      const request = await fetch(Constantes.url_api + "user/updateUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.stringify(token),
        },
        body: JSON.stringify(obj),
      });
      const data = await request.json();
      if(data.message == "Has actualizado tu usuario correctamente."){
          setTimeout(() => {
            setFlag(true);
            setFlag2(false);
            //seteamos el objeto auth con los nuevos valores cambiados
            setAuth(data.user_updated);
          }, 2000);
          //No enviamos la pass por cliente
          delete data.user_updated.password;
          //utiliza el operador spread (...) para combinar los contenidos de los dos objetos (auth y data.user_updated) en un nuevo objeto. Al hacerlo, los valores del objeto data.user_updated sobrescribirán los valores correspondientes del objeto auth
          //setAuth({ ...auth, ...data.user_updated })
      }
      if(data.message == "No puedes actualizar con los campos vacíos."){
        setTimeout(() => {
          setFlag2(true);
          setFlag(false);
        }, 2000);
      }
      console.log(data.user_updated);

    } catch (error) {
      setFlag2(true);
      setFlag(false);
      console.log("Error en la petición.");
    }
  };

  return (
    <>
      <header className="aside__header">
        <h1 className="aside__title">Ajustes</h1>
      </header>
      {flag && <h3 className="alert alert-success">Has actualizado tu usuario con éxito</h3>}
      {flag2 && <h3 className="alert alert-danger">No ha sido posible actualizar tu usuario</h3>}
      <form className="form-register" onSubmit={updateUser}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" name="nombre" defaultValue={auth.nombre} />
        </div>

        <div className="form-group">
          <label htmlFor="nick">Nick</label>
          <input type="text" name="nick" defaultValue={auth.nick} />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Biografía</label>
          <textarea name="bio" defaultValue={auth.bio} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" defaultValue={auth.email} />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="text" name="password" />
        </div>

        <div className="form-group">
          <label htmlFor="file">Avatar</label>
          <input type="file" name="file" />
        </div>
        <br />
        <input className="btn btn-success" type="submit" value="Actualizar" />
      </form>
    </>
  );
};
