import { BrowserRouter, Route, Routes } from "react-router-dom";

// components.
import Registration from "./auths/Registration/Registration";
import Homepage from "./Homepage/Homepage";
import Header from "./Header/Header";
import Login from "./auths/Login/Login";
import Appeals from "./Appeals/Appeals";
import Profile from "./Profile/Profile";


function App() {
  return (
    <div className="app">
      <BrowserRouter >
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/appeals" element={<Appeals />} />
          <Route path="/profile" element={<Profile />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
