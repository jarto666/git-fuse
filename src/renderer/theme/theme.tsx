import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {
    actionArea: {
      background: string;
      disabled: string;
      greyedOut: string;
    };
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    actionArea?: {
      background: string;
      disabled: string;
      greyedOut: string;
    };
  }
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#acb9b7',
    },
    secondary: {
      main: '#e86be3',
    },
    background: {
      default: '#040604',
      paper: '#010703',
    },
    text: {
      primary: '#a9a3a6',
    },
  },
  // components: {
  //   MuiTabs: {
  //     styleOverrides: {
  //       indicator: {
  //         height: 0,
  //       },
  //     },
  //   },
  // },
  actionArea: {
    background: '#0e120e',
    disabled: '#232923',
    greyedOut: '#4f574f',
  },
});

interface CustomThemeProps {
  children: React.ReactNode;
}

const CustomTheme = (props: CustomThemeProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};

export default CustomTheme;
