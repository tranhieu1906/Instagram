import { useState, useEffect } from "react";
import "../../../App.css";
import * as React from "react";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import StyledBadgeOnline from "./ activeStatus/statusOnline"
import StyledBadgeOffline from "./ activeStatus/statusOffline"
import { Badge, Divider, ListItem, styled, Typography } from "@mui/material";
import axios from "../../../api/axios";
import ListItemButton from "@mui/material/ListItemButton";
import {useSelector} from "react-redux";
import moment from "moment/moment";

export default function ListChat(props) {
    let {open, chatNow, socket } = props
    const { user } = useSelector((state) => state.user);
    let [listChat, setListChat] = useState([]);



    useEffect(() => {
        axios.get("/api/v1/chat/list").then((response) => {
            let listRoom = response.data.listChat;
            setListChat(listRoom)
        }).catch((error) => {
            console.log(error.message)
        })
    },[open]);

    useEffect(() => {
        socket.on("get-active-status", (idUser) => {
                   axios.get("/api/v1/chat/list").then((response) => {
                       let listRoom = response.data.listChat;
                       setListChat(listRoom)
                   }).catch((error) => {
                       console.log(error.message)
                   })
        })
    }, [])

    return (
        <>
            {listChat.length > 0 && (
                <List sx={{width: '100%', maxWidth: 400, bgcolor: 'background.paper'}}>
                    { listChat.map(userChat => (
                            <ListItemButton onClick={() => chatNow(userChat.id)}>
                                {userChat.online === "true"? (
                                    <ListItem
                                        key={userChat.id}>
                                        <ListItemAvatar>
                                            <StyledBadgeOnline
                                                overlap="circular"
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                variant="dot">
                                                <Avatar alt="avatar" src={userChat.avatar[0]}/>
                                            </StyledBadgeOnline>
                                        </ListItemAvatar>
                                        <ListItemText primary= {userChat.roomName}/>
                                    </ListItem>
                                ): (
                                    <ListItem
                                        key={userChat.id}>
                                        <ListItemAvatar>
                                            <StyledBadgeOffline
                                                overlap="circular"
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                variant="dot">
                                                <Avatar alt="avatar" src={userChat.avatar[0]}/>
                                            </StyledBadgeOffline>
                                        </ListItemAvatar>
                                        <ListItemText primary= {userChat.roomName} secondary={moment(userChat.last_activity).fromNow()}/>
                                    </ListItem>
                                )}
                            </ListItemButton>
                    ))
                    }
                </List>
            )}
        </>
    )
}
