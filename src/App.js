// import logo from './assert/logo.png';
// import mobile from './assert/mobile.png';
import './App.css';
import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Login';
import Signup from './Components/Signup';
import Feed from './Components/Feed';
import { AuthProvider } from '../src/Context/AuthContext.js'
//import { auth } from '../firebase';
import { AuthContext } from './Context/AuthContext'
import PrivateRoutes from "./Components/Privateroutes"
import ForgetPassword from './Components/ForgetPassword';
function App() {
  // const { user } = useContext(AuthContext);
  // const [currentUser, setCurrentUser] = useState(null)
  // console.log(user);
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={ <Feed /> } />
          <Route path="/signup" element={ <Signup /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/reset" element={ <ForgetPassword /> } />
          <Route element={ <PrivateRoutes /> }>
            <Route path="/" element={ <Feed /> } exact />
          </Route>
          {/* </Route><Route path="/" element={ <PrivateRoutes> <Feed /></PrivateRoutes> } /> */ }
          <Route path="*" element={ <p>There's nothing here: 404!</p> } />
        </Routes>
      </AuthProvider>
    </BrowserRouter >


  );
}

export default App;
