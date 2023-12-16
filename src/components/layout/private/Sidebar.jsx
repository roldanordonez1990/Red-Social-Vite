import avatar from "../../../../src/assets/img/user.png";
import AuthContext from "../../../context/AuthProvider";
import { useContext } from "react";
import { Constantes } from "../../../helpers/Constantes";
import { Link } from "react-router-dom";
import { Serialize } from "../../../helpers/Serialize";

export const Sidebar = () => {
  //useContext donde viene toda la info del usuario
  const { auth, counter } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const savePublication = async(e) =>{
    e.preventDefault();
    //alert(e.target.text.value)
    let publication = Serialize(e.target);
    
    try {
      const request = await fetch(Constantes.url_api+"publication/addPublication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.stringify(token),
        },
        body: JSON.stringify(publication)
      })
  
      const data = await request.json();
      if(data && data.message == Constantes.messages.publicationOk){
        document.getElementById("formulario").reset();
        alert("Publicación con éxito")
        console.log("OK");
        console.log(data.new_publication);
      }

      if(data && data.message == Constantes.messages.publicationKo) alert("Error en la publicación")

    } catch (error) {
      console.log("Error en la petición de publicación.")
    }
    
  }

  return (
    <>
      <aside className="layout__aside">
        <header className="aside__header">
          <h1 className="aside__title">Hola, {auth.nombre}</h1>
        </header>

        <div className="aside__container">
          <div className="aside__profile-info">
            <div className="profile-info__general-info">
              <div className="general-info__container-avatar">
                {auth.imagen != "default.png" ? (
                  <img
                    src={Constantes.url_api + "user/getAvatar/" + auth.imagen}
                    className="container-avatar__img"
                    alt="Foto de perfil"
                  />
                ) : (
                  <img
                    src={avatar}
                    className="container-avatar__img"
                    alt="Foto de perfil"
                  />
                )}
              </div>
              <div className="general-info__container-names">
                <a href="#" className="container-names__name">
                  {auth.nombre}
                </a>
                <p className="container-names__nickname">{auth.nick}</p>
              </div>
            </div>

            <div className="profile-info__stats">
              <div className="stats__following">
                <Link to={"following/"+auth._id} className="following__link">
                  <span className="following__title">Siguiendo</span>
                  <span className="following__number">{counter.following}</span>
                </Link>
              </div>
              <div className="stats__following">
                <Link to={"followers/"+auth._id} className="following__link">
                  <span className="following__title">Seguidores</span>
                  <span className="following__number">{counter.followers}</span>
                </Link>
              </div>

              <div className="stats__following">
                <a href="#" className="following__link">
                  <span className="following__title">Publicaciones</span>
                  <span className="following__number">
                    {counter.publication}
                  </span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="aside__container-form">
            <form id="formulario" className="container-form__form-post" onSubmit={savePublication}>
              <div className="form-post__inputs">
                <label name="post" className="form-post__label">
                  ¿Qué estás pesando hoy?
                </label>
                <textarea name="text" className="form-post__textarea"/>
               
              </div>

              <div className="form-post__inputs">
                <label name="image" className="form-post__label">
                  Sube tu foto
                </label>
                <input type="file" name="image" className="form-post__image" />
              </div>

              <input type="submit" value="Enviar" className="form-post__btn-submit"
              />
            </form>
          </div>
        </div>
      </aside>
    </>
  );
};
