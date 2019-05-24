import { createMuiTheme } from '@material-ui/core/styles'

export const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#e65000'
    }
  },
  typography: {
    useNextVariants: true,
  },
  error: {
    color: '#F44336'
  },
  components: {
    snackbar: {
      info: '#42a5f5',
      warning: '#f8c200',
      success: '#28bebd',
      danger: '#EF5350'
    },
    buttons: {
      actionButton: {
        background: '#e0e0e0',
        hoverBackground: '#c5c5c5',
        color: '#233649'
      }
    },
    menu: {
      active: '#F6882D'
    },
    tab: {
      indicator: '#F6882D'
    },
    table: {
      contentBgColor: '#fff',
      color: '#000'
    }
  },
  body: {
    background: '#F1F1F1',
    color: '#000'
  },
  table: {
    headerTextColor: '#000',
    borderColor: '#eee',
    headerIconColor: '#fff',
    hoverBackgroundColor: '#e7e7e7',
    textColor: '#000',
    backgroundColor: '#fff'
  },
})
