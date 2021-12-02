import { AxiosResponse } from "axios";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CustomAppBar from "../../components/appbar";
import Feed from "../../components/feed/Feed";
import Sidebar from "../../components/sidebar/Sidebar";
import Widgets from "../../components/widgets/Widgets";
import {
  getTweetsRequest,
  setNotificationFlag,
  setProfileDetails,
  setTrendingData,
} from "../../store/actions";
import { getTrendingAPI, getTweetsAPI, profileAPI } from "../../store/api";
import { RequestTweetsPayload } from "../../store/models";
import { TweetData } from "../../store/models/tweetModel";
import { APP_NAME } from "../../utils/constants";

function FeedsScreen() {
  const dispatch = useDispatch();

  const twitterUserId = useSelector((state: any) => state.twitterUserId);

  const profileDetails = useSelector((state: any) => state.profileDetails);

  const trendingData = useSelector((state: any) => state.trendingData);

  const tweetData = useSelector((state: any) => state.tweetData);

  const isNewTweetsAvailable = useSelector(
    (state: any) => state.isNewTweetsAvailable
  );

  // Prompts user before reload.
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Event listender for reload
  const handleBeforeUnload = (e: any) => {
    e.preventDefault();
    const message =
      "On Refresh , you will be logged out. Are you sure you want to reload ?";
    e.returnValue = message;
    return message;
  };

  useEffect(() => {
    if (twitterUserId.length > 0) {
      dispatch(
        getTweetsRequest({
          userId: twitterUserId,
          count: "30",
        } as RequestTweetsPayload)
      );
      getProfileDetails();
    }
  }, []);

  useEffect(() => {
    if (profileDetails != null && profileDetails.location) {
      pollForTweets();
      getTrendingDetails();
    }
  }, [profileDetails, twitterUserId, tweetData]);

  const pollForTweets = () => {
    setInterval(async function () {
      const currentTweets: Array<TweetData> = tweetData;
      const maxId = Math.max(
        ...currentTweets.map((tweet: TweetData) => tweet.id)
      );
      if (maxId > 0) {
        const latesttTweetsResponse: AxiosResponse = await getTweetsAPI({
          userId: "1004446443690577920",
          count: "1",
          since_id: maxId.toString(),
        });
        if (latesttTweetsResponse.status == 200) {
          const latestTweets: Array<TweetData> = latesttTweetsResponse.data.data
            ._realData as Array<TweetData>;
          if (latestTweets.length > 0) {
            latestTweets.filter((tweet: TweetData) => tweet.id != maxId)
              .length > 0 && dispatch(setNotificationFlag(true));
          }
        }
      }
    }, 60000);
  };

  const getProfileDetails = useCallback(async () => {
    const profileAPIResponse: AxiosResponse = await profileAPI(twitterUserId);
    if (profileAPIResponse.status == 200 && profileAPIResponse.data.data) {
      dispatch(setProfileDetails(profileAPIResponse.data.data.data));
    }
  }, [twitterUserId]);

  const getTrendingDetails = useCallback(async () => {
    const trendingAPIResponse: AxiosResponse = await getTrendingAPI({
      userId: twitterUserId,
      locationQuery: profileDetails.location,
    });
    if (trendingAPIResponse.status == 200 && trendingAPIResponse.data.data) {
      dispatch(setTrendingData(trendingAPIResponse.data.data));
    }
  }, [twitterUserId, profileDetails]);

  const handleNewNotificationClick = () => {
    dispatch(setNotificationFlag(false));
    dispatch(
      getTweetsRequest({
        userId: twitterUserId,
        count: "5",
      } as RequestTweetsPayload)
    );
  };

  return (
    <React.Fragment>
      <div style={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <CustomAppBar title={APP_NAME} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100vh",
          width: "100%",
        }}
      >
        {isNewTweetsAvailable && (
          <div
            style={{
              position: "absolute",
              bottom: "10rem",
              left: "40rem",
              zIndex: 99999,
              backgroundColor: "#00000080",
              width: "15rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              borderRadius: 40,
              cursor: "pointer",
            }}
            onClick={() => {
              handleNewNotificationClick();
            }}
          >
            <p style={{ color: "white" }}> New Notifications </p>
          </div>
        )}
        <div style={{ width: "30%" }}>
          <Sidebar profileDetails={profileDetails} />
        </div>
        <div
          style={{
            width: "40%",
            height: "90vh",
            overflowY: "scroll",
            scrollbarWidth: "none",
          }}
        >
          <Feed />
        </div>
        <div
          style={{
            width: "30%",
            height: "100vh",
            overflowY: "scroll",
            scrollbarWidth: "none",
          }}
        >
          <Widgets
            profileDetails={profileDetails}
            trendingData={trendingData}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default FeedsScreen;
