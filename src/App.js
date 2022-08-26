import NavbarComponent from './components/navbar';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Product from './pages/product';
import Logout from './pages/logout';
import { useEffect } from 'react';
import { listen } from './api/listener';
import Cart from './pages/cart';
import { useDispatch, useSelector } from 'react-redux';
import Regsiter from './pages/register';
import Account from './pages/account';
import Checkout from './pages/checkout';
import Invoices from './pages/invoice';
function App() {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;
  const dispatch = useDispatch()
  useEffect(() => {
    if (userInfo) {
      listen();
    }
  }, [dispatch, userInfo])
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComponent />
        <div className="container-fluid  mt-2">
          <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/skip/:skip" element={<Product />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout/*" element={<Checkout />} />
            <Route path="/invoices/:id" element={<Invoices />} />
            <Route path='/account/*' element={<Account />} />
            <Route path="/singup" element={<Regsiter />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
