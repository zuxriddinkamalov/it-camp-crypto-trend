import { compose, path } from 'ramda'
import { pure } from 'recompose'
import { connect } from 'react-redux'
import * as STATES from '../../constants/states'

const mapStateToProps = (state) => ({
  token: path([STATES.SING_IN, 'data', 'token'], state)
})

const withToken = () => {
  return compose(
    connect(mapStateToProps),
    pure
  )
}

export default withToken
