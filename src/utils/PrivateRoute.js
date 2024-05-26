/* eslint-disable react/prop-types */
import { useCookies } from 'react-cookie'
// import { useNavigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  // const [cookies] = useCookies(['token'])
  // console.log(cookies?.token)
  // const navigateTo = useNavigate
  // const token = cookies.token

  // if (!token) {
  //   return navigateTo('/')
  // }

  return children
}

export default PrivateRoute
