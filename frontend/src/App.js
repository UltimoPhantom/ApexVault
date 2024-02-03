// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ShowStocks from './pages/ShowStocks';
import CreateStocks from './pages/CreateStocks';
import EditStocks from './pages/EditStock';
import DeleteStocks from './pages/DeleteStocks';
import Login from './pages/Login';
import { useAuthContext } from './hooks/useAuthContext';
import { StyledEngineProvider } from '@mui/material/styles'; // Import StyledEngineProvider from Material-UI

function App() {
  const { user } = useAuthContext() 

  return (
    <StyledEngineProvider injectFirst> 
      <Router>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path="/stocks/create" element={<CreateStocks />} />
          <Route path="/stocks/details/:id" element={<ShowStocks />} />
          <Route path="/stocks/edit/:id" element={<EditStocks />} />
          <Route path="/stocks/delete/:id" element={<DeleteStocks />} />
        </Routes>
      </Router>
    </StyledEngineProvider> 
  );
}

export default App;
