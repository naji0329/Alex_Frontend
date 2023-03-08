import React from 'react';
import "react-toastify/dist/ReactToastify.css";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import 'ag-grid-enterprise';

import './App.css';

import Products from './screens/products/Products';

function App() {
  return (
    <div className="App">
      <Products />
    </div>
  );
}

export default App;
