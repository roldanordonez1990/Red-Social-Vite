import { useContext } from "react";
import { NavLink } from "react-router-dom";
import avatar from "../../../../src/assets/img/user.png";
import AuthContext from "../../../context/AuthProvider";
import { Constantes } from "../../../helpers/Constantes";

export const HeaderPriv = () => {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <header className="layout__navbar">
        <div className="navbar__header">
          <a href="#" className="navbar__title">
            FACEGRAM
          </a>
        </div>

        <nav className="navbar__container-lists">
          <ul className="container-lists__menu-list">
            <li className="menu-list__item">
              <NavLink to="/private" className="menu-list__link">
                <i className="fa-solid fa-house"></i>
                <span className="menu-list__title">Inicio</span>
              </NavLink>
            </li>

            <li className="menu-list__item">
              <NavLink to="/private/feed" className="menu-list__link">
                <i className="fa-solid fa-list"></i>
                <span className="menu-list__title">Timeline</span>
              </NavLink>
            </li>

            <li className="menu-list__item">
              <NavLink to="/private/people" className="menu-list__link">
                <i className="fa-solid fa-user"></i>
                <span className="menu-list__title">Gente</span>
              </NavLink>
            </li>

            <li className="menu-list__item">
              <a href="#" className="menu-list__link">
                <i className="fa-regular fa-envelope"></i>
                <span className="menu-list__title">Mensajes</span>
              </a>
            </li>
          </ul>

          <ul className="container-lists__list-end">
            <li className="list-end__item">
              <NavLink to={"profile/"+auth._id} className="list-end__link-image">
                {auth.imagen != "default.png" ? (
                  <img
                    src={Constantes.url_api + "user/getAvatar/" + auth.imagen}
                    className="list-end__img"
                    alt="Foto de perfil"
                  />
                ) : (
                  <img
                    src={avatar}
                    className="list-end__img"
                    alt="Foto de perfil"
                  />
                )}
              </NavLink>
            </li>
            <li className="list-end__item">
              <NavLink to={"profile/"+auth._id} className="list-end__link">
                <span className="list-end__name">{auth.nick}</span>
              </NavLink>
            </li>

            <li className="list-end__item">
              <NavLink to="/private/config" className="list-end__link">
                <i className="fa-solid fa-gear"></i>
                <span className="list-end__name">Ajustes</span>
              </NavLink>
            </li>
            <li className="list-end__item">
              <NavLink to="/private/logout" className="list-end__link">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <span className="list-end__name">Cerrar Sesión</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
