import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./Components/Player/Player/player.css";
import { RecoilRoot } from "recoil";
import { tokenState } from "./recoil/atoms";

const client_id = "de8735e4e92a4bbe8bb99948f6dfbb1d";
const client_secret = "7a1e27603bd84785a7d5b3465a5cbfe1";

export const getToken = () => {
  return fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ` + window.btoa(`${client_id}:${client_secret}`),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

const initializeState = ({ set }) => {
  console.log("init");
  getToken()
    .then((data) => data.json())
    .then((res) => {
      console.log(res);
      set(
        tokenState,
        res.access_token
      );
    });
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot initializeState={initializeState}>
    <App />
  </RecoilRoot>
);
