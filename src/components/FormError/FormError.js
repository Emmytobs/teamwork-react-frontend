import React from 'react'

import { Box, Text } from '@chakra-ui/react';

function FormError(props) {
    return (
        <Box w="100%" color="#fff">
            <Text textAlign="center">{props.message}</Text>
        </Box>
    )
}

export default FormError;