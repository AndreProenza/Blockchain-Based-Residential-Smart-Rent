import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Initial } from "./pages/Initial";
import { Search } from "./pages/Search";
import { Login } from "./pages/Login";
import { Listings } from "./pages/Listings";
import { Advertise } from "./pages/Advertise";
import { Profile } from "./pages/Profile";
import { Contracts } from "./pages/Contracts";
import { Properties } from "./pages/Properties";
import { Error } from "./pages/Error";
import ProtectedRoutes from "./auth/ProtectedRoutes";

import './App.css';

function App() {

  return (
    <div className="App">
      <Router>

        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path='/search' element={<Search />} />
            <Route path='/listings' element={<Listings />} />
            <Route path='/advertise' element={<Advertise />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/contracts' element={<Contracts />} />
            <Route path='/properties' element={<Properties />} />
          </Route>

          <Route path='/' element={<Initial />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Error />} />
        </Routes>

        <header className="App-header">

        </header>


      </Router>
    </div>
  );
}

export default App;
