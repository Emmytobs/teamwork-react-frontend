import React from 'react';
import { connect } from 'react-redux';
import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom'

import "./Header.css";

function Header(props) {
    console.log('From Header: ', props.profilePic);
    return (
        <Box as="header" className="header" >
            <Box as="nav" className="nav">
                <Box d='flex' className="menu-container" >
                    <Link to="/">
                        <Text 
                            fontSize="1.3rem"
                            p="0"
                            _hover={{ backgroundColor: "#fff", color: "#500550" }}>
                                Teamwork
                        </Text>
                    </Link>
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        {props.firstname && 
                        <li>
                            <img 
                                src={props.profilePic ? props.profilePic : 'https://www.google.com/demo=image.pnghttps://res.cloudinary.com/emmytobs/image/upload/v1609773803/pngfind.com-default-avatar-png-4686427_vvbc3e.png'} 
                                alt='User profile pic' />
                        </li>
                        }
                        <li>
                            <a style={{ color: "rgba(255, 255, 255, 0.3)" }} href="https://github.com/emmytobs">Created by Emmytobs</a>
                        </li>
                    </ul>
                </Box>
            </Box>
        </Box>
    )
};

const mapStateToProps = (state) => {
    return {
        firstname: state.user.firstname,
        profilePic: state.user.profilePic
    }
}

export default connect(mapStateToProps, null)(Header);
