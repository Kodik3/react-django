import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from 'sonner';
import * as pages from 'src/pages/index';
import Header from './components/header/Header'
import App from './app/App';
import Request, { HOST, BACKEND_URLS } from './utils/Request';
import { AuthProvider, useAuth } from "./context/AuthContext";


function Providers({theme}) {
  // const { token } = useAuth();
  // const request = token ? new Request(token) : undefined;

  // const getUserInfo = async () => {
  //   const url = `${HOST}${BACKEND_URLS['GET_USER_INFO']}`
  //   try {
  //     if (request) {
  //       const data = await request.post(url, token);
  //       //TODO: доделать запрос на данные пользователя
  //     };
  //   } catch(error) { console.log(error) }
  // };

  // useEffect(() => {

  // }, [])
  return (
    <Router>
      <AuthProvider>
        <Toaster richColors visibleToasts={3} />
        <Header />
        <App>
          <Routes>
            <Route path="/" element={<pages.Homepage />} />
            <Route path="/registration" element={<pages.Registration />} />
            <Route path="/login" element={<pages.Login />} />
            <Route path="/profile" element={<pages.Profile />} />
            <Route path="/currency" element={<pages.CurrencyExchangeChart />} />
            <Route path="/appeals_chat" element={<pages.AppealsChat />} />
          </Routes>
        </App>
      </AuthProvider>
    </Router>
  );
}

export default Providers;