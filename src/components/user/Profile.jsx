import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Constantes } from "../../helpers/Constantes";
//import { GetDataProfile } from "../../helpers/GetDataProfile";
import avatar from "../../../src/assets/img/user.png";
import { GetDataProfile } from "../../helpers/GetDataProfile";
import { GetCounters } from "../../helpers/GetCounters";
import AuthContext from "../../context/AuthProvider";
import { useContext } from "react";

export const Profile = () => {
  //Id del usuario que nos llega por la url
  const { userId } = useParams();
  const [userDataProfile, setUserDataProfile] = useState({});
  const [counters, setCounters] = useState({});
  const { auth } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    //Métodos externos para extraer los datos del ususario y los seguidores desde una petición, y no desde el auth registrado
    GetDataProfile(userId, setUserDataProfile, token);
    GetCounters(userId, setCounters, token)
    //Esto sólo es por si cambiamos de un perfil al nuestro, para que se actualice en la página
    //Ya que el useEfect se ejecutará cuando cambie el id
    if(userId === auth._id){
    GetDataProfile(auth._id, setUserDataProfile, token);
    GetCounters(auth._id, setCounters, token)
    }
  },userId);

  return (
    <>
        <header>
            <h2>Perfil de usuario</h2>
        </header>
        <div className="aside__container">
          <div className="aside__profile-info">
            <div className="profile-info__general-info">
              <div className="general-info__container-avatar">
              {userDataProfile.imagen != "default.png" ? (
                  <img
                    src={Constantes.url_api + "user/getAvatar/" + userDataProfile.imagen}
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
                <Link>
                  <p className="container-names__name">{userDataProfile.nombre}</p>
                </Link>
                <Link>
                  <p className="container-names__nickname">{userDataProfile.nick}</p>
                </Link>
              </div>
            </div>

            <div className="profile-info__stats">
              <div className="stats__following">
                <Link to={"/private/following/"+userDataProfile._id} className="following__link">
                  <span className="following__title">Siguiendo</span>
                  <span className="following__number">{counters.following}</span>
                </Link>
              </div>
              <div className="stats__following">
                <Link to={"/private/followers/"+userDataProfile._id} className="following__link">
                  <span className="following__title">Seguidores</span>
                  <span className="following__number">{counters.followers}</span>
                </Link>
              </div>

              <div className="stats__following">
                <Link to={"/private/profile/"+userDataProfile._id} className="following__link">
                  <span className="following__title">Publicaciones</span>
                  <span className="following__number">{counters.publication}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};
