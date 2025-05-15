import "./App.css";
import { Routes, Route } from "react-router-dom";

import Categories from "./component/categories";
import ProductDemo from "./component/product-list.jsx/plp-demo";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path=":plp" element={<ProductDemo />} />
      </Routes>
    </div>
  );
}

export default App;
