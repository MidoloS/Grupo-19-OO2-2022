import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [token, setToken] = useState("");
  const { push } = useRouter();
  useEffect(() => {
    const auth = localStorage.getItem("token");
    setToken(String(auth));

    if (!token) {
      push("/login");
    }
  }, [push, token]);
  return <></>;
};

export default Home;
