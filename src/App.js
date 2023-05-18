import { BrowserRouter } from 'react-router-dom';
import RoutesComp from './components/Navigation/Routes';
import Sidebar from './components/Navigation/Sidebar';
import { useState } from 'react';

import './App.css';

function App() {

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  }

  return (
    <BrowserRouter>
      <Sidebar onToggle={handleSidebarToggle} sidebarCollapsed={sidebarCollapsed}/>
      <main className={`main flex-1 transition-all h-screen w-screen duration-300 ${sidebarCollapsed ? 'pl-20' : 'pl-72'}`}>
        <RoutesComp />
      </main>
    </BrowserRouter>
  );
}

export default App;
