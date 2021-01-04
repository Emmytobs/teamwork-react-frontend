import React from 'react'
import { Box } from '@chakra-ui/react';
import { connect } from 'react-redux';

import PostInput from './PostInput';
import Post from './Post';

import {
    InputGroup,
    Button,
    Textarea

} from '@chakra-ui/react'

import './ChatBox.css';

function ChatBox(props) {
    return (
        <Box className="chat-box">
            {props.posts.map((post, index) => {
                const date = new Date(post.created_at);
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const dateString = date.toDateString();
                const formattedDate = hours >= 12 ? `${dateString} (${hours}:${minutes} PM)` : `${dateString} (${hours}:${minutes} AM)`;
                return (
                    <Post key={index} post={post} date={formattedDate} />
                )
            })}
            <PostInput />
        </Box>
    )
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
    };
};

export default connect(mapStateToProps, null)(ChatBox);
