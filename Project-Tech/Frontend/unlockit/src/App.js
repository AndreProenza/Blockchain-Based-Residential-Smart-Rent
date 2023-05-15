import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Initial } from "./pages/Initial";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Listings } from "./pages/Listings";
import { Advertise } from "./pages/Advertise";
import { Profile } from "./pages/Profile";
import { Contracts } from "./pages/Contracts";
import { Error } from "./pages/Error";

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
        <Route path='/' element={<Initial/>} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/listings' element={<Listings />} />
          <Route path='/advertise' element={<Advertise />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/contracts' element={<Contracts />} />
          <Route path='*' element={<Error />} />
        </Routes>

        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
        </header>


      </Router>
    </div>
  );
}

export default App;
