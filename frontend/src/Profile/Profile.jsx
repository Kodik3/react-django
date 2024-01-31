import React, { useState } from 'react';
import backend_urls from "../backend_urls.json"

const Profile = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    // name.
    const [newNameMessage, setNewNameMessage] = useState('');
    const [newName, setNewName] = useState({
        new_name : ''
    });
    const [isChangeNameInput, setIsChangeNameInput] = useState(false);
    const useChangeName = () => { setIsChangeNameInput(true); };
    const changeName = (e) => { setNewName({ new_name: e.target.value }); };
    // password.
    const [isChangePasswordInput, setIsChangePasswordInput] = useState(false);
    const [newPassword, setNewPassword] = useState({
        password: '',
        reapet_password: ''
    });

    const changePassword = (e) => { setNewPassword({...newPassword, [e.target.name]: e.target.value}) };

    const submitNewName = async (e) => {
        e.preventDefault();
        const lastDateUpdateName = localStorage.getItem('lastUpdate')
        if (lastDateUpdateName) {
            
        }
        const responce = await fetch(backend_urls["CHANGE_USER_NAME"], {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(newName)
        });
        if (responce.ok) {
            const data = await responce.json();
            setNewNameMessage(data.message);
            // сохроняем новое имя в LocalStorage
            user.full_name = data.data.full_name;
            localStorage.setItem('user', JSON.stringify(user));
            // закрываем поле изменения имени.
            setIsChangeNameInput(false);
        }
    }
    
    return (
        <div id='profile'>
            <div id='userName'>
                {newNameMessage && (<p className='message'>{newNameMessage}</p>)}
                <h2>Name: {user['full_name']}</h2>
                <span onClick={useChangeName}>изменить</span>
                {isChangeNameInput && (
                    <form method='POST' onSubmit={submitNewName}>
                        <input value={newName.name} type="text" name='new_name' onChange={changeName} />
                        <button type='submit'>Подтвердить</button>
                        {newNameMessage && (<p className='message'>{newNameMessage}</p>)}
                    </form>
                )}
            </div>
            <h3>Email: {user["email"]}</h3>
        </div>
    );
};

export default Profile;