import {useState, useEffect} from "react";
import "../../../App.css"
import * as React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import {Badge, Divider, ListItem, styled, Typography} from "@mui/material";
import axios from "../../../api/axios";
import ListItemButton from "@mui/material/ListItemButton";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

export default function ListChat(props) {
    let {open, chatNow} = props
    let navigation = useNavigate()
    const { user } = useSelector((state) => state.user);
    let [listChat, setListChat] = useState([]);

    useEffect(() => {
        axios.get("/api/v1/chat/list").then((response) => {
            let listRoom = response.data.listChat;
            setListChat(listRoom)
        }).catch((error) => {
            console.log(error)
        })
    },[open]);


    return (
        <>
            {listChat.length > 0 && (
                <List sx={{width: '100%', maxWidth: 400, bgcolor: 'background.paper'}}>
                    { listChat.map(userChat => (
                            <ListItemButton onClick={() => chatNow(userChat.id)}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar alt="avatar"/>
                                    </ListItemAvatar>
                                    <ListItemText primary= {userChat.roomName} secondary="Jan 9, 2014"/>
                                </ListItem>
                            </ListItemButton>
                    ))
                    }
                </List>
            )}
        </>


    )
}