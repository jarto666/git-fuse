import { Box } from '@mui/material';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import RepositoriesPage from '../repos/RepositoriesPage';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
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
