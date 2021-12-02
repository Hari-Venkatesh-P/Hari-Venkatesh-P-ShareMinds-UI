import apiCall from "../../utils/api";
import { API_END_POINTS } from "../../utils/constants";
import { RequestTrendingPayload, RequestTweetsPayload } from "../models";

export function authorizeUserAPI(loginSecret: string) {
  return apiCall(
    `${API_END_POINTS.AUTHORIZE_USER}`,
    "GET",
    { loginSecret },
    null,
    null
  );
}

export function profileAPI(userId: string) {
  return apiCall(
    `${API_END_POINTS.GET_PROFILE}`,
    "GET",
    { userId },
    null,
    null
  );
}

export function getTweetsAPI(requestTweetsPayload: RequestTweetsPayload) {
  return apiCall(
    `${API_END_POINTS.GET_TWEETS}`,
    "GET",
    requestTweetsPayload,
    null,
    null
  );
}

export function getTrendingAPI(getTrendingPayload: RequestTrendingPayload) {
  return apiCall(
    `${API_END_POINTS.TRENDING}`,
    "GET",
    getTrendingPayload,
    null,
    null
  );
}


export function searchTweets(requestTweetsPayload: RequestTweetsPayload) {
  return apiCall(
    `${API_END_POINTS.SEARCH_TWEETS}`,
    "GET",
    requestTweetsPayload,
    null,
    null
  );
}