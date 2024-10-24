import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = async (product) => {
    const response = await fetch('http://localhost:5000/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: product._id })
    });
    const updatedCart = await response.json();
    setCart(updatedCart);
  };

  const removeFromCart = async (productId) => {
    const response = await fetch('http://localhost:5000/api/cart/remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId })
    });
    const updatedCart = await response.json();
    setCart(updatedCart);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} />} />
      </Routes>
    </Router>
  );
};

export default App;
