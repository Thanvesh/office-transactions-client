import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddTransaction.css';

const AddTransaction = () => {
  const [type, setType] = useState('Credit');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [step, setStep] = useState(0);
  const [isFolding, setIsFolding] = useState(false);
  const history = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    if (type && amount && description) {
      const newTransaction = { type, amount: parseFloat(amount), description, date: new Date() };

      axios.post('https://office-transaction-server.onrender.com/transactions', newTransaction)
        .then(response => {
          history('/');
        })
        .catch(error => console.error(error));
    }
  };

  const onCancel = () => {
    setIsFolding(true);
    setTimeout(() => {
      history('/');
    }, 1000); // Match the animation duration
  };

  useEffect(() => {
    const timers = [];
    for (let i = 1; i <= 4; i++) {
      timers.push(setTimeout(() => setStep(i), i * 500)); // Adjust timing as needed
    }
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <div className={`container ${isFolding ? 'folding' : ''}`}>
      <div className="add-transaction-container">
        <div className={`header ${step >= 1 ? 'tearing' : 'hidden'}`}>
          <h2 className="page-title">Add New Transaction</h2>
          <button className="close-button" onClick={onCancel}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form onSubmit={onSubmit} className="transaction-form">
          <div className={`form-group ${step >= 2 ? 'tearing' : 'hidden'}`}>
            <label htmlFor="type">Transaction Type:</label>
            <select id="type" value={type} onChange={(e) => setType(e.target.value)} required>
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
            </select>
          </div>
          <div className={`form-group ${step >= 3 ? 'tearing' : 'hidden'}`}>
            <label htmlFor="amount">Amount:</label>
            <input 
              id="amount" 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              required 
            />
          </div>
          <div className={`form-group ${step >= 4 ? 'tearing' : 'hidden'}`}>
            <label htmlFor="description">Description:</label>
            <input 
              id="description" 
              type="text" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="save-button"><i className="fas fa-save"></i> Save</button>
            <button type="button" className="cancel-button" onClick={onCancel}><i className="fas fa-times"></i> Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
