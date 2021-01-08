import React, { useState } from 'react'
import { Box, InputGroup, Textarea, Button } from '@chakra-ui/react';

function PostInput({ submitPost }) {
    const [post, setPost] = useState({ article: '', gif: '' });
    
    const handleClick = (e) => {
        if (!post.article) {
            return
        }
        submitPost(post);
        setPost({ article: '', gif: '' });
    }

    const updatePost = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    }

    return (
        <Box
            position="fixed"
            right="5%"
            bottom="5%"
            w="70%"
            p="20px"
            bgColor="white" 
            boxShadow="dark-lg" rounded="md">
            <InputGroup>
                <Textarea name="article" value={post.article} placeholder="Write a post" onChange={updatePost} _placeholder={{ color: "#000" }} color="#000" h="70px" />
                <Button type="button" ml="30px" onClick={handleClick}>Submit</Button>
            </InputGroup>    
        </Box>
    )
}

export default PostInput
