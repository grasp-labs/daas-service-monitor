/**
 * This module contains App component which is responsible for rendering different routes,
 *  such as login page, Home page and logout button inside home page.
 */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Main/Login';
import Home from './components/Main/Home';
import Logout from './components/Main/Logout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
