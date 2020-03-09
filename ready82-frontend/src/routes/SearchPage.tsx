import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import { useUserState } from "../contexts/UserContext";

const GET_USERID = gql`
  query getUserID($userid: String!) {
    getUser(userid: $userid) {
      name
      id
    }
  }
`;

const GET_DETAILS = gql`
  query getUserDetails($encryptedid: String!) {
    getDetails(encryptedid: $encryptedid) {
      summonerName
      tier
      rank
      wins
      losses
    }
  }
`;

const ADD_USER = gql`
  mutation addUser($email: String!, $userid: String!, $encryptedid: String!) {
    addUser(email: $email, userid: $userid, encryptedid: $encryptedid) {
      email
      userid
      encryptedid
    }
  }
`;

export default function SearchPage() {
  const state = useUserState();
  const { email } = state;
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [tier, setTier] = useState("");
  const [rank, setRank] = useState("");
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [addUser, { data }] = useMutation(ADD_USER);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const { data: DID } = useQuery(GET_USERID, {
    variables: {
      userid: searchValue
    }
  });

  const { data: DDETAILS } = useQuery(GET_DETAILS, {
    variables: {
      encryptedid: id
    }
  });

  const HandleSubmitId = () => {
    console.log(DID);
    setName(DID?.getUser?.name);
    setId(DID?.getUser?.id);
    if (DDETAILS?.getDetails[0] !== undefined) {
      console.log("it's exist");
      setTier(DDETAILS?.getDetails[0]?.tier);
      setRank(DDETAILS?.getDetails[0]?.rank);
      setWins(DDETAILS?.getDetails[0]?.wins);
      setLosses(DDETAILS?.getDetails[0]?.losses);
    } else {
      console.log("it's not exist!");
    }
  };

  const HandleSubmitAddUser = () => {
    if (DDETAILS?.getDetails[0] !== undefined) {
      console.log("it's exist");
      addUser({
        variables: {
          email: email,
          userid: searchValue,
          encryptedid: id
        }
      });
    }
  };

  return (
    <>
      <h1>name: {name}</h1>
      <h1>tier: {tier}</h1>
      <h1>rank: {rank}</h1>
      <h1>wins: {wins}</h1>
      <h1>losses: {losses}</h1>
      <h1>winrate: {Math.floor((wins / (losses + wins)) * 100)}</h1>
      <input onChange={handleInputChange} value={searchValue} />
      <button onMouseDown={HandleSubmitId} onMouseUp={HandleSubmitId}>
        검색
      </button>
      <button onClick={HandleSubmitAddUser}>저장하기</button>
    </>
  );
}
