import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';

import { Home, About } from './pages'

function App() {
    return (
    <>
        <Router>
            <Navigation />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/about' element={<About />}></Route>
            </Routes>
        </Router>
    </>
    )
}

export default App;