import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import CoinDetails from "./pages/CoinDetails";
import Bookmarks from "./pages/Bookmarks";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
    </Layout>
  );
}

export default App;
