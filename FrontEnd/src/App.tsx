import { useState } from "react";

import { Navigate, Route, Router, Routes } from "react-router-dom";
import { DeskBoard } from "./pages/deskboard/deskboard";

import { PageContainer } from "./components/pageContainer/PageContainer";
import { PageTitle } from "./components/pageTitle/pageTitle";
import { Home } from "./pages/home/home";
import { Arquivados } from "./pages/Arquivados/arquivados";
import { Lixeira } from "./pages/Lixeira/lixeira";
import { Upload } from "./pages/upload/UploadArquivo";
import { Armazenamento } from "./pages/armazenamento/armazenamento";
import CardModalContext from "./context/cardModalContext";
import AuthContext from "./context/authContext";
("./context/cardModalContext");
import CardPageReload from "./context/cardPageReload";
import { toast, ToastContainer } from "react-toastify";
import { Login } from "./pages/login/Login";
import { Cadastro } from "./pages/Cadastro/Cadastro";
import { ResetPassword } from "./pages/resetPassword/ResetPassword";
import { VerifyCode } from "./pages/verifyCode/VerifyCode";
import { ResetPasswordVerified } from "./pages/resetPasswordVerified/ResetPasswordVerified";
import { VerifyCodePass } from "./pages/verifyCodePass/VerifyCode";
import Axios from "./utils/AxiosConfig";
import GetToken from "./utils/GetToken";

type ModalCard = {
  isModalCardOpen: any;
  setIsCardModalOpen: any;
};

function PrivateRoute({
  children,
  redirectTo,
}: {
  children: JSX.Element;
  redirectTo: string;
}) {
  var isAuthenticate = false;
  const getUser = localStorage.getItem("UserAcess")
    ? (isAuthenticate = true)
    : (isAuthenticate = false);

  const token = GetToken();
  Axios.get("/verifyToken", {
    headers: {
      Authorization: token,
    },
  })
    .then(() => {})
    .catch((e) => {
      
      localStorage.removeItem("UserAcess");
    });

  if (isAuthenticate) {
    const getToken1 = localStorage.getItem("UserAcess");
    const getToken = JSON.parse(getToken1!);
    Axios.get("/user/getS3BucketName", {
      headers: {
        IdToken: getToken.IdToken,
      },
    }).then((response) => {
      localStorage.setItem("bucketName", response.data.bucketName);
    });
  }

  return isAuthenticate ? children : <Navigate to={redirectTo} />;
}

function IsLoged({ children, redirectTo }) {
  let isAuthenticate = false
  const getUser = localStorage.getItem("UserAcess")
    ? (isAuthenticate = true)
    : (isAuthenticate = false);

  const token = GetToken();
  Axios.get("/verifyToken", {
    headers: {
      Authorization: token,
    },
  })
    .then(() => {})
    .catch((e) => {
     
      localStorage.removeItem("UserAcess");
    });
  

  return !isAuthenticate ? children : <Navigate to={redirectTo} />;
}

function App() {
  const [count, setCount] = useState(0);
  const [isCardReload, setIsCardReload] = useState<any>(false);
  const [isModalCardOpen, setIsCardModalOpen] = useState<any>(false);
  const [user, setUser] = useState<any>(false);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AuthContext.Provider value={{ user, setUser }}>
        <CardPageReload.Provider value={{ isCardReload, setIsCardReload }}>
          <CardModalContext.Provider
            value={{ isModalCardOpen, setIsCardModalOpen }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute
                    redirectTo={"/login"}
                    children={<DeskBoard children={<Home />} />}
                  />
                }
              />
              <Route
                path="/upload"
                element={
                  <PrivateRoute
                    redirectTo={"/login"}
                    children={<DeskBoard children={<Upload />} />}
                  />
                }
              />
              <Route
                path="/armazenamento"
                element={
                  <PrivateRoute
                    redirectTo={"/login"}
                    children={<DeskBoard children={<Armazenamento />} />}
                  />
                }
              />
              <Route
                path="/arquivado"
                element={
                  <PrivateRoute
                    redirectTo={"/login"}
                    children={<DeskBoard children={<Arquivados />} />}
                  />
                }
              />
              <Route
                path="/lixeira"
                element={
                  <PrivateRoute
                    redirectTo={"/login"}
                    children={<DeskBoard children={<Lixeira />} />}
                  />
                }
              />
              <Route
                path="/configuraçoes"
                element={
                  <PrivateRoute
                    redirectTo={"/login"}
                    children={<DeskBoard children={<h1>configuraçoes</h1>} />}
                  />
                }
              />
              <Route
                path="/help"
                element={
                  <PrivateRoute
                    redirectTo={"/login"}
                    children={<DeskBoard children={<h1>help</h1>} />}
                  />
                }
              />
              
              <Route path="/login"  element={<IsLoged redirectTo={'/'} children={<Login/>}/>} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
              <Route path="/verify" element={<VerifyCode />} />
              <Route path="/verifyPass" element={<VerifyCodePass />} />
              <Route path="/newPassword" element={<ResetPasswordVerified />} />
            </Routes>
          </CardModalContext.Provider>
        </CardPageReload.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
