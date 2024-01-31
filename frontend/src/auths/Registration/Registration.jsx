import React, { useState } from 'react';
import AuthInput from '../UI/AuthInput/AuthInput';
import AuthButton from '../UI/AuthButton/AuthButton'
import { checkRequirements, checkPasswords } from "../Errors";
import "./Registration.css"
import backend_urls from "../../backend_urls.json"


const Registration = () => {
    const url = backend_urls["REGISTRATION"];
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password2: ''
    });

    const handleChange = (e) => { setFormData({...formData, [e.target.name]: e.target.value}) };

    const hanldeSubmit = async (e) => {
        e.preventDefault();
        const requirementsError = checkRequirements(formData, [], true);
        if (requirementsError.status === "error") {
            setMessage(requirementsError.message);
            return;
        };

        const passwordError = checkPasswords(formData.password, formData.password2);
        if (passwordError.status === "error") {
            setMessage(passwordError.message);
            return;
        };

        const copyFormData = {...formData};
        delete copyFormData["password2"];

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(copyFormData)
            })
            const data = await response.json();
            if (data.status === "error") {
                setMessage(data.message);
                return;
            } 
            else {setMessage(data.message);};

        } catch(error) {
            console.error(error);
            setMessage("Ошибка при сетевом запросе");
        };
    }

    return (
        <div id='registrationBlock'>
            <h1>Регистрация</h1>
            <form method='POST' onSubmit={hanldeSubmit}>
                <AuthInput value={formData.first_name} type="text" name="first_name" placeholder="First name" onChange={handleChange} />
                <AuthInput value={formData.last_name} type="text" name="last_name" placeholder="Last name" onChange={handleChange} />
                <AuthInput value={formData.email} type="email" name="email" placeholder="Email" onChange={handleChange} />
                <AuthInput value={formData.password} type="password" name="password" placeholder="Password" onChange={handleChange} />
                <AuthInput value={formData.password2} type="password" name="password2" placeholder="Reapet password" onChange={handleChange} />
                <AuthButton type="submit">Регистрация</AuthButton>
            </form>
            {message && <p id='message'>{message}</p>}
        </div>
    );
};

export default Registration;