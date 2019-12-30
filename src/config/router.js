import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '@/pages/dashboard/Dashboard'
import Login from '@/pages/login/Login'
import Contas from '@/pages/contas/Contas'
import CadastrosContas from '@/pages/contas/Cadastros'
import Fluxos from '@/pages/fluxos/Fluxos'
import CadastrosFluxos from '@/pages/fluxos/Cadastros'
import Bancos from '@/pages/bancos/Bancos'
import CadastrosBancos from '@/pages/bancos/Cadastros'
import Lancamentos from '@/pages/lancamentos/Lancamentos'
import CadastrosLancamentos from '@/pages/lancamentos/Cadastros'
import Titulos from '@/pages/titulos/Titulos'
import CadastrosTitulos from '@/pages/titulos/Cadastros'
import Cedentes from '@/pages/cedentes/Cedentes'
import CadastrosCedentes from '@/pages/cedentes/Cadastros'
import store from '@/store/store'

Vue.use(VueRouter);

const ifAuthenticated = (to, from, next) => {
    if (store.getters['isAuthenticated']) {
        next()
        return
    }
    next('/login')
}

const routes = [
    
    {
        path: '/',
        component: Dashboard,
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/contas',
        component: Contas,
        props: true,
        beforeEnter: ifAuthenticated,
    },
    {
        name: 'Cadastrar Conta',
        path: '/contas/cadastro',
        component: CadastrosContas,
        beforeEnter: ifAuthenticated,
    },
    {
        name: 'Editar conta',
        path: '/contas/editar/:id',
        component: CadastrosContas,
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/fluxos',
        component: Fluxos,
        props: true,
        beforeEnter: ifAuthenticated,
    },
    {
        name: 'Cadastrar Fluxo',
        path: '/fluxos/cadastro',
        component: CadastrosFluxos,
        beforeEnter: ifAuthenticated,
    },
    {
        name: 'Editar fluxo',
        path: '/fluxos/editar/:id',
        component: CadastrosFluxos,
        beforeEnter: ifAuthenticated,
    },
    {
        name: 'Bancos',
        path: '/bancos',
        props: true,
        component: Bancos,
        beforeEnter: ifAuthenticated,
    },
    {
        name: 'Cadastrar Bancos',
        path: '/bancos/cadastro',
        component: CadastrosBancos
    },
    {
        name: 'Editar Banco',
        path: '/bancos/editar/:id',
        component: CadastrosBancos,
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/lancamentos',
        component: Lancamentos,
        beforeEnter: ifAuthenticated,
    },
    {
        name: 'Cadastrar Lancamento',
        path: '/lancamentos/cadastro',
        component: CadastrosLancamentos,
        beforeEnter: ifAuthenticated,
    },
    {
        name: 'Editar Lancamentos',
        path: '/lancamentos/editar/:id',
        component: CadastrosLancamentos,
        beforeEnter: ifAuthenticated,
    },

    {
        path: '/titulos',
        component: Titulos,
        beforeEnter: ifAuthenticated,
    },
    {
        name: 'Cadastrar titulo',
        path: '/titulos/cadastro',
        component: CadastrosTitulos,
        beforeEnter: ifAuthenticated,
    },
    {
        name: 'Editar Titulos',
        path: '/titulos/editar/:id',
        component: CadastrosTitulos,
        beforeEnter: ifAuthenticated,
    },

    {
        path: '/cedentes',
        component: Cedentes,
        beforeEnter: ifAuthenticated,
    },
    {
        name: 'Cadastrar cedentes',
        path: '/cedentes/cadastro',
        component: CadastrosCedentes,
        beforeEnter: ifAuthenticated,
    },
    {
        name: 'Editar Cedentes',
        path: '/cedentes/editar/:id',
        component: CadastrosCedentes,
        beforeEnter: ifAuthenticated,
    },
 
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router