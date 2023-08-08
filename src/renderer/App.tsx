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
import CustomTheme from './theme/theme';
import { Provider } from 'react-redux';
import AppReduxStore from './store/AppReduxStore';
import { DndContext } from '@dnd-kit/core';

export default function App() {
  return (
    <>
      <CustomTheme>
        <Provider store={AppReduxStore}>
          <DndContext>
            <Layout></Layout>
          </DndContext>
        </Provider>
      </CustomTheme>
    </>
  );
}
