import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Products from './Pages/Products'
import ProductDetails from './Pages/ProductDetails'
import Register from './Pages/Register'
import Cart from './Pages/Cart'
import Dashboard from './Pages/Dashboard'
import Categories from './Pages/Categories'
import Users from './Pages/Users'
import UserDetails from './Pages/UserDetails'
import AddProducts from './Pages/AddProducts'
import UpdateProducts from './Pages/UpdateProducts'

import Footer from './Components/Footer'
import NavBar from './Components/Navbar'
import CartDetails from './Pages/CartDetails'
import NotFound from './Pages/NotFound'
import Profile from './Pages/Profile'

export default function App() {
  const[search,setSearch]=useState("")
  
  return (

    <div>
      
      <NavBar
  search={search}
  setSearch={setSearch}
/>
      <Routes>
         <Route path='/' Component={Home}/>
        <Route path='/login' Component={Login}/>
        <Route path='/profile' Component={Profile}/>
        <Route path='/products' element={<Products search={search} setSearch={setSearch}/>}/>
        <Route path='/products/:id' Component={ProductDetails}/>
        <Route path='/register' Component={Register}/>
        <Route path='/cart' Component={Cart}/>
        <Route path='/cart/:id' Component={CartDetails}/>
        <Route path='/dashboard' Component={Dashboard}/>
        <Route path='/users' Component={Users}/>
        <Route path='/users/:id' Component={UserDetails}/>
        <Route path='add-products' Component={AddProducts}/>
        <Route path='update-products/:id' Component={UpdateProducts}/>
        <Route path='*' Component={NotFound}/>
      </Routes>
      <Footer/>
    </div>
  )
}
