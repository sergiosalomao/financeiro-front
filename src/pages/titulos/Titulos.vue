<template>
  <v-container fluid>
    <v-col>
      <title-component titulo="Contas a Pagar e Receber" />
    </v-col>
    <v-col>
      <v-btn color="success" class="mr-4" to="/titulos/cadastro">Novo Titulo</v-btn>
    </v-col>
    <v-col>
<template>
  <v-expansion-panels>
    <v-expansion-panel
      v-for="(item,i) in 1"
      :key="i"
    >
      <v-expansion-panel-header class="title">Filtros</v-expansion-panel-header>
      <v-expansion-panel-content>
              
          <v-row>
            <v-col col="12" md="2">
              <v-text-field v-model="filtro.datainicio" label="Data Inicio" v-mask="'##/##/####'"></v-text-field>
            </v-col>
            <v-col col="12" md="2">
              <v-text-field v-model="filtro.datafinal" label="Data Final" v-mask="'##/##/####'"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col col="12" md="2">
              <v-autocomplete
                v-model="filtro.conta_id"
                :items="contas"
                outlined
                dense
                chips
                small-chips
                label="Contas"
                multiple
                
              ></v-autocomplete>
            </v-col>
             <v-col col="12" md="2">
              <v-autocomplete
                v-model="filtro.tipo"
                :items="tipo"
                outlined
                dense
                chips
                small-chips
                label="Tipo"
              ></v-autocomplete>
            </v-col>
            <v-col col="12" md="6">
              <v-autocomplete
                v-model="filtro.fluxo_id"
                :items="fluxos"
                outlined
                dense
                chips
                small-chips
                label="Fluxos"
                multiple
                
              ></v-autocomplete>
            </v-col>
            <v-col col="12" md="2">
              <v-autocomplete
                v-model="filtro.status"
                :items="status"
                outlined
                dense
                chips
                small-chips
                label="Status"
              ></v-autocomplete>
            </v-col>
          </v-row>
        <v-divider></v-divider>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" @click="getDados()">Filtrar</v-btn>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
    </v-col>
    <v-row>
    <v-col cols="12" md="10" sm="12">
      <v-card>
        <title-component titulo="Titulos" />
        <table-component :titulo="`Previsão do Fechamento ${saldoComputed}`" :headers="headers" :items="titulos">
        
        <template v-slot:acoes="{ item }">
           <v-icon v-if="item.status == 'Aberto'" class="mr-2" @click="atualizar(item.id)">mdi-table-edit</v-icon>
            <v-icon v-if="item.status == 'Aberto'" class="mr-2" @click="showModalDelete(item)">mdi-delete</v-icon>
            <v-icon v-if="item.status == 'Aberto'" class="mr-2" @click="showModalBaixaTitulo(item)">mdi-checkbox-marked-circle</v-icon>
            <v-icon v-if="item.status == 'Pago'"   class="mr-2" @click="showModalCancelaBaixa(item)">mdi-update</v-icon>
        </template>
        </table-component>
      </v-card>
    </v-col>
    <v-col cols="12" md="2" sm="6">
  
      <info-component :dados="informacoes" /> 
    </v-col>
  </v-row>
    <modal-delete
      :dialog="show"
      @fechar="show = false"
      @deletar="deletar($event)"
      :item="titulo"
    />

    <modal-baixa-titulo
      :dialog="showModalBaixaTit"
      @fechar="fecharModalBaixaTitulo"
      @deletar="deletar($event)"
      :item="tituloBaixaTitulo"
    />

      <modal-cancela-baixa
      :dialog="showModalCancelaBaixaTit"
      @fechar="fecharModalCancelaBaixa"
      @deletar="deletar($event)"
      :item="tituloCancelaBaixa"
    />

  </v-container>
</template>
<script>
import ModalDelete from "@/components/modal/ModalDelete";
import ModalBaixaTitulo from "@/components/modal/ModalBaixaTitulo";
import ModalCancelaBaixa from "@/components/modal/ModalCancelaBaixa";

