import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/HomePage'
import ErrorPage from './pages/ErrorPage'
import Logo from './components/Logo'


const root = document.getElementById('root') 

ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <Router>
      <Logo/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<Home/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
)