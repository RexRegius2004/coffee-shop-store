import React, { useEffect, useState } from 'react';

const CartPage = ({ removeFromCart }) => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cart');
        if (!response.ok) throw new Error('Failed to fetch cart data');
        const data = await response.json();
        setCart(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCart();
  }, []);

  if (!Array.isArray(cart)) return <div>Error: Cart data is not valid.</div>;

  const totalPrice = cart.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {error && <p>Error: {error}</p>}
      {cart.length === 0 ? <p>Cart is empty.</p> : (
        <ul>
          {cart.map(item => (
            <li key={item.productId._id}>
              {item.productId.name} - {item.quantity} x ${item.productId.price}
              <button onClick={() => removeFromCart(item.productId._id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
};

export default CartPage;
