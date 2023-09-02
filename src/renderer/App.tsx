import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Provider } from 'react-redux';
import { DndContext } from '@dnd-kit/core';
import Layout from './pages/common/Layout';
import CustomTheme from './theme/theme';
import AppReduxStore from './store/AppReduxStore';

export default function App() {
  return (
    <>
      <CustomTheme>
        <Provider store={AppReduxStore}>
          <DndContext>
            <Layout />
          </DndContext>
        </Provider>
      </CustomTheme>
    </>
  );
}
