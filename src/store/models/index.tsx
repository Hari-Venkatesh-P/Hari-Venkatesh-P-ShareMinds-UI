import { ProfileDetails } from "./profileModels";
import { TrendingData } from "./trendingDataModel";
import { TweetData } from "./tweetModel";

export interface initialReducerState {
  authenticationRequestLoading: boolean;
  authenticationRequestSuccess: boolean;
  authenticationRequestFailure: boolean;
  loginSecret: string;
  authenticationRequestShortURL: string;
  twitterUserId: string;

  profileDetails: ProfileDetails | null;

  getTweetsRequestLoading: boolean;
  getTweetsRequestSuccess: boolean;
  getTweetsRequestFailure: boolean;
  tweetData: Array<TweetData> | [];

  trendingData: TrendingData | null;
  isNewTweetsAvailable: boolean;
}

export interface APIResponse {
  success: boolean;
  message?: any;
  data?: any;
}

export interface UserData {
  userId: string;
}

export interface RequestTweetsPayload {
  userId: string;
  count: string;
  since_id?: string;
  max_id?: string;
  queryString?: string;
}

export interface RequestTrendingPayload {
  userId: string;
  locationQuery: string;
}
