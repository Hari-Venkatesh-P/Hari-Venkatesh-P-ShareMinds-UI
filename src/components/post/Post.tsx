import Avatar from "@mui/material/Avatar";
import React, { useCallback } from "react";
import "./Post.css";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";
import moment from "moment";
export interface PostComponentProps {
  // USER DETAILS
  displayName: string;
  userName: string;
  verified: boolean;
  avatar: string;

  text: string;
  image: string;
  retweetCount: number;
  favoriteCount: number;
  hashtags: Array<string>;
  usermentions: Array<string>;
  createdAt: string;
}

const Post = ({
  displayName,
  userName,
  verified,
  text,
  image,
  avatar,
  retweetCount,
  favoriteCount,
  usermentions,
  hashtags,
  createdAt,
}: PostComponentProps) => {
  const getTimeString = () => {
    let d = new Date(createdAt);
    var duration = moment.duration(
      moment().diff(moment({ hour: d.getHours(), minute: d.getMinutes() }))
    );
    var hours = duration.asHours();
    if (Math.floor(hours) > 0) {
      return Math.floor(hours) == 1
        ? "1 hour ago"
        : Math.floor(hours) + " hours ago";
    } else {
      return Math.ceil(duration.asMinutes()) == 1
        ? "1 min ago"
        : Math.ceil(duration.asMinutes()) + " mins ago";
    }
  };

  return (
    <div
      className="post"
      style={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#80808078",
        borderRadius : 20,
        backgroundColor: "white",
        marginTop: "0.5rem",
        marginBottom: "0.5rem",
      }}
    >
      <div className="post__body">
        <div className="post__header">
          <div
            className="post__headerText"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Avatar src={avatar} style={{ marginRight: "1rem" }} />
            <h3>
              {displayName}{" "}
              <span className="post__headerSpecial">
                {verified && (
                  <VerifiedUserIcon className="post__badge" color="primary" />
                )}{" "}
                @{userName}
              </span>
            </h3>
          </div>
          <p className="post__headerSpecial">{getTimeString()}</p>
        </div>

        <div className="post__headerDescription">
          <p>{text}</p>
          <span style={{ display: "flex", flexDirection: "row" }}>
            {hashtags.map((text: string) => {
              return <p style={{ color: "#1976d2" }}>{text + "  "}</p>;
            })}
          </span>
          <span style={{ display: "flex", flexDirection: "row" }}>
            {usermentions.slice(0, 4).map((text: string) => {
              return <p style={{ color: "#1976d2" }}>{text + "  "}</p>;
            })}
          </span>
        </div>
        {/* <div className="post__header">
          <p>{usermentions}</p>
        </div> */}

        {image && image?.length > 0 && <img src={image} alt="" />}

        <div className="post__footer">
          <ChatBubbleOutlineIcon
            className="ChatBubbleOutlineIcon"
            fontSize="small"
          />
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <RepeatIcon
              className="RepeatIcon"
              fontSize="small"
              color="success"
            />
            {retweetCount}
          </span>
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <FavoriteBorderIcon
              className="FavoriteBorderIcon"
              fontSize="small"
              color="error"
            />
            {favoriteCount}
          </span>
          <PublishIcon className="PublishIcon" fontSize="small" />
        </div>
      </div>
    </div>
  );
};

export default Post;
