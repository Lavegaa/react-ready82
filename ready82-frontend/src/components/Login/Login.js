import React, { useState, useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useUserState, useUserDispatch } from "../../contexts/UserContext";
import { Redirect } from "react-router-dom";

const FIND_USER = gql`
  query findUser($email: String!) {
    findUser(email: $email) {
      email
    }
  }
`;

export default function Login() {
  const [name, setName] = useState("");
  // move: 1 최초 로그인 -> 게임 아이디 입력 페이지로 이동
  // move: 2 게임 아이디 정보가 있음 -> 메인 페이지로 이동
  const [move, setMove] = useState(0);
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
      console.log(DEMAIL);
      // if (DEMAIL.findUser.length === 0) {
      //   console.log("is empty!");
      //   setMove(1);
      // }
    }
  });

  const responseGoogle = response => {
    dispatch({ type: "SET_EMAIL", value: response.profileObj.email });
  };
  const responseError = error => {
    console.log(error);
  };

  const responseLogout = () => {
    console.log("로그아웃");
    setName("");
  };
  return (
    <div>
      {move === 1 && <Redirect to="/" />}
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
