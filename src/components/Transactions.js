import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Transactions.css';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios.get('http://localhost:5000/transactions')
      .then(response => {
        setTransactions(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <p>Loading transactions...</p>;

  const calculateBalances = (transactions) => {
    let runningBalance = 0;

    // Sort transactions by date in ascending order for balance calculation
    const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

    const transactionsWithBalances = sortedTransactions.map(transaction => {
      if (transaction.type === 'Credit') {
        runningBalance += transaction.amount;
      } else if (transaction.type === 'Debit') {
        runningBalance -= transaction.amount;
      }
      return {
        ...transaction,
        runningBalance
      };
    });

    // Sort transactions by date in descending order for display
    return transactionsWithBalances.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const transactionsWithBalances = calculateBalances(transactions);

  return (
    <div className="Transactioncontainer">
      <div className="header">
        <h2>Office Transactions</h2>
        <Link  to="/add">+ Add Transaction</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Credit</th>
            <th>Debit</th>
            <th>Running Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactionsWithBalances.map(transaction => (
            <tr key={transaction._id}>
              <td data-label="Date">{new Date(transaction.date).toLocaleDateString()}</td>
              <td data-label="Description">{transaction.description}</td>
              <td data-label="Credit">{transaction.type === 'Credit' ? transaction.amount : ''}</td>
              <td data-label="Debit">{transaction.type === 'Debit' ? transaction.amount : ''}</td>
              <td data-label="Running Balance">{transaction.runningBalance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
