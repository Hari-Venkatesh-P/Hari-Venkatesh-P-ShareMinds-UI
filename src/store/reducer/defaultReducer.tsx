import { produce } from "immer";
import { initialReducerState } from "../models";
import { StoreActions } from "../actions/index";
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
import { ProfileDetails } from "../models/profileModels";
import { TweetData } from "../models/tweetModel";
import { TrendingData } from "../models/trendingDataModel";

const initialCheckInState: initialReducerState = {
  // Authentication
  authenticationRequestLoading: false,
  authenticationRequestSuccess: false,
  authenticationRequestFailure: false,
  loginSecret: "",
  authenticationRequestShortURL: "",
  twitterUserId: "",

  // Profile Details
  profileDetails: null,

  getTweetsRequestLoading: false,
  getTweetsRequestSuccess: false,
  getTweetsRequestFailure: false,
  tweetData: [],

  trendingData: null,
  isNewTweetsAvailable: false,
};

export default function defaultReducer(
  state: initialReducerState = initialCheckInState,
  action: StoreActions
) {
  return produce(state, (current) => {
    switch (action.type) {
      case MAKE_AUTH_REQUEST:
        current.authenticationRequestLoading = true;
        current.loginSecret = action.payload as string;
        break;
      case MAKE_AUTH_SUCCESS:
        current.authenticationRequestSuccess = true;
        current.authenticationRequestLoading = false;
        current.authenticationRequestShortURL = action.payload as string;
        break;
      case MAKE_AUTH_FAILURE:
        current.authenticationRequestFailure = true;
        current.authenticationRequestLoading = false;
        break;
      case MAKE_AUTH_CLEAR:
        current.authenticationRequestFailure = true;
        current.authenticationRequestShortURL = "";
        break;
      case AUTHENTICATION_CALLBACK_SUCCESS:
        current.loginSecret = "";
        current.twitterUserId = action.payload as string;
        break;
      case SET_PROFILE_DETAILS:
        current.profileDetails = action.payload as ProfileDetails;
        break;
      case GET_TWEETS_REQUEST:
        current.getTweetsRequestLoading = true;
        break;
      case GET_TWEETS_REQUEST_SUCCESS:
        current.getTweetsRequestSuccess = true;
        current.getTweetsRequestLoading = false;
        current.tweetData = [
          ...(action.payload as Array<TweetData>),
          ...current.tweetData,
        ];
        break;
      case GET_TWEETS_REQUEST_FAILED:
        current.getTweetsRequestFailure = true;
        current.getTweetsRequestLoading = false;
        break;
      case GET_TWEETS_REQUEST_CLEAR:
        current.getTweetsRequestFailure = false;
        current.getTweetsRequestSuccess = false;
        break;
      case SET_TRENDING_DATA:
        current.trendingData = action.payload as TrendingData;
        break;
      case SET_NOTIFICATION:
        current.isNewTweetsAvailable = action.payload;
        break;
      case LOGOUT_USER:
        current.authenticationRequestLoading = false;
        current.authenticationRequestSuccess = false;
        current.authenticationRequestFailure = false;
        current.loginSecret = "";
        current.authenticationRequestShortURL = "";
        current.twitterUserId = "";
        current.profileDetails = null;
        current.getTweetsRequestLoading = false;
        current.getTweetsRequestSuccess = false;
        current.getTweetsRequestFailure = false;
        current.tweetData = [];
        current.trendingData = null;
        current.isNewTweetsAvailable = false;
    }
  });
}
