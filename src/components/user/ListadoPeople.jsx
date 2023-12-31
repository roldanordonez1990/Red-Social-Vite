import { Link } from "react-router-dom";
import avatar from "../../../src/assets/img/user.png";
import { Constantes } from "../../helpers/Constantes";
import AuthContext from "../../context/AuthProvider";
import { useContext } from "react";
import ReactTimeAgo from 'react-time-ago';

export const ListadoPeople = ({ userId, users, following, setFollowing, token }) => {

  const { auth } = useContext(AuthContext);

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
        //Seteamos el nuevo estado de following agregando el nuevo user que seguimos
        //De esta forma el botón cambiará automáticamente
        setFollowing([...following, data.followed_user])
        
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
          //Una vez eliminado, seteamos el array de following filtrando menos el que acabamos de eliminar
          let following_new = following.filter(followId => followId !== _id);
          setFollowing(following_new);
        }
        
      } catch (error) {
        console.log("Error en la petición unFollow")
      }
   }
  
  return users.map((user) => {

    return (
      <>
        <article key={user._id} className="content__posts" >
          <div className="posts__post">
            <div className="post__container">
              <div className="post__image-user">
                <Link to={"/private/profile/"+user._id} className="post__image-link">
                  {user.imagen != "default.png" ? (
                    <img
                      src={Constantes.url_api + "user/getAvatar/" + user.imagen}
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
                </Link>
              </div>

              <div className="post__body">
                <div className="post__user-info">
                  <Link to={"/private/profile/"+user._id} className="user-info__name">
                    {user.nombre}
                  </Link>
                  <span className="user-info__divider"> | </span>
                  <span className="user-info__create-date">
                    <ReactTimeAgo date={user.created_at} locale="es-ES"/>
                  </span>
                </div>
                {user.bio ? (
                  <h4 className="post__content">{user.bio}</h4>
                ) : (
                  <h4 className="post__content">No hay bio que mostrar</h4>
                )}
              </div>
            </div>
            {(user._id == auth._id) || (userId != auth._id) ? "" : (
              <div className="post__buttons">
              {/*Si en el array de following no se incluyen los id del listado, es que NO los seguimos */}
              {!following.includes(user._id) ? (
                <button className="post__button-follow" onClick={() =>follow(user._id)}>
                  Seguir
                </button>
              ): ""}
              
              {/*Si en el array de following se incluyen los id del listado, es que los seguimos */}
              {following.includes(user._id) ? (
                <button className="post__button" onClick={() => unFollow(user._id)}>
                Dejar de seguir
               </button>
              ): ""}     
            </div>
            )}
          </div>
        </article>
      </>
    );
  });
};


