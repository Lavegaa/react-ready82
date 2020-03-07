import React, { useState } from "react";
import {
  GoogleLogin,
  GoogleLogout,
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from "react-google-login";

export default function Login() {
  const [name, setName] = useState("");
  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log(response);
    // setName(response.profileObj.email);
  };
  const responseError = (error: string) => {
    console.log(error);
  };

  const responseLogout = () => {
    console.log("로그아웃");
    setName("");
  };
  return (
    <div>
      <GoogleLogin
        clientId="130629619868-02sc0crss4v4t5o3lftmq210hfcj1iq0.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseError}
        cookiePolicy={"single_host_origin"}
      />
      <GoogleLogout
        clientId="130629619868-02sc0crss4v4t5o3lftmq210hfcj1iq0.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={responseLogout}
      ></GoogleLogout>
      <h1>name:{name}</h1>
    </div>
  );
}
