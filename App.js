import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import reportWebVitals from './reportWebVitals';
function App() {
  return (
    <Router>
      <div>
        <h1>Product Management App</h1>
        <nav>
          <Link to="/">Product List</Link> | <Link to="/add">Add Product</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;


reportWebVitals();
