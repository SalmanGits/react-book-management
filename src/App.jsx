/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import { useEffect, useState } from 'react'

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
import Layout from './components/layout/Layout';

function App() {
  // const { token } = getLocalStorage("token")
  // console.log("app", token)
  // const [value, setValue] = useState()
  // const dispatch = useDispatch()
  // const { bookData, book } = useSelector((state) => state.books)
  // console.log(bookData)
  // console.log(book)
  // const handleChange = () => {
  //   dispatch(setBookData(value))
  // }


  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = getLocalStorage('token');
      if (storedToken) {
        setToken(storedToken.token);
      }
    };

    fetchData();
  }, [token]);
  console.log(token, "app")

  return (
    <>

      <BrowserRouter>
        {token && <Sidebar />}
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
