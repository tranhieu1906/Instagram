import { ClickAwayListener } from "@mui/material";
import React, { useEffect, useState } from "react";

function NotificationDetails({ setNotification, socket }) {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);
  const displayNotification = ({ senderName, type }) => {
    return (
      <span className="notification">{`${senderName.username} ${type} your post.`}</span>
    );
  };
  return (
    <ClickAwayListener onClickAway={() => setNotification(false)}>
      <div className="absolute w-80 bg-white rounded  drop-shadow top-14 right-0 md:right-72 md:top-14 border">
        <div className="absolute right-14 -top-2 rotate-45 h-4 w-4 bg-white rounded-sm border-l border-t"></div>

        <div className="flex flex-col w-full overflow-hidden">
          <div className="flex flex-col w-full overflow-hidden">
            {notifications.map((n) => displayNotification(n))}
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
}
export default NotificationDetails;
