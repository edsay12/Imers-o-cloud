import { useState } from "react";



import { Route, Router, Routes } from "react-router-dom";
import { DeskBoard } from "./pages/deskboard/deskboard";
import { Home } from "./pages/home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/desk" element={<DeskBoard/>} />
    </Routes>
  );
}

export default App;
