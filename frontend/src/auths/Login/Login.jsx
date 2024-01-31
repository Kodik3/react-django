import React, { useState } from 'react';
import AuthInput from '../UI/AuthInput/AuthInput';
import AuthButton from '../UI/AuthButton/AuthButton'
import { checkRequirements } from '../Errors';
import "./Login.css"
import backend_urls from "../../backend_urls.json"

const Login = () => {
    const url = backend_urls["LOGIN"];
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        email:'',
        password: ''
    });

    const handleChange = (e) => { setFormData({...formData, [e.target.name]: e.target.value}); };

    const hanldeSubmit = async (e) => {
        e.preventDefault();
        const requirementsError = checkRequirements(formData, [], true);
        if (requirementsError.status === "error") {
            setMessage(requirementsError.message);
            return;
        };
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {"Content-type" : "application/json"},
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.status === "error") {
                setMessage(data.message);
                return;
            }
            else {
                setMessage(data.message);
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("user", JSON.stringify(data.data.user));
                if (data.data.is_Admin) {
                    localStorage.setItem("is_Admin", data.data.is_Admin)
                }
            };
        } catch(error) {
            console.error(error);
            setMessage("Ошибка при сетевом запросе");
        };
    };
    
    return (
        <div id='loginBlock'>
            <h1>Авторизация</h1>
            <form action="" onSubmit={hanldeSubmit}>
                <AuthInput value={formData.email} type="email" name="email" placeholder="Email" onChange={handleChange} />
                <AuthInput value={formData.password} type="password" name="password" placeholder="Password" onChange={handleChange} />
                <AuthButton type="submit">Авторизация</AuthButton>
            </form>
            {message && <p id='message'>{message}</p>}
        </div>
    );
};

export default Login;