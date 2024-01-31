import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Header.css"

const Header = () => {
    const [isAuthenticate, setIsAuthenticate] = useState(false);

    const logout = () => {
      localStorage.removeItem("token"); 
      localStorage.removeItem("user");
    }

    useEffect(() => {
      const user = localStorage.getItem("user");
      setIsAuthenticate(!!user);
    }, []); 

    const SiteName = "NameOrIMG";

    return (
      <header id='baseHeader'>
        <Link id='SiteName' to="/">{SiteName}</Link>
        <nav id='headerNavigation'>
          <Link className='headerLink' to={'/appeals'}>Appeals</Link>
        </nav>
        {!isAuthenticate && (
          <div id='userAuths'>
            <Link className='headerLink' to="/registration">Registration</Link>
            <Link className='headerLink' to="/login">Login</Link>
          </div>
        )}
        {isAuthenticate && (
          <div id='userAuths'>
            <Link className='headerLink' to="/profile">Profile</Link>
            <Link className='headerLink' onClick={logout} to="/login">Logout</Link>
          </div>
        )}
      </header>
    );
  };

export default Header;