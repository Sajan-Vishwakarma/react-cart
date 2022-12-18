import { BrowserRouter as Router, Routes, Route, json } from 'react-router-dom';
import Navigation from './components/Navigation';

import { Cart, Home, ProductsPage, SingleProduct } from './pages'
import { CartContext } from './CartContext'
import { useEffect, useState } from 'react';

function App() {
    
    // const cartList = localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")): {};
    const [cart, setCart ] = useState({});

    useEffect(() => {
        const cart = window.localStorage.getItem('cart');
        setCart(JSON.parse(cart));
    },[]);

    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart) );
    },[cart])

    return (
    <>
        <Router>
            <CartContext.Provider value={{ cart, setCart }} >
                <Navigation />
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/products' element={<ProductsPage />}></Route>
                    <Route path='/products/:_id' element={<SingleProduct />}></Route>
                    <Route path='/cart' element={<Cart />}></Route>
                </Routes>
            </CartContext.Provider>
        </Router>
    </>
    )
}

export default App;