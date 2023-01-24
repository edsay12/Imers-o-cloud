import { useState } from "react";
import './login.css'


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    async function Login(){
        
    }
    

    return (
        <>
       

            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-pic js-tilt" data-tilt>
                            <img src={''} alt="IMG" />
                        </div>

                        <form className="login100-form validate-form" >
                            <span className="login100-form-title">
                                Member Login
                            </span>

                            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                <input className="input100" type="text" onChange={(e) => setEmail(e.target.value)} value={email} name="email" placeholder="Email" />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Password is required">
                                <input className="input100" type="password" onChange={(e) => setPassword(e.target.value)} value={password} name="password" placeholder="Password" />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn">
                                    Entrar
                                </button>
                            </div>

                            <div className="text-center p-t-136">
                                <a className="txt2" href="/cadastropage">
                                    Crie sua conta
                                    <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
function useSelector(arg0: (state: any) => any) {
    throw new Error("Function not implemented.");
}

