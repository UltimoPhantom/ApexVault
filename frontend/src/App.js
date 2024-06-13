import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ShowStocks from './pages/ShowStocks';
import CreateStocks from './pages/CreateStocks';
import EditStocks from './pages/EditStock';
// import DeleteStocks from './pages/DeleteStocks';
import Login from './pages/Login';
// // import { useAuthContext } from '../src/hooks/useAuthContext';

// function App() {
//   // const { user } = useAuthContext()
//   // // console.log(user)
//   // console.log("$$$$$$$$$$$$$$")
//   // console.log("^&^&^&^& ",user)
//   // console.log("$$$$$$$$$$$$$$")

//   return (
//     // <Router>
//     //   <Routes>
//     //     <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
//     //     <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
//     //     <Route path="/stocks/create" element={<CreateStocks />} />
//     //     <Route path="/stocks/details/:id" element={<ShowStocks />} />
//     //     <Route path="/stocks/edit/:id" element={<EditStocks />} />
//     //     <Route path="/stocks/delete/:id" element={<DeleteStocks />} />
//     //   </Routes>
//     // </Router>
//     <Router>
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/stocks/create" element={<CreateStocks />} />
//       <Route path="/stocks/details/:id" element={<ShowStocks />} />
//       <Route path="/stocks/edit/:id" element={<EditStocks />} />
//       <Route path="/stocks/delete/:id" element={<DeleteStocks />} />
//     </Routes>
//   </Router>
// );
  

// =======
import { useAuthContext } from './hooks/useAuthContext';
import { StyledEngineProvider } from '@mui/material/styles';

function App() {
  const { user } = useAuthContext();

  return (
    <StyledEngineProvider injectFirst>
      <div style={{ width: '100vw', height: '100vh', backgroundColor: '#f0f0f0' }}>

        <Router>
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/stocks/create" element={<CreateStocks />} />
            <Route path="/stocks/details/:id" element={<ShowStocks />} />
            <Route path="/stocks/edit/:id" element={<EditStocks />} />
          </Routes>
        </Router>
      </div>
    </StyledEngineProvider>
  );
}

export default App;
