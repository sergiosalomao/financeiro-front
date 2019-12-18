import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '@/pages/dashboard/Dashboard'
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

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Dashboard
    },
    {
        path: '/contas',
        component: Contas,
        props: true
    },
    {
        name: 'Cadastrar Conta',
        path: '/contas/cadastro',
        component: CadastrosContas
    },
    {
        name: 'Editar conta',
        path: '/contas/editar/:id',
        component: CadastrosContas
    },
    {
        path: '/fluxos',
        component: Fluxos,
        props: true
    },
    {
        name: 'Cadastrar Fluxo',
        path: '/fluxos/cadastro',
        component: CadastrosFluxos
    },
    {
        name: 'Editar fluxo',
        path: '/fluxos/editar/:id',
        component: CadastrosFluxos
    },
    {
        name: 'Bancos',
        path: '/bancos',
        props: true,
        component: Bancos
    },
    {
        name: 'Cadastrar Bancos',
        path: '/bancos/cadastro',
        component: CadastrosBancos
    },
    {
        name: 'Editar Banco',
        path: '/bancos/editar/:id',
        component: CadastrosBancos
    },
    {
        path: '/lancamentos',
        component: Lancamentos
    },
    {
        name: 'Cadastrar Lancamento',
        path: '/lancamentos/cadastro',
        component: CadastrosLancamentos
    },
    {
        name: 'Editar Lancamentos',
        path: '/lancamentos/editar/:id',
        component: CadastrosLancamentos
    },

    {
        path: '/titulos',
        component: Titulos
    },
    {
        name: 'Cadastrar titulo',
        path: '/titulos/cadastro',
        component: CadastrosTitulos
    },
    {
        name: 'Editar Titulos',
        path: '/titulos/editar/:id',
        component: CadastrosTitulos
    },

    {
        path: '/cedentes',
        component: Cedentes
    },
    {
        name: 'Cadastrar cedentes',
        path: '/cedentes/cadastro',
        component: CadastrosCedentes
    },
    {
        name: 'Editar Cedentes',
        path: '/cedentes/editar/:id',
        component: CadastrosCedentes
    },
 
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router