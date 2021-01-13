import React, {useState, useEffect, useRef } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';

import { storeToken, storeUser } from '../../context/dispatchers';

function ChatRoomProtected({ path, exact, component: Component, dispatch, token: tokenInRedux }) {

    const token = useRef(null);
    const [ isTokenPresent, setIsTokenPresent ] = useState('');

    useEffect(() => {
        token.current = getTokenInLocalStorage()
        console.log('From protected chatroom', token.current);
       
        if (!token.current) {
            console.log('No token')
            // redirectUserToLogin()
        }
        else {
            console.log('Will this run')
            checkIfTokenIsValid()
        }
    }, [])

    function getTokenInLocalStorage() {
        return localStorage.getItem('token')
    };

    function redirectUserToLogin() {
        setIsTokenPresent(false)    
    }

    async function checkIfTokenIsValid() {
        try {
            console.log(token.current)
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/user-token/verify`,
                // `http://localhost:5000/user-token/verify`,
                { headers: { 'Authorization': 'Bearer ' + token.current } }
            );

            if (response.status !== 200) {
                // Since the status of the response is not 200, the token is not valid
                return redirectUserToLogin();
            }

            // This will only run if the token is valid
            const {
                user: { 
                    user_id: userId, firstname, lastname, email, department, isadmin, profilePic 
                } 
            } = response.data.data;
            
            storeToken(token.current, dispatch);
            storeUser({ userId, firstname, lastname, email, department, isadmin, profilePic }, dispatch);
            console.log('Return the component')
            setIsTokenPresent(true)

        } catch (error) {
            console.log(error.response)
        }
    }

    return (
       <>
       {
        isTokenPresent === true ? 
        (
            <Route 
            path={path} 
            exact={exact} 
            render={(routerProps) => <Component {...routerProps} />} 
            />
        ) :
        (
            <p>
                Loading...
            </p>
        ) 
       }
        
       </>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(ChatRoomProtected)
