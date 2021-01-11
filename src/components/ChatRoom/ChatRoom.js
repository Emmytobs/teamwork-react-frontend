import React, { useEffect } from 'react'
import { Box } from '@chakra-ui/react';
import { connect } from 'react-redux';

import MenuBar from './MenuBar/MenuBar';
import ChatBox from './ChatBox/ChatBox';

import './ChatRoom.css';

function ChatRoom(props) {
    useEffect(() => {
        console.log(props.token);
    })
    return (
        <Box className="container">
            <MenuBar />
            <ChatBox />
        </Box>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps, null)(ChatRoom)
