import { Link } from 'react-router-dom';
import { useAuth } from 'src/context/AuthContext';
import './Header.css';


const Header = () => {
  const { token, updateToken } = useAuth();
  const logout = () => { updateToken(''); };

  return (
    <header id='baseHeader'>
      <Link id='SiteName' to="/">SiteName</Link>
      <nav id='headerNavigation'>
        <Link className='headerLink' to={'/currency'}>Currency</Link>
        <Link className='headerLink' to={'/appeals_chat'}>Appeals chat</Link>
      </nav>
      {!token ? (
        <div id='userAuths'>
          <Link className='headerLink' to="/registration">Registration</Link>
          <Link className='headerLink' to="/login">Login</Link>
        </div>
      ) : (
        <div id='userAuths'>
          <Link className='headerLink' to="/profile">Profile</Link>
          <Link className='headerLink' onClick={logout} to="/login">logout</Link>
        </div>
      )}
    </header>
  );
};

export default Header;