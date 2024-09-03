import { useEffect, useRef, useState } from 'react';
import AppealMessage from "../AppealMessage/AppealMessage";
import './AppealMessagesList.style.css';

const AppealMessagesList = ({ messages }) => {
    const messagesEndRef = useRef(null);
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);

    useEffect(() => {
        if (isScrolledToBottom) {
            scrollToBottom();
        }
    }, [messages]);

    const handleScroll = () => {
        const scrollTop = messagesEndRef.current.scrollTop;
        const scrollHeight = messagesEndRef.current.scrollHeight;
        const clientHeight = messagesEndRef.current.clientHeight;

        if (scrollHeight - scrollTop === clientHeight) {
            setIsScrolledToBottom(true);
        } else {
            setIsScrolledToBottom(false);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    };

    return (
        <div className='AppealMessages' ref={messagesEndRef} onScroll={handleScroll}>
            {messages.map((message, index) => (
                <AppealMessage
                    key={index}
                    sender={message['user_name']}
                    textContent={message['text_content']}
                    dateAdded={message['date_added']}
                />
            ))}
        </div>
    );
};

export default AppealMessagesList;
