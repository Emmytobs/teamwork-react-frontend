import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';

import { storeUpdatedPost } from '../../../context/dispatchers'
import { Box, Text, Input, Button, useEditableControls, useMergeRefs } from '@chakra-ui/react';

function Post(props) {
    const [editablePostId, setEditablePostId] = useState('')
    const [hiddenPostId, setHiddenPostId] = useState('');
    const [updatedPost, setUpdatedPost] = useState('');
    
    const showCommentsModal = (e) => { 
        console.log(props.post.post_id);
        props.setPostClicked(props.post.post_id) ;
        props.setShowComments(true);
    } 
    
    const editPostHandler = (postId, oldPost) => {
        setUpdatedPost(oldPost)
        setEditablePostId(postId);
        setHiddenPostId(postId);
    }

    const cancelEditPostHandler = (postId) => {
        setEditablePostId('');
        setHiddenPostId('');
    }

    const updatePost = async (e) => {
        e.preventDefault();
        const response = await props.updatePost({ article: updatedPost, postId: props.post.post_id })

        if (response === true) {
            setEditablePostId('');
            setHiddenPostId('');
        } else {
            console.log('Post update failed')
            setEditablePostId('');
            setHiddenPostId('');
        }
    }

    const deletePost = async () => {
        const response = await props.deletePost({ postId: props.post.post_id })
        
        if (response === true) {
            setEditablePostId('');
            setHiddenPostId('');
        } else {
            console.log('Post delete failed')
            setEditablePostId('');
            setHiddenPostId('');
        }
    }

    return (
        <Box 
        className="post-container"
        w='100%' 
        py="10px" 
        px="25px"
        borderTop="1px solid rgba(0,0,0,0.3)" 
        borderBottom="1px solid rgba(0,0,0,0.3)">
            <Box >
                <img src={props.post.profile_pic ? props.post.profile_pic : 'https://res.cloudinary.com/emmytobs/image/upload/v1609773803/pngfind.com-default-avatar-png-4686427_vvbc3e.png'} width="30px" height="30px" alt='user profile'/>
            </Box>            
            <Box mt="10px">
                <Text 
                    as="h4"
                    d="inline-block" 
                    fontWeight="500" 
                    textAlign="left">
                    {props.post.firstname} {props.post.lastname} 
                </Text>
                <Text as="span" ml="10px" color="gray.500">{props.date}</Text>
               <Box className="modify-post-container" >
                    {props.user.userId === props.post.created_by &&
                    <>
                        <Text as="button" className="edit-btn" onClick={() => editPostHandler(props.post.post_id, props.post.article)}>Edit</Text>
                        <Text as="button" className="delete-btn" onClick={deletePost}>Delete</Text>
                    </>
                    }
                    <Text as="button" className="comments-btn" onClick={showCommentsModal}>View Comments</Text>
                </Box>
            </Box>
            <Box>
            {props.post.post_id !== editablePostId && <Text>{props.post.article}</Text>}

            {props.post.post_id === editablePostId &&
                <form as="form" onSubmit={updatePost}>
                    <Input value={updatedPost} onChange={(e) => setUpdatedPost(e.target.value)} />
                    <Button type='submit'>Update post</Button>
                    <Button onClick={() => cancelEditPostHandler(props.post.post_id)}>Cancel</Button>
                </form>
            }
            {props.post.gif_link && <img src={props.post.gif_link} alt="gif" w="100%" h="auto" />}
            </Box>
        </Box>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user
    }
}

export default connect(mapStateToProps, null)(Post)
