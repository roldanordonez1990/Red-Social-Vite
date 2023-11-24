import { Routes, Route, BrowserRouter } from "react-router-dom";
import { PrivateLayout } from "../components/layout/private/PrivateLayout";
import { Login } from "../components/user/Login";
import { PublicLayout } from "../components/layout/public/PublicLayout";
import { Register } from "../components/user/Register";
import { Error } from "../components/user/Error";
import { Feed } from "../components/publication/Feed";
import { AuthProvider } from "../context/AuthProvider";
//import { HeaderPubl } from "../components/layout/public/HeaderPubl";
//import { HeaderPriv } from "../components/layout/private/HeaderPriv";


export const RouterMain = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout/>}>
            <Route index element={<Login/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="*" element={<Error/>}/>
          </Route>

          <Route path="/private" element={<PrivateLayout/>}>
            <Route index element={<Feed/>}/>
            <Route path="feed" index element={<Feed/>}/>
            <Route path="*" element={<Error/>}/>
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
