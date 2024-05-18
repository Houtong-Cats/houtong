import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Item from './pages/Item';
import Index from './pages/Index'; 
import Color from './pages/Color';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Index />}/>
                <Route path="/Color" element = {<Color />}/>
                <Route path="/items/:itemId" element={<Item />} />
                <Route path="*" element={<Home />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
