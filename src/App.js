import React, {useState} from 'react'
import NavBar from './NavBar'
import Home from './Home'
import Loja from './Loja'
import Produto from './Produto'
import Carrinho from './Carrinho'
import { Route, Routes } from "react-router"
import { BrowserRouter } from 'react-router-dom'

const App = () => {

  function adicionar(product) {
    setCartItems([...cartItems, product]);
    console.log(product)
  }
  const [cartItems, setCartItems] = useState([]);
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' exact Component={Home} />
          <Route path='/loja' exact Component={Loja} />
          <Route path='/produto/:id' exact Component={() => <Produto adicionar={adicionar}/>}  />
          <Route path='/carrinho' exact Component={() => <Carrinho cartItems={cartItems}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;