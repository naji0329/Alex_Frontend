import React from 'react';
import './App.css';
import "react-toastify/dist/ReactToastify.css";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import Products from './screens/products/Products';

function App() {
  return (
    <div className="App">
      <Products />
    </div>
  );
}

export default App;
