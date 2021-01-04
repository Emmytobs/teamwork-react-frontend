import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { 
    Box, 
    Text, 
    List,
    ListItem, 
    ListIcon,
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionIcon,
    AccordionPanel
} from '@chakra-ui/react';

import axios from 'axios'

import './MenuBar.css';

function MenuBar(props) {
    useEffect(() => {
        fetchDepartmentMembers()
    })

    const [members, setMembers] = useState([])

    async function fetchDepartmentMembers () {
        // Fetch department memeber and store in state
        try {
            const response = await axios.get('http://localhost:5000/departments.members');
            console.log(response);
        } catch (error) {
            console.log(error.response);
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
                    {props.members.map((member, index) => 
                        <ListItem 
                            key={index}
                            cursor="pointer" 
                            py="0"
                            px="0"
                            _hover={{ background: "rgba(255, 255, 255, 0.3)", fontWeight: "500" }} >
                            <Text py="10px" px="12px" >{member.name}</Text>
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
        members: [
            { name: "Emmanuel" }, 
            { name: "Tobi" }, 
            { name: "Jonathan" },
            { name: "Jonathan" },
            { name: "Jonathan" },
            { name: "Jonathan" },
            { name: "Jonathan" },
            { name: "Jonathan" },
            { name: "Jonathan" },
            { name: "Jonathan" },
            { name: "Jonathan" },
            { name: "Jonathan" },
            { name: "Jonathan" },
            { name: "Jonathan" },
            { name: "Jonathan" },
            { name: "Jonathan" },
            { name: "Jonathan" },
            { name: "Jonathan" },
            { name: "Jonathan" },
            { name: "Jonathan" },
            { name: "Jonathan" },
            { name: "Jonathan" },
            { name: "Jonathan" },
        ]
    }
}

export default connect(mapStateToProps, null)(MenuBar)
