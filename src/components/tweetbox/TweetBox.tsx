import React, { useState } from "react";
import "./TweetBox.css";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const sendTweet = (e : any ) => {
    e.preventDefault(); // stop the page refresh after click the tweet button

    // db.collection("posts").add({
    //   displayName: "Abdessamad Bensaad",
    //   username: "B3ns44d",
    //   verified: true,
    //   text: tweetMessage,
    //   image: tweetImage,
    //   avatar:
    //     "https://pbs.twimg.com/profile_images/1326212698628087809/2pqiQCNt_400x400.jpg",
    // });

    setTweetMessage("");
    setTweetImage("");
  };
  return (
    // start tweetBox
    <div className="tweetBox">
      {/* start form */}
      <form>
        {/* start tweetBox__input */}
        <div className="tweetBox__input">
          {/* Avatar */}
          <Avatar src="https://pbs.twimg.com/profile_images/1326212698628087809/2pqiQCNt_400x400.jpg" />
          {/* What's happening? input */}
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
          ></input>
        </div>
        {/* end tweetBox__input */}
        {/* start tweetBox__imageInput and button */}
        <input
          onChange={(e) => setTweetImage(e.target.value)}
          value={tweetImage}
          className="tweetBox__imageInput"
          placeholder="Optional: Enter image URL"
          type="text"
        ></input>
        <Button
          onClick={sendTweet}
          className="tweetBox__tweetButton"
          type="submit"
        >
          Tweet
        </Button>
        {/* end tweetBox__imageInput and button */}
      </form>
      {/* end form */}
    </div>
    // end tweetBox
  );
}

export default TweetBox;
