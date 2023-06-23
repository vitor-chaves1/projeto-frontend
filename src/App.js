import React from 'react'
import NavBar from './NavBar'
import Home from './Home'
import Loja from './Loja'
import Produto from './Produto'
import { Route, Routes } from "react-router"
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' exact Component={Home} />
          <Route path='/loja' exact Component={Loja} />
          <Route path='/produto/:id' exact Component={Produto} />
        </Routes>     
      </BrowserRouter>
    </>
  )
}

export default App;