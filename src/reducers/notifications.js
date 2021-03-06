import actionTypes from './../actions/actionTypes'
const initState = {
  isLoading: false,
  lists: [{
    id: 1,
    title: 'snhvoikfoplq 11111',
    desc: '1111 noiqjwfonoiqepfokap',
    hasRead: false
  },
  {
    id: 2,
    title: 'snhvoikfoplq 2222222',
    desc: '222222 noiqjwfonoiqepfokap',
    hasRead: false
  },
  {
    id: 3,
    title: 'snhvoikfoplq 3333333',
    desc: '3333333 noiqjwfonoiqepfokap',
    hasRead: false
  },
  {
    id: 4,
    title: 'snhvoikfoplq 4444444',
    desc: '444444 noiqjwfonoiqepfokap',
    hasRead: true
  },
  ]
}

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.MARK_NOTIFICATIONS_AS_READ_BY_ID:
      let newList = state.lists.map(item => {
        if (item.id === action.payload.id) {
          item.hasRead = true
        }
        return item
      })
      return {
        ...state,
        lists: newList
      }
    case actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ:
      let newList1 = state.lists.map(item => {
        item.hasRead = true
        return item
      })
      return {
        ...state,
        lists: newList1
      }
    case actionTypes.START_MARK_AS_READ:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.FINISH_MARK_AS_READ:
      return {
        ...state,
        isLoading: false
      }
    case actionTypes.RECEIVE_NOTIFICATIONS:
      return {
        ...state,
        lists:action.payload.list
      }
    default:
      return state
  }
}