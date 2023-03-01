import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SubmitButton from "../../components/section/auth/SubmitButton";
import useAuth from "../../hook/useAuth";
import Container from "./Container";

function SendCode() {
  const navigate = useNavigate();
  const { sendVerificationCode } = useAuth();
  const [searchParams] = useSearchParams();

  const onSubmit = async (e) => {
    e.preventDefault();

    const email = searchParams.get("email");
    const res = await sendVerificationCode({ email });
    console.log("SendCode - res", res);
    if (res) {
      navigate(`/customer/auth/enter-code?email=${email}`);
    }
  };

  return (
    <Container>
      <div className="max-w-[400px] w-11/12 m-auto text-white/90">
        <form onSubmit={onSubmit}>
          <Link to="/">
            <img
              src="/img/logo.png"
              alt=""
              className="w-32 h-32 m-auto sm:m-0"
            />
          </Link>
          <p className="font-bold text-4xl text-center sm:text-start">
            Verification Code On Your Email
          </p>
          <p className="font-bold text-xl mt-3 text-center sm:text-start">
            We will send verification code on your email id.
          </p>
          <SubmitButton label={"verify your email"} />
        </form>
      </div>
    </Container>
  );
}

export default SendCode;
