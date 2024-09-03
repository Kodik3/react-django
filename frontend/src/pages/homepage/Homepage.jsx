import { useEffect, useState } from 'react';
import { useAuth } from 'src/context/AuthContext';
import Request, { BACKEND_URLS} from 'src/utils/Request.ts';


const title = 'Homepage'

const Homepage = () => {
    useEffect(() => { 
        document.title = title;
        getUserList();
    });
    const [userList, setUserList] = useState([]);
    const { token } = useAuth();
    const request = token ?  new Request(token) : undefined;

    const getUserList = async () => {
        if (token){
            const data = await request.get(BACKEND_URLS["CLIENT_LIST"]);
            if (data) {
                setUserList(data.data);
            } else {return}
        };
    };
    return (
        <div>
            {userList && userList.length > 0 ? (
                userList.map(user => (
                    <div className='userBlock' key={user.id}>
                        <hr/>
                        <p>{user.first_name} {user.last_name}</p>
                        <p>{user.email}</p>
                        <hr/>
                    </div>
                ))
            ) : (
                <p>No users available.</p>
            )}
        </div>
    );    
};

export default Homepage;<h1>Homepage</h1>