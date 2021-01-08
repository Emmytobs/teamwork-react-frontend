import React, { useState } from 'react'

import { Container, Box, Button, Input, VStack  } from '@chakra-ui/react';
import axios from 'axios';
import { connect } from 'react-redux';

import './LogIn.css'
import { storeToken, storeUser } from '../../context/dispatchers';
import FormError from '../FormError/FormError';


function LogIn(props) {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('')
    const updateForm = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }
    const submitForm = async (e) => {
        // Send API post request to log user in
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { ...form });
            const { token, user: { firstname, lastname, email, department, isadmin, profilePic } } = response.data.data;
        
            if(!response) {
                setError('Couldn\'t make request. Please check your internet connection');
            }
            storeToken(token, props.dispatch);
            storeUser({ firstname, lastname, email, department, isadmin, profilePic }, props.dispatch);

            setError('');
            props.history.push('/app');
        } catch (error) {
            if (error.message === 'Network Error') {
                return setError('An error occured. Please try again later');
            }
            const { message } = error.response.data;
            console.log(message)
            setError(message);
        }
    }
    return (
        <VStack spacing="20px" as="form" color="gray.300">
            <Input name="email" size="md" type="text" placeholder="Enter your email address" onChange={updateForm} />
            <Input name="password" size="md" type="password" placeholder="Enter your password" onChange={updateForm} />
            {error && <FormError message={error} />}
            <Button onClick={submitForm} color="#000">Log in</Button>
        </VStack>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        token: state.token,
    }
}

export default connect(mapStateToProps, null)(LogIn);
