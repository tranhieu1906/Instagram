import { ClickAwayListener } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../../service/userAction";

function NotificationDetails({ setNotification, socket }) {
  // const notifications = useSelector((state) => state.notifications);
  // const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    socket.on("getNotification", (data) => {
      console.log(data);
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);
  const displayNotification = ({ senderName, type }) => {
    return (
      <span className="p-1">{`${senderName.username} ${type} your post.`}</span>
    );
  };
  return (
    <ClickAwayListener onClickAway={() => setNotification(false)}>
      <div className="absolute w-80 bg-white rounded  drop-shadow top-14 right-0 md:right-72 md:top-14 border">
        <div className="absolute right-14 -top-2 rotate-45 h-4 w-4 bg-white rounded-sm border-l border-t"></div>

        <div className="flex flex-col w-full overflow-hidden">
          <div
            className="flex flex-col w-full overflow-hidden h-72"
          >
            {/* {notifications?.map((n) => displayNotification(n))} */}
            {notifications.length !== 0 ? (
              notifications?.map((n) => displayNotification(n))
            ) : (
              <span className="flex justify-center h-full items-center">
                Không có thông báo nào
              </span>
            )}
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
}
export default NotificationDetails;
