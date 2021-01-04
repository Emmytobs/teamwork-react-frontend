import React from 'react'
import { Box, InputGroup, Textarea, Button } from '@chakra-ui/react';

function PostInput() {
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
                <Textarea placeholder="Write a post" _placeholder={{ color: "#000" }} color="#000" h="70px" />
                <Button type="button" ml="30px">Submit</Button>
            </InputGroup>    
        </Box>
    )
}

export default PostInput
