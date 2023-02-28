import "./ResetPasswordVerified.sass";
import resetPasswordImg from "../../assets/imgs/cadastro.svg";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaLockOpen, FaUserAlt } from "react-icons/fa";
import { useState } from "react";
import Axios from "../../utils/AxiosConfig";
import { toast } from "react-toastify";

export function ResetPasswordVerified() {
  const email = localStorage.getItem('email')
  const code = localStorage.getItem('code')
  const [newPassword1,setNewPassword1] = useState('')
  const [newPassword2,setNewPassword2] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(newPassword1 != newPassword2){
      return toast.error('Senhas não conferem')
    }
    try {
      const response = await Axios.post("/user/newPassword", {
        email,
        code,
        newPassword:newPassword1
      });
      
      
      toast.success('nova senha configurada com sucesso')
      navigate('/login')
    } catch (e: any) {
      console.log(e);
    
      toast.error('Ocorreu alguns problemas ao trocar sua senha.')
    }
  }
  return (
    <section className="resetPassword-page">
      <div className="resetPassword">
        <div className="resetPasswordLeft">
          <img src={resetPasswordImg} alt="" />
        </div>
        <div className="resetPasswordRight">
          <h1>Redefinir sua senha</h1>
          <form action="" onSubmit={handleSubmit}>
            <div className="inputs">
            <div className="inputStyled">
                <FaLock />
                <input type="password" placeholder="Digite sua nova senha" onChange={(e)=>setNewPassword1(e.target.value)} name="" id="" />
              </div>
              <div className="inputStyled">
                <FaLockOpen />
                <input type="password" placeholder="Repita sua nova senha" onChange={(e)=>setNewPassword2(e.target.value)} name="" id="" />
              </div>

    
            </div>

            <button>Enviar </button>
          </form>
          
        
        </div>
      </div>
    </section>
  );
}
