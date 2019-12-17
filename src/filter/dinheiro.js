import Vue from 'vue'
Vue.filter('dinheiro', valor => {
    return `R$ ${(valor).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
    })}`
})