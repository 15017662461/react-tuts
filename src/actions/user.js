import actionTypes from './actionTypes'
import {loginRequest} from '../requests'

const startLogin = () => {
  return {
    type:actionTypes.START_LOGIN
  }
}

const loginSuccess = (userInfo) => {
  return {
    type:actionTypes.LOGIN_SUCCESS,
    payload:{
      userInfo
    }
  }
}

const loginFailed = () => {
  window.localStorage.removeItem('authToken');
  window.sessionStorage.removeItem('authToken');
  window.localStorage.removeItem('userInfo');
  window.sessionStorage.removeItem('userInfo');
  return {
    type:actionTypes.LOGIN_FAILED
  }
}

export const login = (userInfo) => {
  return (dispatch) => {
    dispatch(startLogin())
    loginRequest(userInfo)
      .then(resp => {
        // console.log(resp)
        if(resp.data.code === 200){
          const {
            authToken,
          ...userInfos
        } = resp.data.data
          if(userInfo.remember === true){
            window.localStorage.setItem('authToken',authToken)
            window.localStorage.setItem('userInfo',JSON.stringify(userInfos))
          }else{
            window.sessionStorage.setItem('authToken',authToken)
            window.sessionStorage.setItem('userInfo',JSON.stringify(userInfos))
          }
          dispatch(loginSuccess(resp.data.data))
        }else{
          dispatch(loginFailed())
        }
      })
  }
}
//退出登录
export const logout = () => {
  return (dispatch) => {
    dispatch(loginFailed())
  }
}

export const changeAvatar = (avatarUrl) =>{
  return {
    type:actionTypes.CHANGE_AVATAR,
    payload:{
      avatarUrl
    }
  }
}