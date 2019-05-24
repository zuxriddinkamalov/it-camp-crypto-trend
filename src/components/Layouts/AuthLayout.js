import React from 'react'
import PropTypes from 'prop-types'
import LinearProgress from '@material-ui/core/LinearProgress'
import withStyles from '@material-ui/core/styles/withStyles'

export const styles = theme => ({
  content: {
    overflow: 'hidden',
    background: theme.table.backgroundColor,
    boxShadow: '0 5px 12px rgba(0,0,0,.2)',
    transition: 'all,.2s,ease-in-out',
    position: 'absolute',
    maxHeight: 'max-content',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    width: 375,
    padding: '20px 30px 25px',
    boxSizing: 'content-box',
    margin: 'auto',
    zIndex: 2,
    '& *': {
      color: theme.table.textColor
    }
  },

  loader: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    opacity: props => props.loading ? 1 : 0,
    transition: 'opacity 0.5s ease-out'
  },

  loaderContent: {
    position: 'absolute',
    right: '0',
    left: '0',
    top: '4px',
    width: '100%',
    height: '100%',
    background: theme.table.backgroundColor,
    zIndex: '999',
    opacity: '0.6',
    animation: 'fade 0.5s easy-in-out'
  },

  '@keyframes fade': {
    from: { opacity: 0 },
    to: { opacity: 0.7 },

  },

  title: {
    textAlign: 'center',
    fontSize: '1.5em',
    margin: '10px auto',
    textTransform: 'uppercase'
  }
})

const AuthLayout = ({ classes, title, loading, children }) => (
  <div className={classes.content}>
    {loading && <div className={classes.loaderContent} />}
    <div className={classes.loader}>
      {loading && <LinearProgress />}
    </div>
    {children}
  </div>
)

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
}

export default withStyles(styles)(AuthLayout)
