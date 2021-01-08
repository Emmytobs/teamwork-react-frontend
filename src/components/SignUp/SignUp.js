import React, { useState } from 'react'

import { VStack, Input, Button, Select } from '@chakra-ui/react';
import axios from 'axios';
import FormError from '../FormError/FormError';

import './SignUp.js';

function SignUp(props) {
    const [departments, setDepartments] = useState([]);
    const [error, setError] = useState('');
    const [form, setForm] = useState({ 
        firstname: '',
        lastname: '',
        email: '', 
        gender: '',
        jobrole: '',
        department: '',
        profilePic: '',
        address: '',
    })
    const updateForm = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }
    const fetchDepartments = async (e) => {
        // Fatch departments' ids and names here
        if(!departments.length) {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/departments`);
                const { departments } = response.data.data;
                setDepartments(departments);
            } catch (error) {
                console.log(error.response.message)
            }
        }
    }
    const submitForm = async (e) => {
        // Send POST request with form data
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/create-employee-user`, { ...form });
            if(!response) {
                return setError('Couldn\'t make request. Please check your internet connection')
            }
            props.history.push('/app')
            setError('');
        } catch (error) {
            console.log(error.response)
            setError('Email already exists');
        }
    }

    return (
        <VStack as = "form" spacing="20px" color="gray.300">
            <Input name="firstname" size="md" type="text" value={form.firstname} placeholder="Firstname" onChange={updateForm}  />
            <Input name="lastname" size="md" type="text" value={form.lastname} placeholder="Lastname" onChange={updateForm}  />
            <Input name="email" size="md" type="email" value={form.email} placeholder="Enter your email address" onChange={updateForm}  />
            <Select name="gender" value={form.gender} onChange={updateForm} placeholder="Select gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </Select>
            <Input name="jobrole" size="md" type="text" value={form.jobrole} placeholder="Enter job role" onChange={updateForm}  />
            <Select name="department" value={form.department} onChange={updateForm} placeholder="Select department" onClick={fetchDepartments}>
                {
                    departments.map((department, index) => <option key={index} value={department.department_id}> {department.name} </option>)
                }
            </Select>
            
            <Input name="profilePic" size="md" type="text" value={form.profilePic} placeholder="Link to profile pic" onChange={updateForm}  />
            
            <Input name="address" size="md" type="text" value={form.address} placeholder="Address" onChange={updateForm}  />
            {error && <FormError message={error} />}
            <Button onClick={submitForm} color="#000">Create employee user</Button>
        </VStack>
    )
}

export default SignUp
