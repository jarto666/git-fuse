import { Routes, Route, HashRouter, Link } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import { IpcService } from './IPC/IpcService';
import {
  PingChannelRequest,
  PingChannelResponse,
} from 'main/IPC/handlers/pingChannelHandler';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Layout from './pages/common/Layout';
import { createTheme } from '@mui/material';
import CustomTheme from './theme/theme';
import { Provider } from 'react-redux';
import AppReduxStore from './store/AppReduxStore';

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
    <>
      <CustomTheme>
        <Provider store={AppReduxStore}>
          <Layout>
            <div>Main content</div>
          </Layout>
        </Provider>
      </CustomTheme>
    </>
  );
}
