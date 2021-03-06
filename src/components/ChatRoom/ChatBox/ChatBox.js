import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';

import { Box, Button } from '@chakra-ui/react';

import PostInput from './PostInput';
import Post from './Post';
import Comments from './Comments';

import { storePreviousPosts, storePost, storeUpdatedPost, removeDeletedPost } from '../../../context/dispatchers';

import './ChatBox.css';

function ChatBox(props) {
    let [limit, setLimit] = useState(10);
    let [offset, setOffset] = useState(0);
    const [postClicked, setPostClicked] = useState(null)
    const [showComments, setShowComments] = useState(false);

    // const handleShowComments = (postId) => {
    //     setShowComments(true);
    //     setPostClicked(postId);
    // }

    useEffect(() => {
        fetchPosts()
    }, [])

    async function fetchPosts () {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/posts/read?limit=${limit}&offset=${offset}`,
                {
                    headers: {
                        'Authorization': 'Bearer ' + props.token
                    },
                }
            );
            if (response.status === 200) {
                if (!response.data.data) {
                    return console.log(response.data.message);
                }   
                const { posts: postArray } = response.data.data;
                setOffset(offset + 10);

                return storePreviousPosts(postArray.reverse(), props.dispatch);
            }
            
        } catch (error) {
            console.log(error)
            console.log(error.response)
        }
    }

    const submitPost = async (post) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/post`,
                { ...post },
                {
                    headers: {
                        'Authorization': 'Bearer ' + props.token
                    }
                },
            );
            if (!response) {
                return;
            }

            if (response.status === 201) {
                const { post } = response.data.data;
                console.log(post)
                return storePost(post, props.dispatch);
            }
        } catch (error) {
            console.log(error.message, error.response)
        }
    }

    const updatePost = async ({ article, postId }) => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/post`,
                { article, postId },
                { headers: { 'Authorization': `Bearer ${props.token}` } }
                )
            if (response.status === 200) {
                const { post } = response.data.data;
                // Redux does not re-render the Post component
                // because the posts data in the redux state is not mapped to props 
                // However it is mapped to props in the ChatBox component
                // Try to run the storeUpdatedPost dispatcher in the ChatBos component instead
                storeUpdatedPost(post, props.dispatch);
                return true;
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const deletePost = async ({ postId }) => {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_API_URL}/post?postId=${postId}`,
                { headers: { 'Authorization': 'Bearer ' + props.token } }
            );
            
            if (response.status === 200) {
                removeDeletedPost(postId, props.dispatch);
                return true;
            }

        } catch (error) {
            console.log(error)
            return false
        }
        console.log(postId)
    }

    return (
        <Box className="chat-box">
            <Button onClick={fetchPosts} w="200px" py="5px" px="10px" ml="auto" mr="auto" >Load More</Button>
            {props.posts.map((post, index) => {
                const date = new Date(post.created_at);
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const dateString = date.toDateString();
                const formattedDate = hours >= 12 ? `${dateString} (${hours}:${minutes} PM)` : `${dateString} (${hours}:${minutes} AM)`;
                return (
                    <Post 
                        key={post.post_id} 
                        post={post} 
                        date={formattedDate} 
                        // handleShowComments={handleShowComments}
                        setShowComments={setShowComments}
                        setPostClicked={setPostClicked}
                        updatePost={updatePost}
                        deletePost={deletePost} />
                )
            })}
            {showComments && 
                <Comments 
                    postClicked={postClicked} 
                    showComments={showComments} 
                    setShowComments={setShowComments} 
                />
            }
            {showComments && <Comments setShowComments={setShowComments} />}
            <PostInput submitPost={submitPost} />
        </Box>
    )
}
const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        token: state.token,
    };
};

export default connect(mapStateToProps, null)(ChatBox);
