import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import RepositoriesPage from '../repos/RepositoriesPage';

const Layout = () => {
  return (
    <>
      {/* <Box> */}
      <HashRouter>
        <Routes>
          <Route element={<RepositoriesPage />} path="/repos/*" />
          <Route path="/" element={<Navigate replace to="repos" />} />
        </Routes>
      </HashRouter>
      {/* </Box> */}
    </>
  );
};

export default Layout;
