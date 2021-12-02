import axios from "axios";
import { API_URL } from "./constants";

const API = axios.create({
  baseURL: API_URL,
  timeout: 20000,
});

export type Method =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "purge"
  | "PURGE"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK";

const apiCall = (
  url: string,
  method: Method,
  params?: any,
  body?: any,
  headersMap?: any
) => {
  return API({
    method: method,
    url: url,
    params: params ? params : {},
    headers: headersMap ? headersMap : {},
    data: body,
  });
};

export default apiCall;
