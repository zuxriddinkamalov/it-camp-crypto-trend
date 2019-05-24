import React from 'react'
import PropTypes from 'prop-types'
import SignInForm from '../components/SignInForm'
import AuthLayout from '../../../components/Layouts/AuthLayout'

const SignIn = ({ loading, onSubmit }) => (
  <AuthLayout
    loading={loading}>
    <div>
      <SignInForm onSubmit={onSubmit} />
    </div>
  </AuthLayout>
)

SignIn.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default SignIn
