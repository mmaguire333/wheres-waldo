import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Level from './Components/Level';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/level-one" element={<Level level={1}/>} />
          <Route path="/level-two" element={<Level level={2}/>} />
          <Route path="/level-three" element={<Level level={3}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
