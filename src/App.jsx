/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'


import Home from './components/pages/home/Home';
import Login from './components/pages/Login';
import ProtectedRoute from './components/utils/ProtectedRoute';
'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './components/pages/Signup';
import SearchBooks from './components/pages/searchbooks/SearchBooks';
import OurBooks from './components/pages/ourbooks/OurBooks';
import AllBooks from './components/pages/allbooks/AllBooks';
import Sidebar from './components/pages/sidebar/Sidebar';
import Addbook from './components/pages/addbook/Addbook';
import { getLocalStorage } from './storage/LocalStorage';


function App() {

  const isAuthenticated = useSelector((state) => state.books.isAuthenticated)
  const {token} = getLocalStorage("token")



  return (
    <>

      <BrowserRouter>
        {(isAuthenticated || token) && <Sidebar />}
        <ToastContainer
          position="top-right"
          autoClose={3000}


        />

        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/allbooks" element={



            <ProtectedRoute>
              <AllBooks />
            </ProtectedRoute>

          } />
          <Route path="/userbooks" element={
            <ProtectedRoute>
              <OurBooks />
            </ProtectedRoute>
          } />
          <Route path="/search" element={
            <ProtectedRoute>
              <SearchBooks />
            </ProtectedRoute>
          } />
          <Route path="/addbook" element={
            <ProtectedRoute>
              <Addbook />
            </ProtectedRoute>
          } />


        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
