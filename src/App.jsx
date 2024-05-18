import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Item from './pages/Item';

function App() {
    return (
        <html>
            <BrowserRouter>
            <Routes>
                <Route index element={<Home />}/>
                <Route path="/items/:itemId" element={<Item />} />
                <Route path="*" element={<Home />}/>
            </Routes>
            </BrowserRouter>
        </html>
    )
}

export default App
