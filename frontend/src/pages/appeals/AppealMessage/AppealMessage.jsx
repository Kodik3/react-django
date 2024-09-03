import './AppealMessage.style.css';


const AppealMessage = ({sender, textContent, dateAdded}) => {
    return (
        <div className='AppealsMessage'>
            <div className='Sender'>{sender}</div>
            <div className='TextContent'>{textContent}</div>
            <div className='DateAdded'>{dateAdded}</div>
        </div>
    );
};

export default AppealMessage;