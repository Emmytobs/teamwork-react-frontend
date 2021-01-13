import React, {useState, useEffect, useRef } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';

import { storeToken, storeUser } from '../../context/dispatchers';

function ChatRoomProtected({ path, exact, component: Component, dispatch, token: tokenInRedux }) {

    const token = useRef(null);
    const [ isTokenPresent, setIsTokenPresent ] = useState(false);

    useEffect(() => {
        token.current = getTokenInLocalStorage();
       
        if (!token.current) {
            console.log('No token')
            redirectUserToLogin()
        }
        else {
            console.log('Will this run')
            checkIfTokenIsValid()
        }
    }, [])

    function getTokenInLocalStorage() {
        return JSON.parse(localStorage.getItem('token'))
    };

    function redirectUserToLogin() {
        window.location = '/'
    }

    async function checkIfTokenIsValid() {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/user-token/verify`,
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
            setIsTokenPresent(true)

        } catch (error) {
            console.log(error.response)
            redirectUserToLogin()
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
