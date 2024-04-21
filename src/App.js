import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './Components/Nav'
import Adduser from './Components/Adduser'
import Showuser from './Components/Showuser'
import Edituser from './Components/Edituser'

const App = () => {
  return (
    <>
      <Router>
        <Nav/>
        <Routes>
            <Route path='/' element={<Adduser/>}/>
            <Route path='/showuser' element={<Showuser/>}/>
            <Route path='/edituser/:id' element={<Edituser/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
