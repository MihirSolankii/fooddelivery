import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import{Route,Routes} from 'react-router-dom'
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/Placeorder/PlaceOrder'
import Footer from './components/Footer/Footer';
import { useState } from 'react';
import Loginpopup from './components/Loginpopup/Loginpopup';
import Verify from './pages/verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function App() {
  const[showlogin,setshowlogin]=useState(false);
  return (
    <>
    {showlogin?<Loginpopup setshowlogin={setshowlogin}/>:<></>}
    <div className="App">
    <ToastContainer/> 
      <Navbar setshowlogin={setshowlogin}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
      </Routes>
    </div>
<Footer />
    </>
  );
}

export default App;
