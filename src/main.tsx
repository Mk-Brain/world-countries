import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/HomePage'
import ErrorPage from './pages/ErrorPage'



const root = document.getElementById('root') 

ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<Home/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
)