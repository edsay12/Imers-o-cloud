import "./login.sass";
import loginImg from "../../assets/imgs/login.svg";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { useContext, useState } from "react";
import Axios from "../../utils/AxiosConfig";
import { Loading } from "../../components/loading/Loading";
import { toast } from "react-toastify";
import AuthContext from "../../context/authContext";

export function Login() {
  const [isloading, setIsloading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { user, setUser } = useContext(AuthContext); // context
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();

    setIsloading(true);

    try {
      const response = await Axios.post("/user/signIn", {
        email,
        password,
      });

      localStorage.setItem(
        "UserAcess",
        JSON.stringify(response.data.AuthenticationResult)
      );
      setIsloading(false);
      const getToken1 = localStorage.getItem("UserAcess");
      const getToken = JSON.parse(getToken1!);

      await Axios.get("/user/getS3BucketName", {
        headers: {
          IdToken: getToken.IdToken,
        },
      }).then((response) => {
        localStorage.setItem("bucketName", response.data.bucketName);
      });

      toast.success("Login efetuado com sucesso");
      navigate("/");
    } catch (e: any) {
      setIsloading(false);
      toast.error("Email ou senha incorretos");
    }
  }
  return (
    <section className="login-page">
      <Loading isLoading={isloading} />
      <div className="login">
        <div className="loginLeft">
          <img src={loginImg} alt="" />
        </div>
        <div className="loginRight">
          <h1>Login</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="inputs">
              <div className="inputStyled">
                <FaUserAlt />
                <input
                  type="email"
                  placeholder="Seu Email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="inputStyled">
                <FaLock />
                <input
                  type="password"
                  placeholder="Sua Senha"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button>Entrar</button>
          </form>
          <div className="resetPassword">
            <Link to={"/cadastro"}>Criar uma nova conta</Link>
            <Link to={"/resetPassword"}>Esqueceu sua senha ? </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
