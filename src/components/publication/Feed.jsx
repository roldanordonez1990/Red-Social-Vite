import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Constantes } from "../../helpers/Constantes";
import { PublicationProfile } from "./publicationProfile";
import AuthContext from "../../context/AuthProvider";
import { useContext } from "react";

export const Feed = () => {

    //Id del usuario que nos llega por la url
    const { userId } = useParams();
    let {pageParams} = useParams();
    const { auth } = useContext(AuthContext);
    const token = localStorage.getItem("token");
    const[page, setPage] = useState(1);
    const[totalPage, setTotalPage] = useState();
    const [publication, setPublication] = useState([]);
    const [warning, setWarning] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      //Métodos externos para extraer los datos del ususario y los seguidores desde una petición, y no desde el auth registrado
      getPublication();
    }, [page, pageParams, totalPage]);

    const getPublication = async() =>{
    if(pageParams !== undefined){
      setPage(parseInt(pageParams))
    }
    const request = await fetch(Constantes.url_api+"publication/feed/"+page, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.stringify(token)
      }
    })

    const data = await request.json();
    if(data && data.message == Constantes.messages.feedNoPublications){
      navigate("/feed/"+1);
    }
    if(data && data.message == Constantes.messages.feedOk){
      setWarning(false)
      setPublication(data.feed_publications)
      setTotalPage(data.total_pages)
    }
  }

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

  const reload = () =>{
    location.reload()
  }

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Feed</h1>
        <button className="content__button" onClick={(e) => reload(e)}>Mostrar nuevas</button>
      </header>
      {warning ? <h3>No hay publicaciones que mostrar.</h3> : (
        <PublicationProfile publication={publication} token={token} setPublication={setPublication} userId={userId} auth={auth}/>
      )}
      {/*Botones Next y Previous*/}
      <div className="content__container-btn">
        {page == 1 || pageParams == 1 || warning ? "" : (
          <Link to={"/private/feed/"+(page-1)}>
          <button className="content__btn-more-post-prev" onClick={previousPage}>
              Previous page
          </button>
          </Link>
        )}
        {page == totalPage || pageParams == totalPage || warning ? "" : (
          <Link to={"/private/feed/"+(page+1)}>
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
