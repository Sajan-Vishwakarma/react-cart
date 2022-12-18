import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';

import { Cart, Home, ProductsPage, SingleProduct } from './pages'

function App() {
    return (
    <>
        <Router>
            <Navigation />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/products' element={<ProductsPage />}></Route>
                <Route path='/products/:_id' element={<SingleProduct />}></Route>
                <Route path='/cart' element={<Cart />}></Route>
            </Routes>
        </Router>
    </>
    )
}

export default App;