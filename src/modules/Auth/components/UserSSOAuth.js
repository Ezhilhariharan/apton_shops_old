import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import initializeApp from '@utils/initializeApp'

const Wrapper = styled.div`
  margin: 60px auto;
  font-size: 20px;
  text-align: center;
`

const UserSSOAuth = ({
  // actions
  updateOnboardingSteps,
  upDateAuthToken,
  getCurrentUserInfo
}) => {
  const navigate = useNavigate()
  const location = window.location.href
  const getParameterByName = (param, url) => {
    if (!url) url = window.location.href
    // eslint-disable-next-line no-useless-escape
    param = param.replace(/[\[\]]/g, '\\$&')
    var regex = new RegExp('[?&]' + param + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
  }

  useEffect(() => {
    const signUpStatus = getParameterByName('status', location)
    const auth_token = getParameterByName('token', location)
    if (parseInt(signUpStatus) === 2 && auth_token) {
      updateOnboardingSteps(1)
      upDateAuthToken(auth_token)
      localStorage.setItem('authToken', auth_token)
      initializeApp(auth_token)
      getCurrentUserInfo()
      navigate('/onboarding')
    }
    if (parseInt(signUpStatus) === 10 && auth_token) {
      updateOnboardingSteps(0)
      upDateAuthToken(auth_token)
      initializeApp(auth_token)
      localStorage.setItem('authToken', auth_token)
      getCurrentUserInfo()
      navigate('/dashboard')
    }
  }, [])

  return <Wrapper> Please wait ....</Wrapper>
}

export default UserSSOAuth
