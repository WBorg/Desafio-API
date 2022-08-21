import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RecoveryPassword from '../pages/RecoveryPassword'
import UpdatePassword from '../pages/UpdatePassword'

function Root () {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/recoverypassword"/>} />
        <Route path="/recoverypassword" element={<RecoveryPassword/>} />
        <Route path="/updatepassword" element={<UpdatePassword/>} />
      </Routes>
    </BrowserRouter>
   );
}

export default Root ;
