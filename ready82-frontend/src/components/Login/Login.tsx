import React, { useState, useEffect } from "react";
import {
  GoogleLogin,
  GoogleLogout,
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from "react-google-login";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useUserState, useUserDispatch } from "../../contexts/UserContext";

const FIND_USER = gql`
  query findUser($email: String!) {
    findUser(email: $email) {
      email
    }
  }
`;

export default function Login() {
  const [name, setName] = useState("");
  const state = useUserState();
  const dispatch = useUserDispatch();
  const { email } = state;
  const { data: DEMAIL } = useQuery(FIND_USER, {
    variables: {
      email: email
    }
  });
  useEffect(() => {
    if (email !== "") {
      console.log(DEMAIL.findUser);
      if (DEMAIL.findUser.length === 0) {
        console.log("is empty!");
      }
    }
  });

  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    dispatch({ type: "SET_EMAIL", value: response.profileObj.email });
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
