import React from 'react';
import "./AuthButton.css"


const AuthButton = ({ children, ...props }) => {
    return (
        <button {...props} id='AuthButton'>
            {children}
        </button>
    );
};

export default AuthButton;