import React from "react";
import './App.style.css';


function App({children}) {
    return (
        <div className='app'>
            {children}
        </div>
    );
}
  
export default App;