import { ClickAwayListener } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notificationUser } from "../../service/userAction";

function NotificationDetails({ setNotification, socket }) {
  const { notification } = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("getNotification", (data) => {
      console.log(data);
      dispatch(notificationUser(data));
    });
  }, [dispatch, socket]);

  useEffect(() => {
    dispatch(notificationUser());
  }, [dispatch, socket]);

  const displayNotification = ({ senderName, type, message }) => {
    if (senderName && type) {
      return (
        <span
          className="p-1"
          key={senderName}
        >{`${senderName.username} ${type} your post.`}</span>
      );
    } else {
      return <span className="p-1" key={message.id}>{`${message} `}</span>;
    }
  };
  return (
    <ClickAwayListener onClickAway={() => setNotification(false)}>
      <div className="absolute w-80 bg-white rounded  drop-shadow top-14 right-0 md:right-72 md:top-14 border">
        <div className="absolute right-14 -top-2 rotate-45 h-4 w-4 bg-white rounded-sm border-l border-t"></div>

        <div className="flex flex-col w-full overflow-hidden">
          <div
            className="flex flex-col w-full overflow-hidden h-80"
            style={{ minHeight: "300px", maxHeight: "350px" }}
          >
            {notification.length > 0 ? (
              notification?.map((n) => displayNotification(n))
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
