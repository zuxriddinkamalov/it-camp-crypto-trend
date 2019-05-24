import React from 'react'
import PropTypes from 'prop-types'
import { compose, pure } from 'recompose'
import withStyles from '@material-ui/core/styles/withStyles'
import CssBaseline from '@material-ui/core/CssBaseline'
import PageLoading from '../PageLoading'
import Snackbar from '../Snackbar'
import { getDefaultProps } from '../../helpers/app'

const styles = theme => ({
  '@global': {
    html: {
      width: '100%',
      fontSize: 14,
      fontFamily: '"Roboto", sans-serif'
    },
    body: {
      backgroundColor: theme.body.background,
      color: theme.body.color,
      minHeight: '100vh',
      width: '100%',
      '& .h1, & .h2, & .h3, & .h4, & .h5, & .h6, & h1, & h2, & h3, & h4, & h5, & h6': {
        color: theme.palette.primary.main
      },
      '& h1, & h2, & h3, & h4, & h5, & h6': {
        fontWeight: '300'
      },
      '& a:link, & a:visited': {
        transition: 'all .5s ease'
      },
      '& .divider, & hr': {
        marginTop: 10,
        marginBottom: 10,
        height: 1,
        width: '100%',
        background: '#E3ECF7'
      },
      '& input:-webkit-autofill': {
        '-webkit-box-shadow': '0 0 0 1000px white inset'
      }
    },
    a: {
      color: theme.palette.primary.main,
      textDecoration: 'none'
    },
    hr: {
      border: 0,
      borderTop: '1px solid #eee',
    }
  },
  page: {
    minHeight: '100vh'
  }
})

const enhance = compose(
  withStyles(styles),
  pure
)

const BaseLayout = ({ classes, ...props }) => (
  <div className={classes.page}>
    <CssBaseline />
    <PageLoading />
    {props.children && React.cloneElement(props.children, { app: getDefaultProps(props) })}
    <Snackbar />
  </div>
)

BaseLayout.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node,
}

export default enhance(BaseLayout)
