import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './pages/User/Home';
import SelectWork from './pages/Admin/SelectWork';
import DataEnter from './pages/Admin/DataEnter';
import InstituteReg from './pages/Admin/InstituteReg';
import AdminLogin from './pages/Admin/AdminLogin';
import CitizenRequest from './pages/Admin/CitizenRequest';
import InstituteRequest from './pages/Admin/InstituteRequest';
import ProtectedRoute from './components/ProtectedRoute';
import AdminSignIn from './pages/Admin/AdminSignIn';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/SelectWork" element={<ProtectedRoute><SelectWork/></ProtectedRoute>} />
        <Route path="/admin/DataEnter" element={<ProtectedRoute><DataEnter/></ProtectedRoute>} />
        <Route path="/admin/InstituteReg" element={<InstituteReg/>} />
        <Route path="/admin" element={<AdminLogin/>} />
        <Route path='/admin/adminSignIn' element={<AdminSignIn/>} />
        <Route path="/admin/CitizenRequest" element={<ProtectedRoute><CitizenRequest/></ProtectedRoute>} />
        <Route path="/admin/InstituteRequest" element={<ProtectedRoute><InstituteRequest/></ProtectedRoute>} />


        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  )
}

export default App
