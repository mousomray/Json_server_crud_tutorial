import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'; // Toast Message
import 'react-toastify/dist/ReactToastify.css';
import Nav from './Components/Nav'
import Adduser from './Components/Adduser'
import Showuser from './Components/Showuser'
import Edituser from './Components/Edituser'

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <Router>
        <Nav />
        <Routes>
          <Route path='/' element={<Adduser />} />
          <Route path='/showuser' element={<Showuser />} />
          <Route path='/edituser/:id' element={<Edituser />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
