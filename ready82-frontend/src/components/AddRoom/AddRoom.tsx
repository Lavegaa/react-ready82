import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { maxHeaderSize } from "http";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PostModal = styled.div`
  width: 500px;
  height: 500px;
  background-color: #f5f5f5;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const Text = styled.p`
  width: 50px;
  height: 30px;
  margin: 10px;
  font-size: 25px;
`;

const TitleInput = styled.input`
  width: 350px;
  height: 30px;
  margin: 10px;
  border: none;
`;

const LineBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const GET_USER = gql`
  query getUser($userid: String!) {
    getUser(userid: $userid) {
      name
      id
    }
  }
`;

const GET_DETAIL = gql`
  query getDetails($encryptedid: String!) {
    getDetails(encryptedid: $encryptedid) {
      tier
      rank
      summonerId
      summonerName
      leaguePoints
      wins
      losses
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser(
    $email: String
    $userid: String
    $tier: String
    $rank: String
    $leaguePoints: Number
    $wins: Number
    $losses: Number
  ) {
    updateUser(
      email: $email
      userid: $userid
      tier: $tier
      rank: $rank
      leaguePoints: $leaguePoints
      wins: $wins
      losses: $losses
    ) {
      email
      userid
      tier
      rank
      summonerId
      summonerName
      leaguePoints
      wins
      losses
    }
  }
`;

export default function AddRoom() {
  interface User {
    tier: string;
    rank: string;
    summonerId: string;
    summonerName: string;
    leaguePoints: number;
    wins: number;
    losses: number;
  }
  type dummy = {
    getDetails: User[];
  };
  const [tier, setTier] = useState();
  const [rank, setRank] = useState();
  const [summonerId, setSummoerId] = useState();
  const [summonerName, setSummonerName] = useState();
  const [leaguePoints, setLeaguePoints] = useState();
  const [wins, setWins] = useState();
  const [losses, setLosses] = useState();
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(true);

  const [userid, setUserid] = useState("Dlookx2");
  const [getDetails, { data: detailData }] = useLazyQuery(GET_DETAIL, {
    onCompleted: (d) => userDetail(d),
  });

  const [getUser, { data: userData }] = useLazyQuery(GET_USER, {
    onCompleted: (d) =>
      getDetails({
        variables: {
          encryptedid: d.getUser.id,
        },
      }),
  });

  const userDetail = (d: dummy) => {
    setTier(d.getDetails[0].tier);
    setRank(d.getDetails[0].rank);
    setSummoerId(d.getDetails[0].summonerId);
    setSummonerName(d.getDetails[0].summonerName);
    setLeaguePoints(d.getDetails[0].leaguePoints);
    setWins(d.getDetails[0].wins);
    setLosses(d.getDetails[0].losses);
    setLoading(false);
  };

  useEffect(() => {
    if (!flag) {
      getUser({
        variables: {
          userid: userid,
        },
      });
      setFlag(true);
    }
  });

  return (
    <Container>
      {loading === true ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{summonerName}</h1>
          <h1>
            {tier} {rank}
          </h1>
          <h1>{leaguePoints}point</h1>
          <h1>win : {wins}</h1>
          <h1>losses : {losses}</h1>
          <h1>winRate : {Math.floor((wins / (wins + losses)) * 100)}%</h1>
        </div>
      )}

      <PostModal>
        <TitleBox>
          <Text>제목</Text>
          <TitleInput placeholder="제목을 입력해주세요." />
        </TitleBox>
        <Text>시간자리</Text>
      </PostModal>
    </Container>
  );
}
