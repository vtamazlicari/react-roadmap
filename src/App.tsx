import React from 'react';

import './App.scss';
import { Dashboard } from './components';
import { ContextProvider } from "./common/context/context";

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
