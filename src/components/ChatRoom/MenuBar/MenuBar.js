import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { 
    Box, 
    Text, 
    List,
    ListItem,
} from '@chakra-ui/react';

import { storeDepartmentMembers } from '../../../context/dispatchers';

import axios from 'axios'

import './MenuBar.css';

function MenuBar(props) {
    useEffect(() => {
        fetchDepartmentMembers()
    }, []);

    async function fetchDepartmentMembers() {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/departments/members`,
                {
                    headers: {
                        'Authorization': 'Bearer ' + props.token,
                    },
                }
            );
            if (!response) {
                // set global error state indicating no internet
            }
        
            if (!response.data.data) {
                // Set notification state that tells the user there are no members
            }
            storeDepartmentMembers(response.data.data.members, props.dispatch);
        } catch (error) {
            // set error state
            console.log(error.response)
        }
    }

    return (
        <Box className="menu-bar">
            <Box 
                color="#fff" 
                borderTop="1px solid #c9c3c371" 
                borderBottom="1px solid #c9c3c371"
                py="15px" 
                px="30px"
                margin="0 auto"
                w="100%"
                z-index="20" 
                bgColor="inherit">
                <Text textAlign="left" w="100%">
                    Department #{props.user.department}
                    {props.user.isadmin && <span>Change</span>}
                </Text>
            </Box>
            <Box color="#fff" marginTop="26px" w="100%">
                <Text as="h1" fontSize="2rem" px="12px">Members</Text>
               
                <List>
                    {props.departmentMembers.map((member, index) => 
                        <ListItem 
                            key={index}
                            cursor="pointer" 
                            py="0"
                            px="0"
                            _hover={{ background: "rgba(255, 255, 255, 0.3)", fontWeight: "500" }} >
                            <Text py="10px" px="12px" >{member.firstname} {member.lastname}</Text>
                        </ListItem>)
                    }
                </List>
            </Box>
        </Box>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        departmentMembers: state.departmentMembers,
        token: state.token,
    }
}

export default connect(mapStateToProps, null)(MenuBar)
