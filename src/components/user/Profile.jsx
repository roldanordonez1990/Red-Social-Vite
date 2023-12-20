import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Constantes } from "../../helpers/Constantes";
import avatar from "../../../src/assets/img/user.png";
import { GetDataProfile } from "../../helpers/GetDataProfile";
import { GetCounters } from "../../helpers/GetCounters";
import AuthContext from "../../context/AuthProvider";
import { useContext } from "react";
import { PublicationProfile } from "../publication/publicationProfile";

export const Profile = () => {
  //Id del usuario que nos llega por la url
  const { userId } = useParams();
  let {pageParams} = useParams();
  const [userDataProfile, setUserDataProfile] = useState({});
  const [counters, setCounters] = useState({});
  const { auth } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [iFollow, setIfollow] = useState(false);
  const[page, setPage] = useState(1);
  const[totalPage, setTotalPage] = useState();
  const [publication, setPublication] = useState([]);
  const [warning, setWarning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //Métodos externos para extraer los datos del ususario y los seguidores desde una petición, y no desde el auth registrado
    getDataUser();
    GetCounters(userId, setCounters, token);
    getPublication();
    //Esto sólo es por si cambiamos de un perfil al nuestro, para que se actualice en la página
    //Ya que el useEfect se ejecutará cuando cambie el id
    if (userId === auth._id) {
      GetDataProfile(auth._id, setUserDataProfile, token);
      GetCounters(auth._id, setCounters, token);
    }
  }, [userId, page, pageParams, totalPage]);

  const nextPage = () =>{
    let next = page +1
    pageParams = next;
    setPage(next);
    getPublication();
  }

  const previousPage = () =>{
    let prev = page -1
    pageParams(prev);
    setPage(prev);
    getPublication();
  }

  const getDataUser = async() =>{
    let data = await GetDataProfile(userId, setUserDataProfile, token);
    //Comprobamos si seguimos a este user desde la petición
    if(data.following.followed) setIfollow(true);
  }

  const getPublication = async() =>{
    if(pageParams !== undefined){
      setPage(parseInt(pageParams))
    }
    const request = await fetch(Constantes.url_api+"publication/getPublicationsUser/"+userId+"/"+page, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.stringify(token)
      }
    })

    const data = await request.json();
    if(data && data.message == Constantes.messages.publicationProfileNoList){
      setWarning(true)
      navigate("/private/profile/"+userId+"/"+1);
    } 
    if(data && data.message == Constantes.messages.publicationProfileOk){
      setWarning(false)
      setPublication(data.publications)
      setTotalPage(data.total_pages)
    }
  }

  //Seguir a un usuario
  const follow = async(_id) =>{
    try {
      const request = await fetch(Constantes.url_api+"follow/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.stringify(token),
        },
        body: JSON.stringify({followed: _id})
      })

      const data = await request.json();
      if(data && data.message == Constantes.messages.followOk){
        setIfollow(true)
      }
    } catch (error) {
      console.log("Error en la petición follow")
    }  
   }

   //Dejar de seguir a un usuario
   const unFollow = async(_id) =>{
      try {
        const request = await fetch(Constantes.url_api+"follow/unFollowed/" +_id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.stringify(token)
          }
        })

        const data = await request.json();

        if(data && data.message == Constantes.messages.unFollowOk){
          setIfollow(false)
        }
        
      } catch (error) {
        console.log("Error en la petición unFollow")
      }
   }

  return (
    <>
      <header>
        <h2>Perfil de usuario</h2>
      </header>
      {!userDataProfile._id || userDataProfile._id == undefined ? (
        <h3>Este usuario que intentas buscar no existe.</h3>
      ) : (
        <div className="aside__container">
          <div className="aside__profile-info">
            <div className="profile-info__general-info">
              <div className="general-info__container-avatar">
                {userDataProfile.imagen != "default.png" ? (
                  <img
                    src={
                      Constantes.url_api +
                      "user/getAvatar/" +
                      userDataProfile.imagen
                    }
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
                  <p className="container-names__name">
                    {userDataProfile.nombre}
                  </p>
                </Link>
                <Link>
                  <p className="container-names__nickname">
                    {userDataProfile.nick}
                  </p>
                </Link>
              </div>
            </div>

            <div className="profile-info__stats">
              <div className="stats__following">
                <Link
                  to={"/private/following/" + userDataProfile._id}
                  className="following__link"
                >
                  <span className="following__title">Siguiendo</span>
                  <span className="following__number">
                    {counters.following}
                  </span>
                </Link>
              </div>
              <div className="stats__following">
                <Link
                  to={"/private/followers/" + userDataProfile._id}
                  className="following__link"
                >
                  <span className="following__title">Seguidores</span>
                  <span className="following__number">
                    {counters.followers}
                  </span>
                </Link>
              </div>

              <div className="stats__following">
                <Link
                  to={"/private/profile/" + userDataProfile._id}
                  className="following__link"
                >
                  <span className="following__title">Publicaciones</span>
                  <span className="following__number">
                    {counters.publication}
                  </span>
                </Link>
              </div>
              {userDataProfile._id == auth._id ? "" : (
                <div className="stats__following-btn">
                {!iFollow ? (
                  <button className="post__button-follow" onClick={() => follow(userDataProfile._id)}>
                    Seguir
                  </button>
                ): (
                  <button className="post__button" onClick={() => unFollow(userDataProfile._id)}>
                    Dejar de seguir
                  </button>
                )}
                </div>
              )} 
            </div>
          </div>
        </div>
      )}
      {warning ? <h3>No hay publicaciones que mostrar.</h3> : (
        <PublicationProfile publication={publication}/>
      )}

      {/*Botones Next y Previous*/}
      <div className="content__container-btn">
        {page == 1 || pageParams == 1 || warning ? "" : (
          <Link to={"/private/profile/"+userId+"/"+(page-1)}>
          <button className="content__btn-more-post-prev" onClick={previousPage}>
              Previous page
          </button>
          </Link>
        )}
        {page == totalPage || pageParams == totalPage || warning ? "" : (
          <Link to={"/private/profile/"+userId+"/"+(page+1)}>
          <button className="content__btn-more-post" onClick={nextPage}>
            Next page
          </button>
          </Link>
        )} 
        </div>
        <br/>
    </>
  )
};
