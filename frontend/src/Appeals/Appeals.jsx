import React, { useEffect, useState } from 'react';
import "./Appeals.css";
import backend_urls from "../backend_urls.json"

const Appeals = () => {
    const token = localStorage.getItem("token");
    const isAdmin  = localStorage.getItem("is_Admin")

    const [appealsForm, setAppealsForm] = useState({
        theme: '',
        text: ''
    });

    const handleChange = (e) => { setAppealsForm({...appealsForm, [e.target.name]: e.target.value}); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        for (let key of Object.keys(appealsForm)) {
            if (!appealsForm[key]) {
                // не отпровляем пустую форму
                return;
            };
        };
        try {
            const response = await fetch(backend_urls["CREATE_APPEAL"], {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appealsForm),
            });
            if (response.ok) {
                setAppealsForm({ theme: '', text: '' });
                const data = await response.json();
                console.log('Response data: ', data);
            };
        } 
        catch(error) {
            console.error(error);
        };
    }
    useEffect(() => {
    }, [])
    return (
        <div id='appeals'>
            <h1>Appeals</h1>
            {!!isAdmin && (
                <form action="POST" onSubmit={handleSubmit}>
                    <input value={appealsForm.theme} type="text" name='theme' placeholder='Theme' onChange={handleChange} />
                    <input value={appealsForm.text} type="text" name="text" placeholder='Text' onChange={handleChange} />
                    <button type='submit'>Отправить</button>
                </form>
            )}
        </div>
    );
};

export default Appeals;