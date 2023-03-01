import React, { useState, useEffect ,useRef} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useAuth from "../../hook/useAuth";
import useLoading from "../../hook/useLoading";
import Input from "../../components/section/auth/Input";
import SubmitButton from "../../components/section/auth/SubmitButton";
import GoogleButton from "../../components/section/auth/GoogleButton";
import Container from "./Container";

const Login = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { t } = useTranslation();
  const { register } = useAuth();
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Google reCapcha start
    
  const captchaRef = useRef(null) ;

  const GenerateCaptchaToken =() =>{
    const token = captchaRef.current.getValue() ;
    captchaRef.current.reset() ;
    console.log(token) ;
  }

// Google reCapcha end


  const onSubmit = async (e) => {
    e.preventDefault() ;
    GenerateCaptchaToken() ;
    try {
      setLoading(true);
      const req = { userName: name, email, password };
      const res = await register(req);
      setLoading(false);
      if (res) {
        navigate("/login");
        // navigate(`/auth/send-code?email=${email}`);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Container>
        <div className="max-w-[400px] w-11/12 m-auto text-white/90">
          <form onSubmit={onSubmit}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-4xl text-center sm:text-start">
                  Sign Up
                </p>
                <p className="font-bold text-xl mt-3 text-center sm:text-start">
                  Your Account
                </p>
              </div>
              <div>
                <Link to="/">
                  <img
                    src="/img/logo.png"
                    alt=""
                    className="w-32 h-32 m-auto sm:m-0"
                  />
                </Link>
              </div>
            </div>
            <Input
              type={"text"}
              label="Name"
              placeholder={"Enter Name"}
              className={"mt-3"}
              value={name}
              onChange={setName}
            />
            <Input
              type={"email"}
              label="Email"
              placeholder={"Enter email"}
              className={"mt-3"}
              value={email}
              onChange={setEmail}
            />
            <Input
              type={"password"}
              label="Password"
              placeholder={"Enter password"}
              className={"mt-3"}
              value={password}
              onChange={setPassword}
            />
            <div className="flex justify-end mt-4">
              <p className="font-medium text-sm"></p>
            </div>
            <ReCAPTCHA 
              sitekey="6Lff6ookAAAAAM6eFUFK6ESvdhPidAb6YJJmYkVz"
              ref={captchaRef}

            />
            <SubmitButton label={"Sign Up"} />
          </form>
          <div className="mt-4 flex items-center  justify-between">
            <hr className="w-2/5 text-white/60" />
            <p className="font-bold">{t("OR")}</p>
            <hr className="w-2/5 text-white/60" />
          </div>
          <GoogleButton label={"Login in with Google"} />
          <p className=" text-center mt-5">
            {t("Do you already have an account?")} &nbsp;
            <Link to={"/login"}>
              <span className="font-bold">{t("Sign In")}</span>
            </Link>
          </p>
        </div>
      </Container>
    </>
  );
};

export default Login;
