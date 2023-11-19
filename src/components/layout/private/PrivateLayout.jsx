import { Outlet } from "react-router-dom";
import { HeaderPriv } from "./HeaderPriv";
import { Sidebar } from "./Sidebar";

export const PrivateLayout = () => {
  return (
    <>
      <HeaderPriv />
      <section className="layout__content">
        {/*Con Outlet se estará cargando el componente de las Sub-rutas que estén asignadas al componente padre*/}
        <Outlet />
      </section>
      {/*Barra lateral*/}
      <Sidebar/>
    </>
  )
}
