import Vue from 'vue'
import Vuex from 'vuex'
import urlApi from '@/config/urlApi'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || '',
        alert: {},
    },
    getters: {
        isAuthenticated: state => !!state.token,
    },
    actions: {
        auth({ commit }, user) {
            return new Promise((resolve, reject) => {
                const url = `${urlApi}login`;
                axios.post(url, user)
                .then(res => {
                  const token = `${res.data.token_type} ${res.data.access_token}`
                  localStorage.setItem('access_token', token)
                  commit('auth_success', token)
                  resolve()
                })
                .catch(() => {
                    reject()
                })
            })
        },
        logout({ commit }){
            localStorage.removeItem('access_token')
            commit('auth_logout')
        },
        setAlert({ commit }, alert) {
            // eslint-disable-next-line no-console
            console.log(alert)
            commit('setAlert', alert)
            setTimeout(() => {
                commit('fecharMensagem')
            }, 4000)
        }
    },
    mutations: {
        setAlert(state, payload) {
            state.alert = payload
        },
        fecharMensagem(state) {
            state.alert = {}
        },
        auth_success(state, payload) {
            state.token = payload
        },
        auth_logout(state) {
            state.token = ''
        }

    }
})