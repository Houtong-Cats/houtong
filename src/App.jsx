import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
    return (
        <html>
            <BrowserRouter>
            <Routes>
                <Route index element={<Home />}/>
                {/* <Route path="/playground" element={<Playground />}/>
                <Route path="/:profileName" element={<Profile />} />
                <Route path="/@:profileName" element={<Profile />} />
                <Route path="/temp" element={<Temp />}/> */}
                <Route path="*" element={<Home />}/>
            </Routes>
            </BrowserRouter>
        </html>
    )
}

export default App
