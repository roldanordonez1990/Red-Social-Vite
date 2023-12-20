import { Constantes } from "../../helpers/Constantes";
import avatar from "../../../src/assets/img/user.png";

export const PublicationProfile = ({ publication }) => {
  
  return publication.map((publi) => {
    return (
      <>
        <div className="content__posts">
          <div className="posts__post">
            <div className="post__container">
              <div className="post__image-user">
                {publi.file ? (
                  <img
                    src={
                      Constantes.url_api +
                      "publication/getImgPublication/" +
                      publi.file
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
              <div className="post__body">
                <div className="post__user-info">
                  <a href="#" className="user-info__name">
                    {publi.user.nick}
                  </a>
                  <span className="user-info__divider"> | </span>
                  <a href="#" className="user-info__create-date">
                    {publi.created_at}
                  </a>
                </div>

                <h4 className="post__content">{publi.text}</h4>
              </div>
            </div>
            <div className="post__buttons">
              <a href="#" className="post__button">
                <i className="fa-solid fa-trash-can"></i>
              </a>
            </div>
          </div>
        </div>
      </>
    );
  });
};
