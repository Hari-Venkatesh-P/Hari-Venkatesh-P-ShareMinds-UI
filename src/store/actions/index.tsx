import {
  MAKE_AUTH_REQUEST,
  MAKE_AUTH_SUCCESS,
  MAKE_AUTH_FAILURE,
  MAKE_AUTH_CLEAR,
  AUTHENTICATION_CALLBACK_SUCCESS,
  SET_PROFILE_DETAILS,
  GET_TWEETS_REQUEST,
  GET_TWEETS_REQUEST_SUCCESS,
  GET_TWEETS_REQUEST_FAILED,
  GET_TWEETS_REQUEST_CLEAR,
  SET_TRENDING_DATA,
  SET_NOTIFICATION,
  LOGOUT_USER,
} from "../constants";
import { RequestTweetsPayload } from "../models";
import { ProfileDetails } from "../models/profileModels";
import { TrendingData } from "../models/trendingDataModel";
import { typedAction } from "../utils";

export function makeAuthenticationRequest(loginSecret: string) {
  return typedAction(MAKE_AUTH_REQUEST, loginSecret);
}

export function makeAuthenticationSuccess(shortURL: string) {
  return typedAction(MAKE_AUTH_SUCCESS, shortURL);
}

export function makeAuthenticationFailure() {
  return typedAction(MAKE_AUTH_FAILURE, "");
}

export function makeAuthenticationClear() {
  return typedAction(MAKE_AUTH_CLEAR, "");
}

export function authenticationCallBackSuccess(twitterUserId: string) {
  return typedAction(AUTHENTICATION_CALLBACK_SUCCESS, twitterUserId);
}

export function setProfileDetails(profileDetails: ProfileDetails) {
  return typedAction(SET_PROFILE_DETAILS, profileDetails);
}

export function getTweetsRequest(requestTweetsPayload: RequestTweetsPayload) {
  return typedAction(GET_TWEETS_REQUEST, requestTweetsPayload);
}

export function getTweetsSuccess(tweetData: Array<any>) {
  return typedAction(GET_TWEETS_REQUEST_SUCCESS, tweetData);
}

export function getTweetsFailed() {
  return typedAction(GET_TWEETS_REQUEST_FAILED, "");
}

export function getTweetsClear() {
  return typedAction(GET_TWEETS_REQUEST_CLEAR, "");
}

export function setTrendingData(trendingData: TrendingData) {
  return typedAction(SET_TRENDING_DATA, trendingData);
}

export function setNotificationFlag(isNewTweetsAvailable: boolean) {
  return typedAction(SET_NOTIFICATION, isNewTweetsAvailable);
}

export function logoutUser() {
  return typedAction(LOGOUT_USER, "");
}

export type StoreActions = ReturnType<
  | typeof makeAuthenticationRequest
  | typeof makeAuthenticationSuccess
  | typeof makeAuthenticationFailure
  | typeof makeAuthenticationClear
  | typeof authenticationCallBackSuccess
  | typeof setProfileDetails
  | typeof getTweetsRequest
  | typeof getTweetsSuccess
  | typeof getTweetsFailed
  | typeof getTweetsClear
  | typeof setTrendingData
  | typeof setNotificationFlag
  | typeof logoutUser
>;
