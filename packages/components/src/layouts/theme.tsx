import { createTheme } from '@mui/material/styles'

const mode = 'light'

const palette = createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: '#607D8B',
            light: '#CFD8DC',
            dark: '#455A64',
          },
          secondary: {
            main: '#536DFE',
            light: '#536DFE',
            dark: '#536DFE',
          },
          text: {
            primary: '#212121',
            secondary: '#757575',
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#212121',
            light: '#212121',
            dark: '#212121',
          },
          secondary: {
            main: '#536DFE',
            light: '#536DFE',
            dark: '#536DFE',
          },
          text: {
            primary: '#888888',
            secondary: '#959595',
          },
        }),
  },
})

const theme = createTheme(palette, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          height: '100%',
          maxHeight: '100vh',
        },
        html: {
          height: '100%',
        },
        a: {
          textDecoration: 'none',
          color: palette.palette.primary.dark,
        },
        '#__next': {
          height: '100%',
        },
        img: {
          display: 'block',
        },
        '.fc .fc-button': {
          fontWeight: '500!important',
          fontSize: '0.87rem!important',
          lineHeight: '1.75!important',
          letterSpacing: '0.02857em!important',
          textTransform: 'uppercase!important',
          padding: '6px 16px!important',
          border: 'none!important',
          color: palette.palette.text.primary + '!important',
          boxShadow:
            '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
        },
        '.fc .fc-button:hover': {
          backgroundColor: palette.palette.primary.dark + '!important',
          boxShadow:
            '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)!important',
        },
        '.fc .fc-button-group': {
          gap: 5,
        },
        '.fc .fc-button-primary': {
          backgroundColor: palette.palette.primary.main + '!important',
          borderColor: palette.palette.primary.main + '!important',
        },
        '.fc .fc-button:focus, .fc .fc-button-primary:focus': {
          boxShadow: 'none!important',
        },
        '.fc-daygrid-dot-event .fc-event-title': {
          whiteSpace: 'normal',
        },
        '.fc .fc-daygrid-event': {
          cursor: 'pointer',
        },
        '.fc .fc-timegrid-event': {
          padding: '5px!important',
          cursor: 'pointer!important',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          flexBasis: 210,
        },
      },
    },
  },
})

export default theme
