import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Products from './Pages/Products'
import ProductDetails from './Pages/ProductDetails'
import Register from './Pages/Register'
import Cart from './Pages/Cart'
import Dashboard from './Pages/Dashboard'
import Users from './Pages/Users'
import UserDetails from './Pages/UserDetails'
import AddProducts from './Pages/AddProducts'
import UpdateProducts from './Pages/UpdateProducts'
import { Navigate } from 'react-router-dom'
import Footer from './Components/Footer'
import NavBar from './Components/NavBar'
import CartDetails from './Pages/CartDetails'
import NotFound from './Pages/NotFound'
import Profile from './Pages/Profile'
import Checkout from './Pages/Checkout'
import Payment from './Pages/Payment'
import Trackorder from './Pages/Trackorder'
import ProtectedRoute from './Components/ProtectedRoute'


export default function App() {
  const[search,setSearch]=useState("")
  
  return (

      <div className="d-flex flex-column min-vh-100">

      <NavBar
        search={search}
        setSearch={setSearch}
      />

      <main className="flex-grow-1">
   
      
<Routes>

 

  <Route path='/login' Component={Login}/>
  <Route path='/register' Component={Register}/>

 

  <Route element={<ProtectedRoute />}>

    <Route path='/' Component={Home}/>
  
  
     
  
    <Route path='/profile' Component={Profile}/>

    <Route
      path='/products'
      element={<Products search={search} setSearch={setSearch}/>}
    />

    <Route path='/products/:id' Component={ProductDetails}/>

    <Route path='/cart' Component={Cart}/>
    <Route path='/cart/:id' Component={CartDetails}/>

    <Route path='/checkout' Component={Checkout}/>
    <Route path='/payment' Component={Payment}/>
    <Route path='/track-order' Component={Trackorder}/>

    <Route path='/dashboard' Component={Dashboard}/>
    <Route path='/users' Component={Users}/>
    <Route path='/users/:id' Component={UserDetails}/>

    <Route path='/add-products' Component={AddProducts}/>
    <Route path='/update-products/:id' Component={UpdateProducts}/>

  </Route>

  <Route path='*' Component={NotFound}/>

</Routes>

      </main>
      <Footer/>
    </div>
  )
}
