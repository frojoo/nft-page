import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./pages/detail";
import Header from "./components/header";
import Main from "./pages/main";
import { useState } from "react";

function App() {
  const [account, setAccount] = useState("");

  return (
    <BrowserRouter>
      <div className="bg-gray-950 text-white min-h-screen">
        <Header account={account} setAccount={setAccount} />
        <Routes>
          <Route path="/" element={<Main account={account} />} />
          <Route path="/:tokenId" element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
