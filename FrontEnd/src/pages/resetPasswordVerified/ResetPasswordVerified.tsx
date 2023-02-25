import "./ResetPasswordVerified.sass";
import resetPasswordImg from "../../assets/imgs/cadastro.svg";
import { Link } from "react-router-dom";
import { FaLock, FaLockOpen, FaUserAlt } from "react-icons/fa";

export function ResetPasswordVerified() {
  return (
    <section className="resetPassword-page">
      <div className="resetPassword">
        <div className="resetPasswordLeft">
          <img src={resetPasswordImg} alt="" />
        </div>
        <div className="resetPasswordRight">
          <h1>Redefinir sua senha</h1>
          <form action="">
            <div className="inputs">
            <div className="inputStyled">
                <FaLock />
                <input type="password" placeholder="Digite sua nova senha" name="" id="" />
              </div>
              <div className="inputStyled">
                <FaLockOpen />
                <input type="password" placeholder="Repita sua nova senha" name="" id="" />
              </div>

    
            </div>

            <button>Enviar </button>
          </form>
          
        
        </div>
      </div>
    </section>
  );
}
