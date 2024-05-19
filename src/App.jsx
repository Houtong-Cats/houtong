import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Item from "./pages/Item";
import Webcam from "./pages/Webcam";
import Index from "./pages/Index";
import Color from "./pages/Color"
import Colors from "./pages/Colors"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Index />} />
        <Route path="/webcam" element={<Webcam />} />
        <Route path="/color" element={<Color />} />
        <Route path="/colors/:season" element={<Colors />} />
        <Route path="/items" element={<Item />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
