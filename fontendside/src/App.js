import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Updatetool from './component/Updatetool';
import Sidebar from './component/Slidebar';
import Tooloneup from './component/TooloneUp';
import MoveUp from './component/MoveUp';
import IssueItems from './component/IssueItems';
import Updatemove from './component/Updatemoveitems';
import LoginPage from './component/Login';
import Issuetools from './component/Issuedtool';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in based on stored data
    const storedLoggedInStatus = localStorage.getItem('isLoggedIn');
    if (storedLoggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    // Update state and store in local storage
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    // Update state and remove from local storage
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
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
              <Route path="/M" element={<Issuetools />} />
            </>
          ) : (
            <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
