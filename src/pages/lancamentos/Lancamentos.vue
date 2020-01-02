<template>
  <v-container fluid>
    <v-col>
      <title-component titulo="Lancamentos" />
    </v-col>
    
    <v-col>
      <v-btn color="success" class="mr-4" to="/lancamentos/cadastro">Novo Lancamento</v-btn>
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
            <v-col col="12" md="6">
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
          </v-row>
       
        <v-divider></v-divider>
     
          <div class="flex-grow-1"></div>
          <v-btn color="primary" @click="getDados()">Filtrar</v-btn>
  





      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
      



    </v-col>

    <v-col>
      <v-card>
        <v-card-title>Lançamentos</v-card-title>
        <v-data-table
          :headers="headers"
          :items="lancamentos"
        
          class="elevation-1"
          :items-per-page="10"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <div class="flex-grow-2"></div>
              <v-toolbar-title class="subtitle">Saldo {{totalComputed | dinheiro}}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <template v-slot:item.tipo="{ item }">
            <v-chip :color="getColor(item.tipo)" dark>{{ item.tipo }}</v-chip>
          </template>
          <template v-slot:item.valor="{ item }">
            {{item.valor | dinheiro}}
          </template>
          

          <template v-slot:item.saldo="{ item }">
            {{item.saldo | dinheiro}}
          </template>

          <template v-slot:item.data_lancamento="{ item }">
            {{item.data_lancamento | data}}
          </template>
             
             <template v-slot:item.titulo_id="{ item }">
            <v-chip v-if="item.titulo_id > 0 " color="silver" >{{ item.titulo_id }}</v-chip>
          </template>

          <template v-slot:item.action="{ item }">
            <v-icon v-if="item.titulo_id == null " class="mr-2" @click="atualizar(item.id)">mdi-table-edit</v-icon>
            <v-icon v-if="item.titulo_id ==null " class="mr-2" @click="showModal(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>

    <modal-delete
      :dialog="show"
      @fechar="show = false"
      @deletar="deletar($event)"
      :item="lancamento"
    />
  </v-container>
</template>
<script>
import ModalDelete from "@/components/modal/ModalDelete";
import TitleComponent from '@/components/title/TitleComponent'
import LancamentoService from '@/service/lancamento/LancamentoService'
import FluxoService from '@/service/Fluxo/FluxoService'
import ContaService from '@/service/Conta/ContaService'

export default {
  name: "Lancamento",
  components: { ModalDelete, TitleComponent },
  data() {
    return {
      LancamentoService : new LancamentoService(),
      FluxoService : new FluxoService(),
      ContaService : new ContaService(),
      
      filtro: {},
      headers: [
        {
          text: "Id",
          value: "id"
        },
        {
          text: "Data Lancamento",
          value: "data_lancamento"
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
          text: "Titulo",
          value: "titulo_id"
        },
        {
          text: "Descricao",
          value: "descricao"
        },
        {
          text: "Valor",
          value: "valor"
        },
        {
          text: "Saldo",
          value: "saldo"
        },
        {
          text: "Ações",
          value: "action"
        }
      ],
      contas: [],
      fluxos: [],
      lancamentos: [],
      valid: false,
      show: false,
      lancamento: {},
      saldoAtual: 0
    };
  },

  methods: {
    getColor(tipo) {
      if (tipo == "Debito") return "red";
      else return "green";
    },
  showModal(item) {
      this.lancamento = item;
      this.show = true;
    },
    atualizar(id) {
      this.$router.push({ path: `/lancamentos/editar/${id}` });
    },
    async deletar(item) {
      await this.LancamentoService.remove(item.id);
      this.$toasted.global.defaultSuccess();
      this.getDados();
    },
    async getDados() {
     const data = await this.LancamentoService.search(this.filtro)
          this.lancamentos = data;
          let saldoAtt = 0;  
          let arrayData = [];
          data.forEach(r => {
            arrayData.push(r);
          });
          arrayData.reverse();
          let new_index = arrayData.length - 1;
          arrayData.map((current_val, index) => {
            if (current_val.tipo == "Credito") {
              saldoAtt = parseFloat(saldoAtt) + parseFloat(current_val.valor);
              this.lancamentos[new_index - index].saldo = parseFloat(
                saldoAtt
              ).toFixed(2);
            } else {
              saldoAtt = parseFloat(saldoAtt) - parseFloat(current_val.valor);
              this.lancamentos[new_index - index].saldo = parseFloat(
                saldoAtt
              ).toFixed(2);
            }
            return current_val;
          });
          this.lancamentos.reverse()
    },
    async getContasDados() {
    const data = await this.ContaService.list()
      this.contas = data.map(item => {
            return { text: item.descricao, value: item.id };
          });
    },
    async getFluxosDados() {
      const data = await this.FluxoService.list()
      console.log(data)
      this.fluxos = data.map(item => {
            return { text: item.descricao, value: item.id };
          });
    }
  },

computed: {
    totalComputed() {
      return this.lancamentos.reduce((total, elem) => {
        if (elem.tipo == "Debito") {
          return total - parseFloat(elem.valor);
        } else {
          return total + parseFloat(elem.valor);
        }
      }, 0);
    },
  },

  created() {
    this.getDados();
    this.getContasDados();
    this.getFluxosDados();
  }
};
</script>