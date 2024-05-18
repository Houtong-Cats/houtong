import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Item from "./pages/Item";
import Webcam from "./pages/Webcam";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/webcam" element={<Webcam />} />
        <Route path="/items/:itemId" element={<Item />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