import TitleComponent from "@/components/title/TitleComponent";
import TableComponent from "@/components/table/TableComponent";
import ContaService from "@/service/Conta/ContaService";
import TituloService from "@/service/Titulo/TituloService";
import FluxoService from "@/service/Fluxo/FluxoService";
import InfoComponent from "./InfoComponent";

export default {
  name: "Titulo",
  components: {
    ModalDelete,
    ModalBaixaTitulo,
    ModalCancelaBaixa,
    TableComponent,
    TitleComponent,
    InfoComponent
  },
  data() {
    return {
      informacoes: [],

      ContaService: new ContaService(),
      TituloService: new TituloService(),
      FluxoService: new FluxoService(),
      filtro: {},
      headers: [
        {
          text: "Id",
          value: "id"
        },
        {
          text: "Vencimento",
          value: "vencimento"
        },
        {
          text: "Dias Atraso",
          value: "diasatraso"
        },
        {
          text: "Tipo",
          value: "tipo"
        },
        {
          text: "Conta",
          value: "conta.descricao"
        },
        {
          text: "Fluxo",
          value: "fluxo.descricao"
        },
        {
          text: "Cedente",
          value: "cedente.descricao"
        },
        {
          text: "sacado",
          value: "sacado"
        },
        {
          text: "Valor",
          value: "valor"
        },
        {
          text: "Status",
          value: "status"
        },
        {
          text: "Data Pagamento",
          value: "data_pagamento"
        },
        {
          text: "Ações",
          value: "action"
        }
      ],
      contas: [],
      fluxos: [],
      titulos: [],
      tipo : ['Debito','Credito'],
      status : ['Aberto','Pago'],
      valid: false,
      show: false,
      titulo: {},
      tituloBaixaTitulo: {},
      showModalBaixaTit: false,
      tituloCancelaBaixa: {},
      showModalCancelaBaixaTit: false,
      saldoAtual: 0
    };
  },
  methods: {
    fecharModalBaixaTitulo() {
      this.showModalBaixaTit = false;
      this.getDados();
    },
    fecharModalCancelaBaixa() {
      this.showModalCancelaBaixaTit = false;
      this.getDados();
    },
    showModalDelete(item) {
      this.titulo = item;
      this.show = true;
    },
    showModalBaixaTitulo(item) {
      this.tituloBaixaTitulo = item;
      this.showModalBaixaTit = true;
    },
    showModalCancelaBaixa(item) {
      this.tituloCancelaBaixa = item;
      this.showModalCancelaBaixaTit = true;
    },
    atualizar(id) {
      this.$router.push({ path: `/titulos/editar/${id}` });
    },
    async deletar(item) {
      await this.TituloService.remove(item.id);
      this.$toasted.global.defaultSuccess();
      this.getDados();
    },
    async getDados() {
      const data = await this.TituloService.search(this.filtro)
      console.log(data)
      this.titulos = data.dados
      this.informacoes =  data.total 
    },

    async getContasDados() {
      const data = await this.ContaService.list();
      this.contas = data.map(item => {
        return { text: item.descricao, value: item.id };
      });
    },
    async getFluxosDados() {
      const data = await this.FluxoService.list();
      this.fluxos = data.map(item => {
        return { text: item.descricao, value: item.id };
      });
    },

    async getInformacoesDados() {
      const data = await this.TituloService.search({ informacoes: true });
      console.log(data);
      this.informacoes = data;
    }
  },

  computed: {
    saldoComputed() {
        let total = this.titulos.reduce((total, elem) => {
        if (elem.tipo == "Debito") {
          return total - parseFloat(elem.valor);
        }
        if (elem.tipo == "Credito") {
          return total + parseFloat(elem.valor);
        }
      }, 0);
      return this.$options.filters.dinheiro(total);
      }
  },

  created() {
    this.getDados();
    this.getContasDados();
    this.getFluxosDados();
  }
};
</script>