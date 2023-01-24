import { useState } from "react";

import { Route, Router, Routes } from "react-router-dom";
import { DeskBoard } from "./pages/deskboard/deskboard";

import { Armazenamento } from "./pages/armazenamento/Armazenamento";
import { PageContainer } from "./components/pageContainer/PageContainer";
import { PageTitle } from "./components/pageTitle/pageTitle";
import { Home } from "./pages/home/home";
import Login from "./pages/login/login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<DeskBoard children={<Home/> }/>} />
      <Route path="cadastro" element={<DeskBoard children={<Armazenamento/>}/>} />
      <Route path="/armazenamento" element={<DeskBoard children={<PageContainer><PageTitle title="Armazenamento"></PageTitle></PageContainer>}/>} />
      <Route path="/itens" element={<DeskBoard children={<h1>Itens</h1>}/>} />
      <Route path="/sair" element={<DeskBoard children={<h1>sair</h1>}/>} />
      <Route path="/configuraçoes" element={<DeskBoard children={<h1>configuraçoes</h1>}/>} />
      <Route path="/help" element={<DeskBoard children={<h1>help</h1>}/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
  );
}

export default App;
