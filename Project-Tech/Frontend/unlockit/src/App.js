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
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'
import { polygon } from 'wagmi/chains'
import { mainnet } from 'wagmi/chains'


import './App.css';

/* ---- Wallet Connect ---- */

const projectId = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID;

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ wagmiConfig, projectId, chains, 
  themeMode: 'light',
  featuredWalletIds: [
    'e9ff15be73584489ca4a66f64d32c4537711797e30b6660dbcb71ea72a42b1f4',
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
  ],
  includeWalletIds: [
    '8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4',
    'f2436c67184f158d1beda5df53298ee84abfc367581e4505134b5bcf5f46697d',
    '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
    '225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f'
  ] 
})

/* ------------------------ */


function App() {

  return (
    <div className="App">
      <WagmiConfig config={wagmiConfig}>
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
      </WagmiConfig>
    </div>
  );
}

export default App;
