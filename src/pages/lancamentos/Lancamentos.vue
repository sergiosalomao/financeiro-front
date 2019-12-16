<template>
  <v-container fluid>
    <v-col>
      <h2>Lancamentos</h2>
    </v-col>
    <alert-component
      v-if="alertComputed.show"
      :mensagem="alertComputed.mensagem"
      :type="alertComputed.type"
    />
    <v-col>
      <v-btn color="success" class="mr-4" to="/lancamentos/cadastro">Novo Lancamento</v-btn>
    </v-col>
    <v-col>
      <v-card>
        <v-card-title>Filtros</v-card-title>
        <v-card-text>
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
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" @click="getDados()">Filtrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col>
      <v-card>
        <v-card-title>Lançamentos</v-card-title>
        <v-data-table
          :headers="headers"
          :items="lancamentos"
          hide-default-footer
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <div class="flex-grow-2"></div>
              <v-toolbar-title class="subtitle">Saldo {{totalComputed}}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <template v-slot:item.tipo="{ item }">
            <v-chip :color="getColor(item.tipo)" dark>{{ item.tipo }}</v-chip>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon class="mr-2" @click="atualizar(item.id)">mdi-table-edit</v-icon>
            <v-icon class="mr-2" @click="showModal(item)">mdi-delete</v-icon>
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
import urlApi from "@/config/urlApi";
import AlertComponent from "@/components/alert/AlertComponent";
import queryString from "query-string";

export default {
  name: "Lancamento",
  components: { ModalDelete, AlertComponent },
  data() {
    return {
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
      erro: "",
      show: false,
      lancamento: {},
      typeAlert: null
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
    deletar(item) {
      const url = `${urlApi}/api/lancamentos/${item.id}`;
      this.$http.delete(url).then(() => {
        this.getDados();
        this.$store.dispatch("setAlert", {
          show: true,
          mensagem: "Excluido com sucesso",
          type: "error"
        });
      });
    },
    getDados() {
      const filtros = queryString.stringify(this.filtro);
      const url = `${urlApi}/api/lancamentos?${filtros}`;
      this.$http
        .get(url)
        .then(res => {
          // eslint-disable-next-line no-console
          console.log(res.data);
          let saldoAtt = 0;
          let arrayData = [];
          res.data.forEach(r => {
            arrayData.push(r);
          });

          arrayData.reverse();

          this.lancamentos = res.data;
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
        })
        .catch(erro => (this.erro = erro));
    },
    getContasDados() {
      this.$http
        .get(`${urlApi}/api/contas`)
        .then(res => {
          // eslint-disable-next-line no-console
          console.log(res.data);
          this.contas = res.data.map(item => {
            return { text: item.descricao, value: item.id };
          });
        })
        .catch(erro => {
          this.erro = erro;
        });
    },
    getFluxosDados() {
      this.$http
        .get(`${urlApi}/api/fluxos`)
        .then(res => {
          // eslint-disable-next-line no-console
          console.log(res.data);
          this.fluxos = res.data.map(item => {
            return { text: item.descricao, value: item.id };
          });
        })
        .catch(erro => {
          this.erro = erro;
        });
    }
  },
  computed: {
    alertComputed() {
      return this.$store.state.alert;
    },
    totalComputed() {
      // if(this.item)
      return this.lancamentos.reduce((total, elem) => {
        if (elem.tipo == "Debito") {
          return total - parseFloat(elem.valor);
        } else {
          return total + parseFloat(elem.valor);
        }
      }, 0);
    }
  },

  created() {
    this.getDados();
    this.getContasDados();
    this.getFluxosDados();
  }
};
</script>