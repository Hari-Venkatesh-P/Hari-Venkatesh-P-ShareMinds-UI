import React from "react";
import "./Feed.css";
import TweetBox from "../tweetbox/TweetBox";
import Post from "../post/Post";
import { useDispatch, useSelector } from "react-redux";
import { Hashtag, TweetData, UserMention } from "../../store/models/tweetModel";
import InfiniteScroll from "react-infinite-scroll-component";
import { getTweetsRequest } from "../../store/actions";
import { RequestTweetsPayload } from "../../store/models";

function Feed() {

  const tweetData = useSelector((state: any) => state.tweetData);

  const twitterUserId = useSelector((state: any) => state.twitterUserId);

  const dispatch = useDispatch();

  const handleNextTweets = () => {
    const currentTweets: Array<TweetData> = tweetData;
    const maxId = Math.max(
      ...currentTweets.map((tweet: TweetData) => tweet.id)
    );
    if (maxId > 1) {
      dispatch(
        getTweetsRequest({
          userId: twitterUserId,
          count: "30",
          max_id: maxId.toString(),
        } as RequestTweetsPayload)
      );
    }
  };

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>
      <TweetBox />
      <div
        style={{
          background: "linear-gradient(90deg, #37297e 10%, #ac42c2 90%)",
        }}
      >
        <InfiniteScroll
          dataLength={0}
          next={() => {
            handleNextTweets();
          }}
          hasMore={true}
          loader={null}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {tweetData.map((tweet: TweetData, index: number) => (
            <Post
              key={tweet.id + index}
              userName={tweet.user.name}
              displayName={tweet.user.screen_name}
              verified={tweet.user.verified}
              avatar={tweet.user.profile_image_url_https || ""}
              text={tweet.full_text}
              image={
                tweet.extended_entities
                  ? tweet.extended_entities.media[0].media_url_https
                  : ""
              }
              retweetCount={tweet.retweet_count}
              favoriteCount={tweet.favorite_count}
              hashtags={tweet.entities.hashtags.map(
                (current: Hashtag) => "#" + current.text
              )}
              usermentions={tweet.entities.user_mentions.map(
                (usermentions: UserMention) => "@" + usermentions.screen_name
              )}
              createdAt={tweet.created_at}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Feed;
