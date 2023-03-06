import "./resetPassword.sass";
import resetPasswordImg from "../../assets/imgs/cadastro.svg";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Axios from "../../utils/AxiosConfig";
import { useContext, useState } from "react";
import AuthContext from "../../context/authContext";

export function ResetPassword() {
  const [email, setEmail] = useState("");
 

  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    

    try {
      const response = await Axios.post("/user/forgotPassword", {
        email,
      });
      
      
      toast.success('Um codigo foi enviado para seu email')
      localStorage.setItem("email",email)
      navigate('/verifyPass')
    } catch (e: any) {
     
    
      toast.error('Ocorreu algum problema mandar o codigo')
    }
  }
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
          <form onSubmit={(e)=> handleSubmit(e)}>
            <div className="inputs">
              <div className="inputStyled">
                <FaUserAlt />
                <input type="text" placeholder="Seu Email" onChange={(e)=> setEmail(e.target.value)} name="" id="" />
              </div>

    
            </div>

            <button >Enviar </button>
          </form>
          
        
        </div>
      </div>
    </section>
  );
}
function setIsloading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

