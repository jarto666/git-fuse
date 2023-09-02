import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './reducer/rootReducer';
import rootEpic from './epic/rootEpic';

const epicMiddleware = createEpicMiddleware();
const AppReduxStore = configureStore({
  reducer: rootReducer(),
  middleware: [epicMiddleware],
});
epicMiddleware.run(rootEpic);

export default AppReduxStore;
