import React, { useEffect, useState } from 'react';
import { useAuth } from 'src/context/AuthContext';
import { HOST } from 'src/utils/Request.ts';
import AppealMessagesList from '../AppealMessagesList/AppealMessagesList';
import AppealsList from '../AppealsList/AppealsList';
import AppealForm from '../AppealForm/AppealForm';
import './AppealsChat.style.css';


const AppealsChat = () => {
    const { token } = useAuth();
    useEffect(() => {
        document.title = 'Appeals Chat';
    }, []);

    const [chatId, setChatId] = useState(0);
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');

    const [isCreateAppeal, setIsCreateAppeal] = useState(false);
    
    const [ws, setWs] = useState(undefined);

    useEffect(() => {
        if (!chatId || !token) return;

        const socket = new WebSocket(`ws://${HOST.split('//')[1]}/ws/chat/${chatId}/`);
        setWs(socket);

        socket.onopen = () => {console.log('ws connect to appeal_chat: ', chatId);};

        socket.onmessage = (event) => {
            const receivedData = JSON.parse(event.data);
            if (Array.isArray(receivedData)) {
                setMessages(receivedData);
            } else {
                setMessages(prevData => [...prevData, receivedData]);
            }
            console.log('Получено сообщение от сервера:', receivedData);
        };

        socket.onclose = () => { console.log('ws close ', chatId); };
        
        return () => {
            socket.close();
            setWs(null);
        };
    }, [chatId, token]);

    const sendMessage = () => {
        if (!messageText.trim() || !ws) { return; };
        const message = {
            text_content: messageText,
            user_id : JSON.parse(localStorage.getItem('user')).id
        };
        ws.send(JSON.stringify(message));
        setMessageText('');
    };

    return (
        <div className='AppealsChat'>
    
            <div className='AllAppealsBlock'>
                <div>All appeals</div>
                <AppealsList getChatId={(chat_id) => { setChatId(chat_id); setIsCreateAppeal(false);}} />
                <button className='CreateAppealButton' onClick={() => setIsCreateAppeal(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                    </svg>
                    <div style={{marginLeft:'10px'}}>Создать заявку</div>
                </button>
            </div>
    
            <div className='ChatBlock'>
                {isCreateAppeal ? (
                    <React.Fragment>
                        <button className='BackButton' onClick={() => {setIsCreateAppeal(false);}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
                                <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/>
                            </svg>
                            <span>Вернутся</span>
                        </button>
                        <AppealForm/>
                    </React.Fragment>
                ) : (
                    !chatId ? <div id='SelectChatText'>Выберите чат</div> : (
                        <React.Fragment>
                            <AppealMessagesList messages={messages} />
                            {chatId && (
                                <div className="MessageInputBlock">
                                    <input
                                        className='MessageInput'
                                        type="text" 
                                        placeholder="Введите сообщение..." 
                                        value={messageText} 
                                        onChange={(e) => setMessageText(e.target.value)}
                                    />
                                    <button className='MessageInputButton' onClick={sendMessage}>Отправить</button>
                                </div>
                            )}
                        </React.Fragment>
                    )
                )}
            </div>
    
        </div>
    );
};

export default AppealsChat;
