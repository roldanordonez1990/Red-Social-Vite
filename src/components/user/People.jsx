import { Constantes } from "../../helpers/Constantes";
//import { useState } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ListadoPeople } from "./ListadoPeople";
import AuthContext from "../../context/AuthProvider";
import { useContext } from "react";

export const People = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([{}]);
  const { auth } = useContext(AuthContext);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    getListUsers();
  }, []);

  const getListUsers = async () => {
    try {
      const request = await fetch(Constantes.url_api + "user/listUser/1", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.stringify(token),
        },
      });
      const data = await request.json();
      if (data && data.message == Constantes.messages.listUsersOk) {
        setFlag(false);
        //Hacemos un filtro para que no se nos muestre nuestro propio usuario
        let users_less_me = data.users.filter(
          (users) => users._id !== auth._id
        );
        setUsers(users_less_me);
      }
    } catch (error) {
      console.log("Error en la petición List");
    }
  };

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">People</h1>
      </header>
      {flag ? (
        <h3>Cargando...</h3>
      ) : users.length >= 1 ? (
        <ListadoPeople users={users} />
      ) : (
        <>
          <header className="content__header">
            <h1 className="content__title">People</h1>
          </header>
          <h3>No hay usuarios que mostrar</h3>
        </>
      )}
    </>
  );
};
