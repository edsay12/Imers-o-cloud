import "./resetPassword.sass";
import resetPasswordImg from "../../assets/imgs/cadastro.svg";
import { Link } from "react-router-dom";
import { FaLock, FaUserAlt } from "react-icons/fa";

export function ResetPassword() {
  return (
    <section className="resetPassword-page">
      <div className="resetPassword">
        <div className="resetPasswordLeft">
          <img src={resetPasswordImg} alt="" />
          <Link to={"/cadastro"}>Criar uma nova conta</Link>
        </div>
        <div className="resetPasswordRight">
          <h1>Redefinir sua senha</h1>
          <p>Digite seu email para que possamos enviar um codigo para alteração da sua senha</p>
          <form action="">
            <div className="inputs">
              <div className="inputStyled">
                <FaUserAlt />
                <input type="text" placeholder="Seu Email" name="" id="" />
              </div>

    
            </div>

            <button>Enviar </button>
          </form>
          
        
        </div>
      </div>
    </section>
  );
}
