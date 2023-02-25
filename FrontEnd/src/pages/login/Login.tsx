import "./login.sass";
import loginImg from "../../assets/imgs/login.svg";
import { Link } from "react-router-dom";
import { FaLock, FaUserAlt } from "react-icons/fa";

export function Login() {
  return (
    <section className="login-page">
      <div className="login">
        <div className="loginLeft">
          <img src={loginImg} alt="" />
          <Link to={"/cadastro"}>Create an account</Link>
        </div>
        <div className="loginRight">
          <h1>Login</h1>
          <form action="">
            <div className="inputs">
              <div className="inputStyled">
                <FaUserAlt />
                <input type="text" placeholder="Seu Email" name="" id="" />
              </div>

              <div className="inputStyled">
                <FaLock />
                <input type="password" placeholder="Sua Senha" name="" id="" />
              </div>
            </div>

            <button>Entrar</button>
          </form>
          <div className="resetPassword">
            <Link to={"/resetPassword"}>Esqueceu sua senha ? </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
