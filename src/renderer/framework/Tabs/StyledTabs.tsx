import { Tabs, TabsProps, styled } from '@mui/material';

interface StyledTabsProps extends TabsProps {}

const StyledTabs = styled((props: StyledTabsProps) => <Tabs {...props} />)(
  (props) => ({
    backgroundColor: `${props.theme.palette.background.paper}`,
    'padding-top': '2px',
    height: '40px',
    minHeight: 'initial',
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
