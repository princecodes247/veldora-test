import { AxiosResponse } from "axios";
import api, { authHeaders } from "./config";

const servicePrefix = "/";

export const postSubscribeToWaitlist = ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  return api.post("/subscribe", {
    api_key: process.env.NEXT_PUBLIC_SENDER_API_KEY,
    list: process.env.NEXT_PUBLIC_SENDER_LIST_ID,
    name,
    email,
  });
};
