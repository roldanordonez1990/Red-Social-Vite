import avatar from "../../../src/assets/img/user.png";
import PropTypes from "prop-types";
import { Constantes } from "../../helpers/Constantes";

export const ListadoPeople = ({ users }) => {
  return users.map((user) => {
    return (
      <>
        <article className="content__posts" key={user._id}>
          <div className="posts__post">
            <div className="post__container">
              <div className="post__image-user">
                <a href="#" className="post__image-link">
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
                </a>
              </div>

              <div className="post__body">
                <div className="post__user-info">
                  <a href="#" className="user-info__name">
                    {user.nombre}
                  </a>
                  <span className="user-info__divider"> | </span>
                  <a href="#" className="user-info__create-date">
                    Hace 1 hora
                  </a>
                </div>
                {user.bio ? (
                  <h4 className="post__content">{user.bio}</h4>
                ) : (
                  <h4 className="post__content">No hay bio que mostrar</h4>
                )}
              </div>
            </div>

            <div className="post__buttons">
              <a href="#" className="post__button-follow">
                Seguir
              </a>
            </div>
          </div>
        </article>
      </>
    );
  });
};

//Les indicamos con proptypes qué tipo de variables deben ser, y si por ejemplo son requeridas o no
ListadoPeople.propTypes = {
  users: PropTypes.object,
  //setAuth: PropTypes.object
};
