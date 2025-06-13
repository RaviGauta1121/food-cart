import React, { useState } from 'react';
import { FaTrashAlt, FaCreditCard, FaTag } from 'react-icons/fa';
import './App.css';

const App = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Grilled Salmon',
      price: 96.0,
      quantity: 2,
      image: 'https://www.foodiecrush.com/wp-content/uploads/2019/05/Grilled-Salmon-foodiecrush.com-023.jpg', 
    },
    {
      id: 2,
      name: 'Meat vegetable',
      price: 65.08,
      quantity: 2,
      image: 'https://img.freepik.com/premium-psd/pile-raw-meat-vegetables-transparent-background_838900-94701.jpg', 
    },
  ]);

  const updateQuantity = (id, delta) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
          : item
      )
    );
  };

  const removeItem = id => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container">
      <h2 className="title">Your Food Cart</h2>

      {cart.map(item => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.name} className="item-image" />
          <div className="item-details">
            <h3>{item.name}</h3>
            <p>${item.price.toFixed(2)}</p>
            <div className="quantity-controls">
              <button onClick={() => updateQuantity(item.id, -1)}>-</button>
              <span>Add To {item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, 1)}>+</button>
            </div>
          </div>
          <button className="delete-button" onClick={() => removeItem(item.id)}>
            <FaTrashAlt />
          </button>
        </div>
      ))}

      <div className="promo-code">
        <FaTag />
        <input type="text" placeholder="Add Your Promo Code" />
      </div>

      <div className="summary">
        {cart.map(item => (
          <div key={item.id}>
            <span>{item.name}</span>
            <span>${(item.price * item.quantity).toFixed(0)}</span>
          </div>
        ))}
        <hr />
        <div className="total">
          <strong>Total</strong>
          <strong>${total.toFixed(0)}</strong>
        </div>
      </div>

      <div className="payment-method">
        <FaCreditCard />
        <span>Credit/Debit Card</span>
      </div>
    </div>
  );
};

export default App;
