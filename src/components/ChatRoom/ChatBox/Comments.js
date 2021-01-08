import React, { useEffect } from 'react'

import axios from 'axios';

import { Box, Text } from '@chakra-ui/react';

function Comments(props) {
    useEffect(() => {
        // fetchComments()
    })

    async function fetchComments () {
        try {
            const response = await axios.post('http://localhost:5000/comments/read', 
            { postId: props.postClicked },
            {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            });
            console.log(response.data)
        } catch (error) {
            console.log(error.response)
        }
    }

    return (
        <Box
        position="fixed"
        right="5%"
        top="30%"
        w="50%"
        left="70%"
        transform="translateX(-70%)"
        maxH="450px"
        bg="#fff"
        overflow="auto">
            <Box as='button' onClick={() => props.setShowComments(false)}> X </Box>
             <Box mt="10px">
                <Text 
                    as="h4"
                    d="inline-block" 
                    fontWeight="500" 
                    textAlign="left">
                    {/* {props.comment.firstname} {props.comment.lastname}  */}
                </Text>
                {/* <Text as="span" ml="10px" color="gray.500">{props.date}</Text> */}
                <Box className="modify-post-container">
                    <Text as="button" className="edit-btn">Edit</Text>
                    <Text as="button" className="delete-btn">Delete</Text>
                </Box>
            </Box>
            <Box>
                {/* <Text>{props.comment.article}</Text>
                {props.comment.gif_link && <img src={props.comment.gif_link} alt="gif" w="100%" h="auto" />} */}
            </Box>
        </Box>
    )
}

export default Comments;
