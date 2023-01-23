import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClickAwayListener } from "@mui/material";
import {
  profileIcon,
  savedIcon,
  settingsIcon,
  switchAccountIcon,
} from "./SvgIcons";
import { useDispatch, useSelector } from "react-redux";

function NotificationDetails({ setNotification }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  return (
    <ClickAwayListener onClickAway={() => setNotification(false)}>
      <div className="absolute w-80 bg-white rounded  drop-shadow top-14 right-0 md:right-72 md:top-14 border">
        <div className="absolute right-14 -top-2 rotate-45 h-4 w-4 bg-white rounded-sm border-l border-t"></div>

        <div className="flex flex-col w-full overflow-hidden">
          <div className="flex flex-col w-full overflow-hidden">
            <span>ábdjabsdjhbạhdbjh</span>
            <span>ábdjabsdjhbạhdbjh</span>
            <span>ábdjabsdjhbạhdbjh</span>
            <span>ábdjabsdjhbạhdbjh</span>
            <span>ábdjabsdjhbạhdbjh</span>
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
}
export default NotificationDetails;
