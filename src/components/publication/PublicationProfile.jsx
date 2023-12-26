import { Constantes } from "../../helpers/Constantes";
import avatar from "../../../src/assets/img/user.png";
import ReactTimeAgo from 'react-time-ago';

export const PublicationProfile = ({ publication, token, setPublication,  setFlagDeletePubli, auth, userId}) => {

  const removePublication = async(id) =>{
    const request = await fetch(Constantes.url_api+"publication/removePublication/" +id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.stringify(token)
      }
    })

    const data = await request.json();
    if(data && data.message == Constantes.messages.publicationDeleteOk){
      let new_list_publication = publication.filter(publi => publi._id != id)
      if(new_list_publication.length < 1){
        setFlagDeletePubli(true);
      }
      setPublication(new_list_publication);
    }
  }
  
  return publication.map((publi) => {
    return (
      <>
        <div className="content__posts" key={publi._id}>
          <div className="posts__post">
            <div className="post__container">
              <div className="post__image-user">
              {publi.user.imagen != "default.png" ? (
                  <img
                    src={Constantes.url_api + "user/getAvatar/" + publi.user.imagen}
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
              <div className="post__body">
                <div className="post__user-info">
                  <a href="#" className="user-info__name">
                    {publi.user.nick}
                  </a>
                  <span className="user-info__divider"> | </span>
                  <span className="user-info__create-date">
                    <ReactTimeAgo date={publi.created_at} locale="es-ES"/>
                  </span>
                </div>

                <h4 className="post__content">{publi.text}</h4>
              </div>
              
              <img className="post__publi-user" src={Constantes.url_api+"publication/getImgPublication/"+publi.file}/>
              
            </div>
            <div className="post__buttons">
              {auth._id != userId ? "" : (
                <button className="post__button" onClick={() => removePublication(publi._id)}>
                <i className="fa-solid fa-trash-can"></i>
              </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  });
};
