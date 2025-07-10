import React, { useContext } from 'react'
import Home from './Pages/Home'
import Bycredit from './Pages/Bycredit'
import Result from './Pages/Result'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar'
import Fotter from './Components/Fotter'
import Login from './Components/Login'
import { AppContext } from './Context/AppContext'


const App = () => {
  const{showLogin} = useContext(AppContext)
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 
    min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
     <ToastContainer position="top-center" />
    <Navbar/>
    {showLogin && <Login/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/buy' element={<Bycredit/>}/>
        
      </Routes>
      
      <Fotter/>
      
    </div>
  )
}

export default App