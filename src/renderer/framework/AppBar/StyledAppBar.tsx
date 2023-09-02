import { AppBar, AppBarProps, styled } from '@mui/material';

interface StyledAppBarProps extends AppBarProps {}

const StyledAppBar = styled(AppBar)<StyledAppBarProps>(() => ({
  height: '40px',
  'box-shadow': 'none',
}));

export default StyledAppBar;
