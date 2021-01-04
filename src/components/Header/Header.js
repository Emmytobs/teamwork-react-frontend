import React from 'react';
import { connect } from 'react-redux';
import { Box, Text } from '@chakra-ui/react';

import "./Header.css";

function Header(props) {
    return (
        <Box as="header" className="header" >
            <Box as="nav" className="nav">
                {/* <Box d='flex' className="menu-container" flexDirection="row" justifyContent="flex-end" alignItems="center"> */}
                <Box d='flex' className="menu-container" >
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>
                            <img 
                                src={props.profilePic ? props.profilePic : 'https://www.google.com/demo=image.pnghttps://res.cloudinary.com/emmytobs/image/upload/v1609773803/pngfind.com-default-avatar-png-4686427_vvbc3e.png'} 
                                alt='User profile pic' />
                        </li>
                    </ul>
                    <Text color="rgba(255, 255, 255, 0.3)" mr="10px">Created by <a href="https://github.com/emmytobs">Emmytobs</a></Text>
                </Box>
            </Box>
        </Box>
    )
};

const mapStateToProps = (state) => {
    return {
        profilePic: state.user.profilePic
    }
}

export default connect(mapStateToProps, null)(Header);
