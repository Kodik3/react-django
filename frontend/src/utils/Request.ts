export const HOST = 'http://127.0.0.1:8000';

//! лучше вынести в json файл
export const BACKEND_URLS = {
    REGISTRATION: "/users/signup/",
    LOGIN : "/users/login/",
    GET_USER_INFO : "/users/get_info/",
    CHANGE_USER_NAME : "/users/change_user_name/",
    CHANGE_USER_PASSWORD : "/users/change_user_password/",
    CLIENT_LIST : "/users/list_of_clients/",
    APPEALS_LIST_FOR_CHAT : "/appeals/list_for_chat/",
    CREATE_APPEAL : "/appeals/create_new_appeal/",
};

class Request {
    private token?: string;
    private headers: Record<string, string>;

    constructor(userToken?: string) {
        this.token = userToken;
        this.headers = {'Content-type': 'application/json'};
        if (this.token) {
            this.headers['Authorization'] = `Token ${this.token}`;
        };
    };

    async get(url: string) {
        try {
            const response = await fetch(`${HOST}${url}`, {
                method: 'GET',
                headers: this.headers
            });
            if (!response.ok) {
                console.error(`Запрос не выполнен со статусом: ${response.status}`);
            };
            return await response.json();
        }
        catch(error) {
            console.error(`Произошла ошибка: ${error}`);
        };
    };

    async post(url: string, data: any) {
        try {
            const response = await fetch(`${HOST}${url}`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                console.error(`Запрос не выполнен со статусом: ${response.status}`);
            };
            return await response.json();
        }
        catch(error) {
            console.error(`Произошла ошибка: ${error}`);
        };
    };
};


export default Request;