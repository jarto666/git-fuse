import { MemoryRouter as Router, Routes, Route, HashRouter, Link } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { useState } from 'react';
import { StatusResult } from 'simple-git';

const Stand = () => {
  return (
    <>
      Stand
    </>
  )
}

const Sit = () => {
  return (
    <>
      Sit
    </>
  )
}

const Home = () => {  

  const [x, setx] = useState<string[]>();

  window.electron.ipcRenderer.sendMessage('ping', ['sheeeet']);

  window.electron.ipcRenderer.once('ping', (a) => {
    const str = a as string[];
    setx(str);
  });

  return (
    <>{x}</>
  );
}

export default function App() {
  return (
    <HashRouter>
      <div className="App">
        <div className="menu">
          <Link to="/"><h2>Home</h2></Link>
          <Link to="/one"><h2>Stand</h2></Link>
          <Link to="/two"><h2>Sit</h2></Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/one" element={<Stand />} />
          <Route path="/two" element={<Sit />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
