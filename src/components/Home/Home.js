import React, { useState } from 'react'

import { Container, Box, Text } from '@chakra-ui/react';

import LogIn from '../LogIn/LogIn';
import SignUp from '../SignUp/SignUp';

function Home(props) {
    const [view, setView] = useState('log-in');
    const changeView = (selectedView) => {
        setView(selectedView);
    }

    return (
        <Container maxW="400px" bg="#500550" borderRadius="12px" d='flex' flexDirection='row' mt="100px" justifyContent='center'>
            <Box w="100%" py="40px" px="20px" maxH="400px" overflowY="auto">
            <Box d="flex" flexDirection="row" justifyContent="center" alignItems="center" mb="70px">
                <Text as="button" onClick={() => changeView('log-in')} p="15px" mr="12px" borderRadius="8px" bg={view === "log-in" && "#fff"} color={view === "log-in" ? "#500550" : 'gray.300'} outline="none">Login</Text>
            |
                <Text as="button" onClick={() => changeView('sign-up')} p="15px" ml="12px" borderRadius="8px"  bg={view === "sign-up" && "#fff"} color={view === "sign-up" ? "#500550" : 'gray.300'} outline="none">Signup</Text>
            </Box>
            
            { view === 'log-in' ?  <LogIn {...props} setView={setView} /> : <SignUp {...props} setView={setView} /> }
            </Box>
        </Container>
    )
}

export default Home;
