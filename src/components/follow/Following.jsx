import { Constantes } from "../../helpers/Constantes";
import { useState } from "react";
import { useEffect } from "react";
//import AuthContext from "../../context/AuthProvider";
//import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ListadoPeople } from "../user/ListadoPeople";
import { GetDataProfile } from "../../helpers/GetDataProfile";

export const Following = () => {
  
  let {pageParams} = useParams();
  let {userId} = useParams();
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([{}]);
  const [following, setFollowing] = useState([]);
  const[page, setPage] = useState(1);
  const[totalPage, setTotalPage] = useState();
  const [flag, setFlag] = useState(true);
  const [userDataProfile, setUserDataProfile] = useState({})

  useEffect(() => {
    getListUsers();
    GetDataProfile(userId, setUserDataProfile, token);
  }, [page, pageParams]);

  const nextPage = () =>{
    let next = page +1
    pageParams = next;
    setPage(next);
    getListUsers();
  }

  const previousPage = () =>{
    let prev = page -1
    pageParams(prev);
    setPage(prev);
    getListUsers();
  }

  const getListUsers = async () => {
    if(pageParams !== undefined){
      setPage(parseInt(pageParams))
    }
    try {
      const request = await fetch(Constantes.url_api + "follow/following/"+userId+"/"+ page, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.stringify(token),
        },
      });
      const data = await request.json();
      if (data && data.message == Constantes.messages.listadoFollowingOk) {
          setFlag(false)
          //El resultado llega como un array de objetos dentro de la petición. 
          //Hay que sacar el array para poder recorrerlo y sacar el resultado de los objetos
          let cleanFollowing = [];
          //Array para tener los id de los following, ya que en esta petición no los recibimos
          let cleanIdFollowings = [];
          data.following.forEach(users =>{
            cleanFollowing.push(users.followed);
            cleanIdFollowings.push(users.followed._id)
          })
    
        setUsers(cleanFollowing)
        setFollowing(cleanIdFollowings)
        setTotalPage(data.total_pages)
      }

      if(data && data.message == Constantes.messages.listadofollowingKo) { 
        setFlag(false);
        setUsers(0)
      }

    } catch (error) {
      console.log("Error en la petición following");
    }
  };

  return (
    <>
      <header className="content__header">
        <h2 className="content__title">Usuarios que sigue: {userDataProfile.nombre}</h2>
      </header>
      {flag ? (
        <h3>Cargando...</h3>
      ) : users.length >= 1 ? (
        <ListadoPeople users={users} setUsers={setUsers} following={following} setFollowing={setFollowing} token={token}/>
      ) : (
        <>
          <h3>No hay usuarios que mostrar</h3>
        </>
      )}
        {/*Botones Next y Previous*/}
        <div className="content__container-btn">
        {page == 1 || pageParams == 1 ? "" : (
          <Link to={"/private/following/"+userId+"/"+(page-1)}>
          <button className="content__btn-more-post-prev" onClick={previousPage}>
              Previous page
          </button>
          </Link>
        )}
        {page == totalPage || pageParams == totalPage ? "" : (
          <Link to={"/private/following/"+userId+"/"+(page+1)}>
          <button className="content__btn-more-post" onClick={nextPage}>
            Next page
          </button>
          </Link>
        )} 
        </div>
        <br/>
    </>
  );
};
