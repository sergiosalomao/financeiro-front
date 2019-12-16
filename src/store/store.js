import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        alert: {},
    },
    actions: {
        setAlert({ commit }, alert) {
            // eslint-disable-next-line no-console
            console.log(alert)
            commit('setAlert', alert)
            setTimeout(() => {
                commit('fecharMensagem')
            }, 4000)
        }
        // setMensagem({ commit }, mensagem) {
        //     commit('setMensagem', mensagem)


        // }
    },
    mutations: {
        setAlert(state, payload) {
            state.alert = payload
        },
        fecharMensagem(state) {
            state.alert = {}
        },

    }
})