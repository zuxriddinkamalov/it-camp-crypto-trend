import React from 'react'
import PropTypes from 'prop-types'
import t from '../helpers/translate'

const T = props => {
  return <React.Fragment>{t(props.children)}</React.Fragment>
}

T.propTypes = {
  children: PropTypes.string
}

export default T
