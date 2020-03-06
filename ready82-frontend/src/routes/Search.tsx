import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

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

export default function Search() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [tier, setTier] = useState("");
  const [rank, setRank] = useState("");
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    console.log(searchValue);
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

  const HandleSumbitId = () => {
    setName(DID?.getUser?.name);
    setId(DID?.getUser?.id);
    setTier(DDETAILS?.getDetails[0]?.tier);
    setRank(DDETAILS?.getDetails[0]?.rank);
    setWins(DDETAILS?.getDetails[0]?.wins);
    setLosses(DDETAILS?.getDetails[0]?.losses);
    console.log(DDETAILS);
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
      <button onClick={HandleSumbitId}>검색</button>
    </>
  );
}
