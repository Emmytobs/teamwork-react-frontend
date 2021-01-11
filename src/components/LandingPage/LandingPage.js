import React from 'react'
import { Box, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom'

import './LandingPage.css';

function LandingPage() {
    return (
        <Box>
            <Text>
            Teamwork is an internal social network for employees of an organization. The goal of this application is to facilitate more interaction between colleagues and promote team bonding.
            </Text>
            <Link to="/home">
                <Button>Get Started</Button>
            </Link>
        </Box>
    )
}

export default LandingPage;
