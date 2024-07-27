import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Transactions from './components/Transactions';
import AddTransaction from './components/AddTransaction';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Transactions/>} />
          <Route path="/add" element={<AddTransaction/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
