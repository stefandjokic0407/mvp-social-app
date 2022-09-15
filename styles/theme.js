import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { darken, lighten, rgba } from 'polished';

const colors = {
  white: '#FFFFFF',
  orange: '#ED683C',
  gray: {
    base100: '#FAFAFA',
    base200: '#EEEEEE',
    base300: '#D7D7D7',
    base400: '#B0B0B0',
    base500: '#7A7A7A',
    base600: '#505050',
    base700: '#2D2D2D',
    base800: '#181818',
    base900: '#000000',
    navfont: '#616161',
    footerfont: '#ABABAB',
  },
  black: {
    base: '#333438',
    light: '#4b4e57',
    blue: '#2e3246',
  },
  primary: {
    main: '#F9A81C',
    light: '#FFBC49',
    dark: '#CD8204',
  },
  secondary: {
    main: '#EE542F',
    light: '#FF7858',
    dark: '#CA330F',
  },
  background: {
    light: '#fcfcfc',
    dark: '#262c41',
    gray: '#f0f2f5',
    gray001: '#fbfbfb',
  },
  border: {
    gray: '#BDC5CD',
    gray001: '#BEBEBE',
    gray002: '#C7C7C7',
  },
  brands: {
    github: '#24292E',
    instagram: {
      yellow: '#f7eb4c',
      pink: '#ee2a7b',
      blue: '#4c6aff',
    },
    youtube: '#ff0000',
  },
};

const tint = {
  black: rgba(colors.black.base, 0.1),
  white: rgba(colors.white, 0.85),
  primary: rgba(colors.primary.main, 0.35),
  primaryLight: rgba(colors.primary.main, 0.2),
  secondary: rgba(colors.secondary.main, 0.35),
};

const shadow = {
  button: {
    small: '0 5px 5px rgba(0, 0, 0, 0.2)',
    default: '0 10px 10px rgba(0, 0, 0, 0.2)',
    hover: '0 23px 28px',
  },
  card: '0 10px 8px rgba(0, 0, 0, 0.2)',
  image: '0 15px 25px rgba(0, 0, 0, 0.1)',
  feature: {
    big: {
      default: '0 40px 40px rgba(0, 0, 0, 0.2)',
      hover: '0 50px 50px rgba(0, 0, 0, 0.1)',
    },
    small: {
      default: '0 15px 25px rgba(0, 0, 0, 0.2)',
      hover: '0 40px 45px rgba(0, 0, 0, 0.1)',
    },
  },
  text: {
    small: '0 5px 10px rgba(0, 0, 0, 0.25)',
    big: '0 15px 20px rgba(0, 0, 0, 0.13)',
  },
};

const button = {
  default: {
    background: colors.black.blue,
    boxShadow: `${shadow.button.default} ${rgba(colors.black.blue, 0.4)}`,
    hover: {
      boxShadow: `${shadow.button.hover} ${rgba(colors.black.blue, 0.3)}`,
    },
  },
  primary: {
    background: `linear-gradient(30deg, ${colors.primary.light} 0%, ${colors.primary.dark} 100%)`,
    boxShadow: `${shadow.button.default} ${rgba(colors.primary.main, 0.4)}`,
    hover: {
      boxShadow: `${shadow.button.hover} ${rgba(colors.primary.main, 0.3)}`,
    },
    focus: tint.primary,
  },
  secondary: {
    background: `linear-gradient(30deg, ${colors.secondary.light} 0%, ${colors.secondary.dark} 100%)`,
    boxShadow: `${shadow.button.default} ${rgba(colors.secondary.main, 0.4)}`,
    hover: {
      boxShadow: `${shadow.button.hover} ${rgba(colors.secondary.main, 0.3)}`,
    },
    focus: tint.secondary,
  },
};

const transition = {
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  duration: '0.4s',
};

export const theme = {
  colors,
  tint,
  shadow,
  button,
  fontFamily: {
    body: `Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
    heading: `Nunito Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
  },
  layout: {
    article: '46rem',
    base: '70rem',
    big: '83.33333rem',
  },
  borderRadius: {
    default: '0.4rem',
    round: '100rem',
  },
  transitions: {
    default: {
      duration: transition.duration,
      timing: transition.easeInOutCubic,
      transition: `all ${transition.duration} ${transition.easeInOutCubic}`,
    },
    boom: {
      duration: transition.duration,
      timing: transition.easeOutBack,
      transition: `all ${transition.duration} ${transition.easeOutBack}`,
    },
    headroom: {
      transition: 'all 0.25s ease-in-out',
    },
  },
};

const brandColors = {
  primary: {
    main: '#F9A81C',
    light: lighten(0.02, '#FFBC49'),
    dark: darken(0.02, '#CD8204'),
  },
  secondary: {
    main: '#EE542F',
    light: '#FF7858',
    dark: '#CA330F',
  },
};

let muiTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1440,
    },
  },
  palette: {
    ...brandColors,
    action: {
      focus: '#0c7ce0',
    },
    error: {
      main: '#ff5125',
    },
  },
  typography: {
    fontFamily: theme.fontFamily.body,
    button: {
      fontFamily: theme.fontFamily.body,
      fontSize: '.8rem',
      letterSpacing: '2.4px',
    },
    h1: {
      fontFamily: theme.fontFamily.heading,
      fontSize: '3.25rem',
      marginBottom: '1rem',
    },
    h2: {
      fontFamily: theme.fontFamily.heading,
      fontSize: '2.625rem',
    },
    subtitle1: {
      fontFamily: theme.fontFamily.body,
    },
    subtitle2: {
      fontFamily: theme.fontFamily.body,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        background: brandColors.secondary.main,
        borderRadius: 0,
        color: colors.white,
        transition: 'all 0.4s ease',
        '&:hover': {
          backgroundColor: brandColors.primary.main,
        },
      },
      text: {
        padding: '15px 8px',
      },
    },
  },
  props: {
    MuiButton: {
      disableRipple: true,
      variant: 'contained',
      color: 'primary',
    },
  },
});

muiTheme = responsiveFontSizes(muiTheme);

export default muiTheme;
