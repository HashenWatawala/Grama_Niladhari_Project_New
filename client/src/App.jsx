import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './pages/User/Home';
import SelectWork from './pages/Admin/SelectWork';
import DataEnter from './pages/Admin/DataEnter';
import InstituteReg from './pages/Admin/InstituteReg';
import AdminLogin from './pages/Admin/AdminLogin';
import CitizenRequest from './pages/Admin/CitizenRequest';
import InstituteRequest from './pages/Admin/InstituteRequest';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/SelectWork" element={<SelectWork/>} />
        <Route path="/admin/DataEnter" element={<DataEnter/>} />
        <Route path="/admin/InstituteReg" element={<InstituteReg/>} />
        <Route path="/admin" element={<AdminLogin/>} />
        <Route path="/admin/CitizenRequest" element={<CitizenRequest/>} />
        <Route path="/admin/InstituteRequest" element={<InstituteRequest/>} />


        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  )
}

export default App
