import "./verifyCode.sass";
import verifyCodeImg from "../../assets/imgs/cadastro.svg";
import { Link } from "react-router-dom";
import { FaLock, FaUserAlt } from "react-icons/fa";
import OtpInput from "react-otp-input";
import { useState } from "react";

export function VerifyCode() {
  const [otp, setOtp] = useState({ otp: "" });

  const handleChange = (otp: any) => setOtp({ otp });
  console.log(otp);

  return (
    <section className="verifyCode-page">
      <div className="verifyCode">
        <h1>verificação do codigo</h1>
        <p>Digite o codigo enviado por email para que possamos verificar sua conta</p>
        <OtpInput
          className="otpInputs"
          value={otp.otp}
          onChange={handleChange}
          numInputs={6}
          
          
        />
        <button>Enviar</button>
      </div>
    </section>
  );
}
