import React from "react";
import "./Sidebar.css";
import SidebarOption from "../sidebaroptions/index";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
function Sidebar(props: any) {
  return (
    <div className="sidebar">
      {props.profileDetails && (
        <div className="sidebar__login">
          <div className="sidebar__profile__avatar">
            <Avatar src={props.profileDetails.profile_image_url} alt="" />
          </div>
          <VerifiedUserIcon
            className="post__badge"
            color={props.profileDetails.verified ? "primary" : "disabled"}
          />
          <p className="sidebar__profile">{props.profileDetails.name}</p>

          <p className="sidebar__username">@{props.profileDetails.username}</p>
        </div>
      )}
      <SidebarOption active Icon={HomeIcon} text="Home" />
      <SidebarOption Icon={SearchIcon} text="Explore" />
      <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
      <SidebarOption Icon={MailOutlineIcon} text="Messages" />
      <SidebarOption Icon={PermIdentityIcon} text="Profile" />
      <Button
        variant="outlined"
        className="sidebar__tweet"
        fullWidth
        type="submit"
      >
        Tweet
      </Button>
    </div>
  );
}

export default Sidebar;
