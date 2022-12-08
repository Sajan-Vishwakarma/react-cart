import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';

import { Cart, Home, Products } from './pages'

function App() {
    return (
    <>
        <Router>
            <Navigation />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/products' element={<Products />}></Route>
                <Route path='/cart' element={<Cart />}></Route>
            </Routes>
        </Router>
    </>
    )
}

export default App;