import { createStore } from 'vuex'

// types
const types = {
  SET_LOCATION: "SET_LOCATION",
  SET_ADDRESS: "SET_ADDRESS"
}
// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      location: {},
      address: "",
      addCity: ''
    }
  },
  getters: {
    location: state => state.location,
    address: state => state.address
  },
  mutations: {
    [types.SET_LOCATION](state, location) {
      if (location) {
        state.location = location
      } else {
        state.address = "";
      }
    },
    [types.SET_ADDRESS](state, address) {
      if (address) {
        state.address = address
      } else {
        state.address = "";
      }
    },
    addCity(state, addCity) {
      if (state.addCity) { state.addCity = '' }
      if (addCity) {
        state.addCity = addCity
      } else {
        state.addCity = ''
      }
    }
  },
  actions: {
    setLocation: ({ commit }, location) => {
      commit(types.SET_LOCATION, location)
    },
    setAddress: ({ commit }, address) => {
      commit(types.SET_ADDRESS, address)
    }
  }
})
export default store