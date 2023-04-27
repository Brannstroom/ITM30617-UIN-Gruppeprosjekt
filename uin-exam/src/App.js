import { BrowserRouter } from 'react-router-dom';
import RoutesComp from './components/Routes';
import Sidebar from './components/Sidebar';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <RoutesComp />
    </BrowserRouter>
  );
}

export default App;
