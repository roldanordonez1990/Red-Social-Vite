import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { Constantes } from "../../helpers/Constantes";
import { Serialize } from "../../helpers/Serialize";

export const Config = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [flag3, setFlag3] = useState(false);
  const [flag4, setFlag4] = useState(false);

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
  
          if (data && data.message == Constantes.messages.updateUserOk) {
            console.log("Entro 1")
              setFlag(true);
              setFlag2(false);
              setFlag3(false);
              setFlag4(false);
              //seteamos el objeto auth con los nuevos valores cambiados
              //seteando aquí, conseguimos que los cambios se muestren al instante con el usuario actualizado
              //si recargamos la página, se setearan los datos de nuevo haciendo una petición a la BBDD para obtener el mismo resultado con el usuario ya actualizado
              //ya que sería el usuario registrado, ya actualizado en la BBDD
              setAuth(data.user_updated);
              //esto es opcional, seteamos el user del localStorage, ya que si no lo hacemos, tendría los datos del user del login
              //y si nos da por cambiar los datos del usuario, los del localStorage quedarían anticuados.
              localStorage.setItem("user", JSON.stringify(data.user_updated));
          }
          
  
          if (data.message == Constantes.messages.userRepeat) {
              setFlag(false);
              setFlag3(true);
              setFlag2(false);
              setFlag4(false);
              //Con este return a false nos aseguramos que no continúa el script para ejecutar el resto de código.
              //quedándose entonces parado con el aviso de la bandera roja.
              return false;
          }

          if (data.message == Constantes.messages.updateInputEmpty) {
              setFlag(false);
              setFlag2(false);
              setFlag3(false);
              setFlag4(true)
              return false;
          }
       
    } catch (error) {
        setFlag2(true);
        setFlag(false);
        console.log("Error en la petición relacionada con los datos.");
        return false;
    }

    try {
        //Subir imagen
        const fileInput = document.querySelector("#file");
        const formData = new FormData();
        formData.append("file", fileInput.files[0]);
        /*
        for (let [name, value] of formData) {
          //Vemos lo que contiene formData
          console.log("FORMDATA-->" + name, value);
        }
        */
        //Petición ajax para subir imagen del avatar
        if(fileInput.files[0]){
          const requestImg = await fetch(Constantes.url_api + "user/uploadAvatar",{
            method: "POST",
            headers: {
              Authorization: JSON.stringify(token),
            },
            body: formData
          }
        );

        const uploadImgData = await requestImg.json();
        if(uploadImgData && uploadImgData.message == Constantes.messages.updateAvatarOk){
            setFlag(true);
            setFlag2(false);
            console.log("user img-->:"+uploadImgData.user_updated_with_img.imagen);
            setAuth(uploadImgData.user_updated_with_img)
            localStorage.setItem("user", JSON.stringify(uploadImgData.user_updated_with_img));
          }
        if(uploadImgData.message == Constantes.messages.updateAvatarKo){
            setFlag(false);
            setFlag2(true);
            return false;
        }

        }else{
          console.log("Has preferido no cambiar tu avatar.")
        }
       
    } catch (error) {
        setFlag2(true);
        setFlag(false);
        console.log("Error en la petición relacionada con la imagen.");
    }  
  };
      
  return (
    <>
      <header className="aside__header">
        <h1 className="aside__title">Ajustes</h1>
      </header>
      {flag && <h3 className="alert alert-success">Has actualizado tu usuario con éxito</h3>}
      {flag2 &&<h3 className="alert alert-danger">No ha sido posible actualizar tu usuario</h3>}
      {flag3 &&<h3 className="alert alert-danger">Este usuario ya existe</h3>}
      {flag4 &&<h3 className="alert alert-danger">No puedes actualizar con los campos vacíos</h3>}
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
          <input id="file" type="file" name="file" />
        </div>
        <br />
        <input className="btn btn-success" type="submit" value="Actualizar" />
      </form>
      <br />
    </>
  );
};
