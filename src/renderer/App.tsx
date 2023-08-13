import './App.css';

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
