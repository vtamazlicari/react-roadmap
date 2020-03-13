import React from 'react';

import './App.scss';
import Dashboard from './pages/dashboard/dashboard';
import { ContextProvider } from "./shared/context/context";

function App() {
  return (
    <div className="app">
        <ContextProvider>
            <Dashboard/>
        </ContextProvider>
    </div>
  );
}

export default App;
