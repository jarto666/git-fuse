import {
  MemoryRouter as Router,
  Routes,
  Route,
  HashRouter,
  Link,
} from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import { IpcService } from './IPC/IpcService';
import {
  PingChannelRequest,
  PingChannelResponse,
} from 'main/IPC/handlers/pingChannelHandler';

const Stand = () => {
  return <>Stand</>;
};

const Sit = () => {
  return <>Sit</>;
};

const Home = () => {
  const [x, setx] = useState<string>();

  return (
    <>
      <div>
        <button
          onClick={async () => {
            const ipc = new IpcService();
            const res = await ipc.send<PingChannelRequest, PingChannelResponse>(
              'ping',
              { message: 'ping' }
            );
            console.log(res);
            setx(res.answer);
          }}
        >
          CLICK
        </button>
      </div>
      <div>{x}</div>
    </>
  );
};

export default function App() {
  return (
    <HashRouter>
      <div className="App">
        <div className="menu">
          <Link to="/">
            <h2>Home</h2>
          </Link>
          <Link to="/one">
            <h2>Stand</h2>
          </Link>
          <Link to="/two">
            <h2>Sit</h2>
          </Link>
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
