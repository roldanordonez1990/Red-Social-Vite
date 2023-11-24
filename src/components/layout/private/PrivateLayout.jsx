import { Navigate, Outlet } from "react-router-dom";
import { HeaderPriv } from "./HeaderPriv";
import { Sidebar } from "./Sidebar";
import AuthContext from "../../../context/AuthProvider";
import { useContext } from "react";

export const PrivateLayout = () => {

  const {auth, loading} = useContext(AuthContext);
  if(loading) {
    return <h1>Cargando datos...</h1>
  }else{
    return (
      <>
        <HeaderPriv />
        <section className="layout__content">
          {/*Con Outlet se estará cargando el componente de las Sub-rutas que estén asignadas al componente padre*/}
          {auth.id ? (
            <Outlet />
          ):(
            <Navigate to="/login"/>
          )}
            
        </section>
        {/*Barra lateral*/}
        <Sidebar/>
      </>
    )
  }
};
