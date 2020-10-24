import actionTypes from './actionTypes'
import {getNotifications} from '../requests'

const startMarkAsRead = () => {
  return {
    type: actionTypes.START_MARK_AS_READ
  }
}

const finishMarkAsRead = () => {
  return {
    type: actionTypes.FINISH_MARK_AS_READ
  }
}

export const markNotificationsAsReadById = (id) => {
  // console.log(id)
  return (dispatch) => {
    dispatch(startMarkAsRead())
    setTimeout(() => {
      dispatch({
        type:actionTypes.MARK_NOTIFICATIONS_AS_READ_BY_ID,
        payload:{
          id
        }
      })
      dispatch(finishMarkAsRead())
    },2000)
  }
}

export const markAllNotificationsAsRead = () => {
  // console.log(id)
  return (dispatch) => {
    dispatch(startMarkAsRead())
    setTimeout(() => {
      dispatch({
        type:actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ
      })
      dispatch(finishMarkAsRead())
    },2000)
  }
}

export const getNotificationList = () => {
  // console.log(id)
  return (dispatch) => {
    dispatch(startMarkAsRead())
    getNotifications()
    .then(resp => {
      // console.log(resp)
      dispatch({
        type:actionTypes.RECEIVE_NOTIFICATIONS,
        payload:{
          list:resp.lists
        }
      })
      dispatch(finishMarkAsRead())
    })
  }
}