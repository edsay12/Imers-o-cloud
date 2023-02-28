import "./Cadastro.sass";
import cadastroImg from "../../assets/imgs/cadastro.svg";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaLockOpen, FaUserAlt } from "react-icons/fa";
import { GoLock } from "react-icons/go";
import { AiOutlineLock } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
import { IoMdUnlock } from "react-icons/io";
import { useContext, useState } from "react";
import Axios from "../../utils/AxiosConfig";
import { toast } from "react-toastify";
import AuthContext from "../../context/authContext";

export function Cadastro() {
  const [isloading,setIsloading] = useState(false)
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const { user, setUser } = useContext(AuthContext); // context
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    
    console.log(formData);
    setIsloading(true)

    if(password1 != password2){
      setIsloading(false)
      toast.error('Senhas não conferem')

    }

    try {
      const response = await Axios.post("/user/signUp", {
        email,
        password:password1
      });
      console.log(response.data.AuthenticationResult
        );
      setIsloading(false)
      setUser(email)
      toast.success('Um codigo foi enviado para seu email')
      navigate('/verify')
    } catch (e: any) {
      console.log(e);
      setIsloading(false)
      toast.error('Ocorreu algum problema ao fazer sua conta')
    }
  }
  return (
    <section className="cadastro-page">
      <div className="cadastro">
       
        <div className="cadastroLeft">
          <h1>Cadastro</h1>
          <form  onSubmit={(e)=> handleSubmit(e)}>
            <div className="inputs">
              <div className="inputStyled">
                <FaUserAlt />
                <input type="text" placeholder="Seu Email" onChange={(e) => setEmail(e.target.value)} name="" id="" />
              </div>

              <div className="inputStyled">
                <FaLock />
                <input type="password" placeholder="Sua Senha" onChange={(e)=>setPassword1(e.target.value)}  name="" id="" />
              </div>
              <div className="inputStyled">
                <FaLockOpen />
                <input type="password" placeholder="Repita sua Senha" onChange={(e)=>setPassword2(e.target.value)} name="" id="" />
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
