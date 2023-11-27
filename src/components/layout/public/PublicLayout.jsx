import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { HeaderPubl } from "./HeaderPubl";
import AuthContext from "../../../context/AuthProvider";

export const PublicLayout = () => {

  const {auth, loading} = useContext(AuthContext);
  if(loading){
    return <h1>Cargando datos...</h1>
  }else{
    return (
      <>
        <HeaderPubl />
        <section className="layout__content">
          {!auth._id ? 
            <Outlet />
          :
            <Navigate to="/private"/>
          }
        </section>
      </>
    );
  }
};
