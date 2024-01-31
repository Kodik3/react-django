import React, { useEffect, useState } from 'react';
import backend_urls from "../backend_urls.json"

const Homepage = () => {
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        const getUserList = async () => {
            const token = localStorage.getItem("token");
            const response = await fetch(backend_urls["CLIENT_LIST"],{
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                },
            })
            const data = await response.json();
            setUserList(data.data);
        }
        getUserList();
    }, [])
    return (
        <div>
            <h1>Homepage</h1>
            {userList.length > 0 ? (userList.map(user => (
                    <p key={user.id}>{user.email}</p>
                ))) : (<p>No users available.</p>)}
        </div>
    );
};

export default Homepage;<h1>Homepage</h1>