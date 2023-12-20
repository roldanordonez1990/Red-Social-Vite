import { Constantes } from "../../helpers/Constantes";
import { useState } from "react";
import { useEffect } from "react";
import { ListadoPeople } from "./ListadoPeople";
import AuthContext from "../../context/AuthProvider";
import { useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export const People = () => {
  
  let {pageParams} = useParams();
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([{}]);
  const [following, setFollowing] = useState([]);
  const { auth } = useContext(AuthContext);
  const[page, setPage] = useState(1);
  const[totalPage, setTotalPage] = useState();
  const [flag, setFlag] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getListUsers();
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
      if(isNaN(pageParams)){
        navigate("/private/people/1");
      }else{
        setPage(parseInt(pageParams))
      }
    }
   
    try {
      const request = await fetch(Constantes.url_api + "user/listUser/"+ page, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.stringify(token),
        },
      });
      const data = await request.json();
      if(data && data.message == Constantes.messages.listUsersKo){
        navigate("/private/people/1");
      }
      if (data && data.message == Constantes.messages.listUsersOk) {
        setFlag(false);
        setTotalPage(data.total_pages);
        //Hacemos un filtro para que no se nos muestre nuestro propio usuario
        let users_less_me = data.users.filter(users => users._id !== auth._id);
          setUsers(users_less_me);
          //Array de usuarios que sigo
          setFollowing(data.following);
          console.log("Following: " + following)
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
        <ListadoPeople userId={auth._id} users={users} following={following} setFollowing={setFollowing} token={token}/>
      ) : (
        <>
          <header className="content__header">
            <h1 className="content__title">People</h1>
          </header>
          <h3>No hay usuarios que mostrar</h3>
        </>
      )}
        {/*Botones Next y Previous*/}
        <div className="content__container-btn">
        {page == 1 || pageParams == 1 ? "" : (
          <Link to={"/private/people/"+(page-1)}>
          <button className="content__btn-more-post-prev" onClick={previousPage}>
              Previous page
          </button>
          </Link>
        )}
        {page == totalPage || pageParams == totalPage ? "" : (
          <Link to={"/private/people/"+(page+1)}>
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
