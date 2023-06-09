import axios, { AxiosResponse } from "axios";
import { waitlistApi, authHeaders } from "./config";
import qs from "qs";

const servicePrefix = "/";

export const postSubscribeToWaitlist = ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  return waitlistApi.post("/subscribe", {
    api_key: process.env.NEXT_PUBLIC_SENDER_API_KEY,
    list: process.env.NEXT_PUBLIC_SENDER_LIST_ID,
    name,
    email,
  });
};

export const getSubscribersCount = () => {
  return waitlistApi.get("/count");
};
