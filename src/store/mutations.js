
export const state = {
  isLogin: window.sessionStorage.getItem('isLogin') ? window.sessionStorage.getItem('isLogin') : false,
  pageOpenedList: window.sessionStorage.getItem('pageOpenedList') ? JSON.parse(window.sessionStorage.getItem('pageOpenedList')) : [{path: 'home', name: 'home', title: '首页'}],
  userName: window.sessionStorage.getItem('userName') ? window.sessionStorage.getItem('userName') : 'admin',
  isLock: window.sessionStorage.getItem('isLock') ? window.sessionStorage.getItem('isLock') : false
}

export const mutations = {
  login (state) {
    state.isLogin = true
  },
  logout (state) {
    state.isLogin = false
  },
  createTag (state, tagObj) {
    state.pageOpenedList.splice(1, 0, tagObj)
  },
  removeTag (state, name) {
    state.pageOpenedList.map((item, index) => {
      if (item.name === name) {
        state.pageOpenedList.splice(index, 1)
      }
    })
  },
  moveToSecond (state, index) {
    let openedTag = state.pageOpenedList[index]
    state.pageOpenedList.splice(index, 1)
    state.pageOpenedList.splice(1, 0, openedTag)
  },
  setPageList (state, arr) {
    state.pageOpenedList = arr
  },
  setUserName (state, name) {
    state.userName = name
  },
  lock (state) {
    state.isLock = true
  },
  unlock (state) {
    state.isLock = false
  }
}
