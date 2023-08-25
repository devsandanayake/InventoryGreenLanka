import React from 'react'
import Updatetool from './component/Updatetool'
import Sidebar from './component/Slidebar'     // import Home component
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Tooloneup from './component/TooloneUp'
import MoveUp from './component/MoveUp'
import IssueItems from './component/IssueItems'
import Updatemove from './component/Updatemoveitems'
import LoginPage from './component/Login'
import { useState } from 'react'
export default function App () {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <div>
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Sidebar onLogout={handleLogout} />} />
            <Route path="/Updatetool" element={<Updatetool />} />
            <Route path="/Updatemoveitems" element={<Updatemove />} />
            <Route path="/TooloneUp/:id" element={<Tooloneup />} />
            <Route path="/IssueItems" element={<IssueItems />} />
            <Route path="/MoveUp/:id" element={<MoveUp />} />
          </>
        ) : (
          <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        )}
      </Routes>
    </BrowserRouter>
  </div>
  )
}
