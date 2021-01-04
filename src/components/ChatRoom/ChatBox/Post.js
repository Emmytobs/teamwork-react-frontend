import React from 'react'

import { Box, Text } from '@chakra-ui/react';

function Post(props) {
    return (
        <Box w='100%' py="10px" px="25px" borderTop="1px solid rgba(0,0,0,0.3)" borderBottom="1px solid rgba(0,0,0,0.3)">
            <Box >
                <img src={props.post.profilePic ? props.post.profilePic : 'https://res.cloudinary.com/emmytobs/image/upload/v1609773803/pngfind.com-default-avatar-png-4686427_vvbc3e.png'} width="30px" height="30px" alt='user profile'/>
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
                <Text>{props.post.article}</Text>
                {props.post.gif_link && <img src={props.post.gif_link} alt="gif" w="100%" h="auto" />}
            </Box>
        </Box>
    )
}

export default Post