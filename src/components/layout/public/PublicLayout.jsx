import { Outlet } from "react-router-dom";
import { HeaderPubl } from "./HeaderPubl";

export const PublicLayout = () => {
  return (
    <>
      <HeaderPubl />
      <section className="layout__content">
        {/*Con Outlet se estará cargando el componente de las Sub-rutas que estén asignadas al componente padre*/}
        <Outlet />
      </section>
    </>
  );
};
