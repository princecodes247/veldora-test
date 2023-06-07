import axios, { AxiosResponse } from "axios";
import api, { authHeaders } from "./config";
import qs from "qs";

const servicePrefix = "/";

export const postSubscribeToWaitlist = ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  let data = qs.stringify({
    api_key: process.env.NEXT_PUBLIC_SENDER_API_KEY,
    list: process.env.NEXT_PUBLIC_SENDER_LIST_ID,
    name,
    email,
    boolean: "true",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://mailer.punteer.com/sender/subscribe",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };
  return axios.request(config);
  // api.post("/subscribe/", {
  //   api_key: process.env.NEXT_PUBLIC_SENDER_API_KEY,
  //   list: process.env.NEXT_PUBLIC_SENDER_LIST_ID,
  //   name,
  //   email,
  // });
};
