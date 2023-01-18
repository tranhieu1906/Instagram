import {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import "../../App.css";
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import FindCreateChat from "./childComponent/FindCreateChat";
import Container from '@mui/material/Container';
import {Badge, ListItem, PropTypes, styled} from "@mui/material";
import axios from "../../api/axios";
import ListChat from "./childComponent/ListChat";
import ChatBody from "./childComponent/ChatBody";


export default function ViewChat () {
    const [presentRoom, setPresentRoom] = useState()
    const [open, setOpen] = React.useState(false);
    const handleClickListItem = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <div className="viewChat">
                    <div className="listChat">
                        <div className="listChat-header">
                            <div className="chat-title"><b>chat trực tuyến</b></div>
                            <div className="add-chat">
                                <ListItem
                                    button
                                    onClick={handleClickListItem}
                                >
                                    <svg color="#262626"
                                         fill="#262626"
                                         height="24"
                                         role="img"
                                         viewBox="0 0 24 24"
                                         width="24">
                                        <path
                                            d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"></path>
                                        <path
                                            d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"></path>
                                        <line fill="none"
                                              stroke="currentColor"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              x1="16.848"
                                              x2="20.076"
                                              y1="3.924"
                                              y2="7.153"></line>
                                    </svg>
                                </ListItem>
                                <FindCreateChat
                                    open={open}
                                    onClose={handleClose}
                                />
                            </div>
                        </div>
                        <div className="listChat-body">
                            <ListChat/>
                        </div>
                    </div>

                    <div className="flex justify-center items-center chat">
                        <ChatBody/>
                    </div>
                </div>
            </Container>
            <CssBaseline/>
        </React.Fragment>
    )
}