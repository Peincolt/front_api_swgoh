import logo from './logo.svg';
import './App.css';
import Menu from './components/menu/Menu.js';
import Filter from './components/filter/Filter.js';
import { useState } from 'react';

function App() {
  return (
    <div className="App">
        <Menu/>
        <Filter/>
    </div>
  );
}

export default App;
