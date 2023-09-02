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
      default: '#111',
      paper: '#000000',
    },
    text: {
      primary: '#a9a3a6',
    },
  },
  actionArea: {
    background: '#292929',
    disabled: '#101010',
    greyedOut: '#646464',
  },
});

interface CustomThemeProps {
  children: React.ReactNode;
}

const CustomTheme = (props: CustomThemeProps) => {
  const { children } = props;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default CustomTheme;
