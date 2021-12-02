import React, { useState } from "react";
import "./Widgets.css";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";
import {  useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { DebounceInput } from "react-debounce-input";
import { searchTweets } from "../../store/api/index";
function Widgets(props) {
  const [searchString, setSearchString] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);

  const twitterUserId = useSelector((state) => state.twitterUserId);

  const handleSearch = (query) => {
    setSearchString(query);
    doSearchTweets(query);
  };

  const doSearchTweets = async (query) => {
    if (query.length > 0) {
      const latesttTweetsResponse = await searchTweets({
        userId: twitterUserId,
        queryString: query,
      });
      if (
        latesttTweetsResponse.status == 200 &&
        latesttTweetsResponse.data.data._realData &&
        latesttTweetsResponse.data.data._realData.data
      ) {
        const currentResults = latesttTweetsResponse.data.data._realData.data;
        if (currentResults.length > 0) {
          setSearchedResults([...currentResults]);
        }
      }
    }
  };

  return (
    <div className="widgets">
      <div
        className="widgets__input"
        style={{
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "#80808078",
        }}
      >
        <SearchIcon className="widgets__searchIcon" />
        <DebounceInput
          placeholder="Search Twitter"
          minLength={2}
          value={searchString}
          debounceTimeout={300}
          onBlur={() => {
            setSearchString("");
          }}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </div>
      {searchString.length > 0 && (
        <div
          style={{
            width: "26rem",
            height: "15rem",
            background: "white",
            borderColor: "#80808078",
            borderRadius: 20,
            borderStyle: "solid",
            borderRightWidth: "0.35rem",
            borderBottomWidth: "0.35rem",
            borderTopWidth: "0.1rem",
            borderLeftWidth: "0.1rem",
            overflowY: "scroll",
            scrollbarWidth: "thin",
            marginLeft: "2rem",
            marginTop: "1rem",
          }}
        >
          {searchedResults.map((tweet) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                  borderBottomStyle: "solid",
                  borderBottomColor: "#80808078",
                }}
              >
                <span>
                  <p style={{ color: "#1976d2" }}>{"#" + searchString}</p>
                  <p>{tweet.text}</p>
                </span>
              </div>
            );
          })}
        </div>
      )}
      <div className="widgets__widgetContainer">
        {props.trendingData && (
          <div>
            <h2>What's happening</h2>
            {props.trendingData.closestTrendingData[0].trends
              .filter((tweet) => tweet.tweet_volume != null)
              .sort((a, b) => {
                return a.tweet_volume - b.tweet_volume;
              })
              .reverse()
              .slice(0, 3)
              .map((trendingTweet) => {
                return (
                  <div
                    style={{
                      borderBottomStyle: "solid",
                      borderWidth: 1,
                      padding: "0.5rem",
                      borderBottomColor: "#80808078",
                    }}
                  >
                    <p style={{ fontWeight: "bold" }}>{trendingTweet.name}</p>
                    <p style={{ color: "#808080" }}>
                      {trendingTweet.tweet_volume + "  Tweets"}
                    </p>
                  </div>
                );
              })}
          </div>
        )}
        <TwitterTweetEmbed tweetId={"1276396101872922625"} />
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="HariVenkateshP1"
          options={{ height: 400 }}
        />
        <TwitterShareButton
          url={"https://www.linkedin.com/in/b3ns44d/"}
          options={{ text: "This is my LinkedIn #Follow_Me", via: "b3ns44d" }}
        />
      </div>
    </div>
  );
}

export default Widgets;
