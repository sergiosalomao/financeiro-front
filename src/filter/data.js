import Vue from 'vue'
Vue.filter('data', value => {
   const [year, month, day] = value.split('-')
    return `${day}/${month}/${year}`
})
