import actionTypes from './actionTypes'

export const markNotificationsAsReadById = (id) => {
  // console.log(id)
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type:actionTypes.MARK_NOTIFICATIONS_AS_READ_BY_ID,
        payload:{
          id
        }
      })
    },2000)
  }
}

export const markAllNotificationsAsRead = () => {
  // console.log(id)
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type:actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ
      })
    },2000)
  }
}