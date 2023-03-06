import "./verifyCode.sass";
import verifyCodeImg from "../../assets/imgs/cadastro.svg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaLock, FaUserAlt } from "react-icons/fa";
import OtpInput from "react-otp-input";
import { useContext, useState } from "react";
import AuthContext from "../../context/authContext";
import Axios from "../../utils/AxiosConfig";
import { toast } from "react-toastify";

export function VerifyCodePass() {
  const [otp, setOtp] = useState({ otp: "" });
  const email = localStorage.getItem('email')
  const navigate = useNavigate();

  async function verifyCode() {
    if(!otp.otp || otp.otp.length <6){
      return toast.error('Codigo invalido')

    }
    localStorage.setItem('code',otp.otp)
    navigate('/newPassword')
  }

  const handleChange = (otp: any) => setOtp({ otp });


  return (
    <section className="verifyCode-page">
      <div className="verifyCode">
        <h1>verificação do codigo</h1>
        <p>
          Digite o codigo enviado por email para que possamos verificar sua
          conta
        </p>
        <OtpInput
          className="otpInputs"
          value={otp.otp}
          onChange={handleChange}
          numInputs={6}
        />
        <button onClick={verifyCode}>Enviar</button>
      </div>
    </section>
  );
}
