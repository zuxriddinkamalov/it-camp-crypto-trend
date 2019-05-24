import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { compose } from 'ramda'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = {
  root: {
  }
}

const enhance = compose(
  withStyles(styles)
)

const Dashboard = ({ cryptoTradingList, classes, ...props }) => {
  const list = JSON.parse(cryptoTradingList.data)
  console.warn(list)
  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          BTC
        </Typography>
        <Typography component="p">
          {list.BTC.USD}$
        </Typography>
      </Paper>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          ETH
        </Typography>
        <Typography component="p">
          {list.ETH.USD}$
        </Typography>
      </Paper>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          XRP
        </Typography>
        <Typography component="p">
          {list.XRP.USD}$
        </Typography>
      </Paper>
    </div>
  )
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  cryptoTradingList: PropTypes.object
}

export default enhance(Dashboard)
