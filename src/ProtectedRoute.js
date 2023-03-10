import React from 'react'
import { Outlet } from 'react-router'
import Signin from './onboard-brand/Signin';

const useAuth = () => {

  return false;

}

const ProtectedRoutes = () => {

  const isAuth = useAuth()

  return isAuth ? <Outlet /> : <Signin />
}

export default ProtectedRoutes