import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import {  Routes, Route } from 'react-router-dom'; // Import BrowserRouter as Router
import Adds from './Pages/Adds/Adds';
import List from './Pages/List/List';
import Orders from './Pages/Orders/Orders';
// Correct capitalization of component name
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
   
      <div>
        <ToastContainer/>
        <Navbar />
        <hr />
        <div className='app-content'> {/* Correct className */}
          <Sidebar />
          <Routes>
          <Route path='/add' element={<Adds/>}></Route>
          <Route path='/list' element={<List/>}></Route>
          <Route path='/order' element={<Orders/>}></Route>
        </Routes>
        </div>
        
      </div>
   
  );
}

export default App;
