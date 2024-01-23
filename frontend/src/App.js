// App.js or another component file
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ShowStocks from './pages/ShowStocks';
import CreateStocks from './pages/CreateStocks';
import EditStocks from './pages/EditStock';
import DeleteStocks from './pages/DeleteStocks';
import SelectWithSearch from './components/SelectWithSearch';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stocks/create" element={<CreateStocks />} />
        <Route path="/stocks/details/:id" element={<ShowStocks />} />
        <Route path="/stocks/edit/:id" element={<EditStocks />} />
        <Route path="/stocks/delete/:id" element={<DeleteStocks />} />
        <Route path="/stocks/compTest" element={<SelectWithSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
