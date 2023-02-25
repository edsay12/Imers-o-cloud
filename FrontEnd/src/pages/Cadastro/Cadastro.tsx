import "./Cadastro.sass";
import cadastroImg from "../../assets/imgs/cadastro.svg";
import { Link } from "react-router-dom";
import { FaLock, FaLockOpen, FaUserAlt } from "react-icons/fa";
import { GoLock } from "react-icons/go";
import { AiOutlineLock } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
import { IoMdUnlock } from "react-icons/io";

export function Cadastro() {
  return (
    <section className="cadastro-page">
      <div className="cadastro">
       
        <div className="cadastroLeft">
          <h1>Cadastro</h1>
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
              <div className="inputStyled">
                <FaLockOpen />
                <input type="password" placeholder="Repita sua Senha" name="" id="" />
              </div>
            </div>

            <button>Entrar</button>
          </form>
          <div className="resetPassword">
            <Link to={"/login"}>Pagina de login </Link>
          </div>
        </div>
        <div className="cadastroRight">
          <img src={cadastroImg} alt="" />
          {/* <Link to={"/cadastro"}>Create an account</Link> */}
        </div>
      </div>
    </section>
  );
}
