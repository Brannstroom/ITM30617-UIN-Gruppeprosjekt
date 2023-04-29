import { BrowserRouter } from 'react-router-dom';
import RoutesComp from './components/Navigation/Routes';
import Sidebar from './components/Navigation/Sidebar';

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
