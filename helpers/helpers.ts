import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const formToJson = (form: { target: HTMLFormElement | undefined }) => {
  console.log(form);
  const formData = new FormData(form);
  return Object.fromEntries(formData.entries());
};

export const useRequest = async (
  path: string,
  options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
    },
  }
) => {
  const URL = "https://oo2-tp.herokuapp.com";
  const { push } = useRouter();
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    const auth = localStorage.getItem("token");
    setToken(String(auth));
    if (!token) {
      push("/login");
    }
  }, []);

  console.log(URL + path);
  const req = await fetch(URL + path, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token,
    },
    body: JSON.stringify(options.body),
  });
  console.log({ req });
  const { jwtToken, ...data } = await req.json();
  if (jwtToken) {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
  }
  return { data };
};
