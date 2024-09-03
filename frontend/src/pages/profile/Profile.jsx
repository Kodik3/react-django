import { useEffect, useState } from 'react';
import { checkPasswords } from 'src/pages/auths/Errors.js';
import Request, { BACKEND_URLS } from 'src/utils/Request.ts';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/context/AuthContext';
import './Profile.css';


const title = 'Profile';

const Profile = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate('/login');
            toast.error('Вы не вошли в свой аккаунт');
        }
        document.title = title;
    }, []);

    const user = JSON.parse(localStorage.getItem('user'));
    const request = token ? new Request(token) : undefined;

    // name.
    const [newNameMessage, setNewNameMessage] = useState('');
    const [newName, setNewName] = useState({new_name : ''});
    const [isChangeNameInput, setIsChangeNameInput] = useState(false);
    const useChangeNameInput = () => { setIsChangeNameInput(!isChangeNameInput); };
    const changeName = (e) => { setNewName({ new_name: e.target.value }); };

    const submitNewName = async (e) => {
        e.preventDefault();
        // проверка нового имени.
        if (!newName.new_name || newName.new_name.trim().split(' ').length !== 2) {
            setNewNameMessage('Строка должна содержать Имя и Фамилию');
            return;
        };
        try {
            const data = await request.post(BACKEND_URLS["CHANGE_USER_NAME"], newName);
            setNewNameMessage(data.message);
            // сохроняем новое имя в LocalStorage
            user.full_name = data.data.full_name;
            localStorage.setItem('user', JSON.stringify(user));
        } catch(error) { console.error(error); };
    };
    // password.
    const [newPasswordMessage, setNewPasswordMessage] = useState('');
    const [isChangePasswordInput, setIsChangePasswordInput] = useState(false);
    const useChangePassword = () => { setIsChangePasswordInput(!isChangePasswordInput); };
    const [newPassword, setNewPassword] = useState({
        password: '',
        reapet_password: '',
        old_password: ''
    });
    const changePassword = (e) => { setNewPassword({...newPassword, [e.target.name]: e.target.value}); };
    const submitNewPassword = async (e) => {
        e.preventDefault();
        // проверка новых паролей.
        const passwordError = checkPasswords(newPassword.password, newPassword.reapet_password);
        if (passwordError.status === 'error') {
            setNewPasswordMessage(passwordError.message);
            return;
        };
        try {
            const data = await request.post(BACKEND_URLS["CHANGE_USER_PASSWORD"], newPassword);
            setNewPasswordMessage(data.message);
            setNewPassword({password:'', reapet_password:'', old_password:''});
        }catch(error) { console.log(error); };
    };
    useEffect(() => {
        if (!isChangeNameInput) { setNewNameMessage(''); };
        if (!isChangePasswordInput) { setNewPasswordMessage(''); };
    }, [isChangeNameInput, isChangePasswordInput]);
    return (
        <div id='profile'>
            <div id='userEmail'>Email: {user["email"]}</div>

            <div id='userNameBlock'>
                <div id='userName'>
                    <div id='name'>{user['full_name']}</div>
                    <div id='changeName' onClick={useChangeNameInput}>изменить</div>
                </div>
                {isChangeNameInput && (
                    <form id='userNameForm' method='POST' onSubmit={submitNewName}>
                        <input value={newName.name} type='text' name='new_name' onChange={changeName} placeholder='Новое имя' />
                        <button type='submit'>Подтвердить</button>
                        {(newNameMessage) && (<p className='message'>{newNameMessage}</p>)}
                    </form>
                )}
            </div>

            <div id='changePassword' onClick={useChangePassword}>изменить пароль</div>
            {isChangePasswordInput &&
                <form method='POST' onSubmit={submitNewPassword}>
                    <input value={newPassword.password} type="password" name='password' onChange={changePassword} placeholder='Новый пароль' />
                    <input value={newPassword.reapet_password} type="password" name='reapet_password' onChange={changePassword} placeholder='Повторите новый пароль' />
                    <input value={newPassword.old_password} type="password" name='old_password' onChange={changePassword} placeholder='Введите нынешний пароль' />
                    <button type='submit'>Подтвердить</button>
                    {(newPasswordMessage) && <p className='message'>{newPasswordMessage}</p>}
                </form>
            }
        </div>
    );
};

export default Profile;