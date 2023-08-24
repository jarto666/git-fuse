import { Tabs, TabsProps, styled } from '@mui/material';

interface StyledTabsProps extends TabsProps {}

const StyledTabs = styled((props: StyledTabsProps) => <Tabs {...props} />)(
  (props) => ({
    width: '100%',
    height: '40px',
    minHeight: 'initial',
    borderBottom: '1px solid #111',
    '> .MuiTabs-root': {
      height: '40px',
    },
    '> .MuiTabs-scroller': {
      height: '40px',
    },
    '.MuiTabs-indicator': {
      display: 'none',
    },
  })
);

export default StyledTabs;
