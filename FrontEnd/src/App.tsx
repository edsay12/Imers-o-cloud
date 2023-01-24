import { useState } from "react";

import { Route, Router, Routes } from "react-router-dom";
import { DeskBoard } from "./pages/deskboard/Deskboard";

import { Armazenamento } from "./pages/Armazenamento";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/armazenamento" element={<DeskBoard children={<Armazenamento/>}/>} />
      <Route path="/" element={<DeskBoard children={<h1>home</h1>}/>} />
      <Route path="/itens" element={<DeskBoard children={<h1>Itens</h1>}/>} />
      <Route path="/cadastro" element={<DeskBoard children={<h1>cadastro</h1>}/>} />
      <Route path="/sair" element={<DeskBoard children={<h1>sair</h1>}/>} />
      <Route path="/configuraçoes" element={<DeskBoard children={<h1>configuraçoes</h1>}/>} />
      <Route path="/help" element={<DeskBoard children={<h1>help</h1>}/>} />
    </Routes>
  );
}

export default App;
