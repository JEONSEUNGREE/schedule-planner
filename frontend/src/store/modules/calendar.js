import axios from "axios"

const state = {

  events: [],

}

const getters = {
  getevents: state => state.events.filter(v => v.email == localStorage.getItem('email')),

}
const mutations  = {
  FETCH_CALENDAR(state, payload) {
    state.events = payload
  }

}

const actions = {

  addEvent({ commit }, payload) {
    axios.post('http://localhost:7777/calendar/add-calendar', payload)
      .then(res => {

        commit('snackBar/SET_SNACKBAR', {
          text: '등록완료' , color: 'black', location: 'bottom'
        }, { root: true } )
      })

    commit('loading/SET_LOADING', {}, { root: true } )

      .catch(err => {
        alert('occur' + err)
        // snackbar
      })
  },

  fetchCalendar({ commit }) {
    axios.get('http://localhost:7777/calendar/fetch-calendar')
      .then(res => {
        commit("FETCH_CALENDAR", res.data)
      })
      .catch(err => {
        console.log(err.status)
      })
  },

  deleteCalendar({ commit }, eventNo) {
    axios.delete(`http://localhost:7777/calendar/delete-calendar/${eventNo}`)
      .then(res => {
        commit('snackBar/SET_SNACKBAR', {
          text: '삭제완료' , color: 'black', location: 'bottom'
        }, { root: true } )
        commit('loading/SET_LOADING', {}, { root: true } )
      })
      .catch(err => {
        console.log(err)
      })
  },



}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
