import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Product from './pages/product/Product';
import Register from './pages/auth/Register';
import ListJual from './pages/list-jual/ListJual';
import PenawarPage from './pages/seller/InfoPenawar';
import InfoProfile from './component/form/InfoProfile';
import EditProduct from './pages/product/EditProduct';
import PrevProduct from './pages/product/Preview';
import InfoProductTsting from './component/form/testingProduct';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/seller-product/:id' element={<Product checkStatus={true} />} />
        <Route path='/product/preview' element={<PrevProduct checkStatus={true} />} />
        <Route path='/buyer-product/:id' element={<Product checkStatus={false} />} />
        <Route path='/list-jual' element={<ListJual />} />
        <Route path='/info-profile' element={<InfoProfile />} />
        <Route path='/info-product' element={<InfoProductTsting />} />
        <Route path='/edit-product/:id' element={<EditProduct />} />
        <Route path='/info-penawar' element={<PenawarPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;