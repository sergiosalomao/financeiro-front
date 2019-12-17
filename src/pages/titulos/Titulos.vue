<template>
  <v-container fluid>
    <v-col>
      <h2>Titulos</h2>
    </v-col>
    <alert-component
      v-if="alertComputed.show"
      :mensagem="alertComputed.mensagem"
      :type="alertComputed.type"
    />
    <v-col>
      <v-btn color="success" class="mr-4" to="/titulos/cadastro">Novo Titulo</v-btn>
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
        <v-card-title>Titulos</v-card-title>
        <v-data-table
          :headers="headers"
          :items="titulos"
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
      :item="titulo"
    />
  </v-container>
</template>
<script>
import ModalDelete from "@/components/modal/ModalDelete";
import urlApi from "@/config/urlApi";
import AlertComponent from "@/components/alert/AlertComponent";
import queryString from "query-string";

export default {
  name: "Titulo",
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
          text: "Vencimento",
          value: "vencimento"
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
      titulos: [],
      valid: false,
      erro: "",
      show: false,
      titulo: {},
      typeAlert: null,
      saldoAtual: 0
    };
  },
  methods: {
    
    getColor(tipo) {
      if (tipo == "Debito") return "red";
      else return "green";
    },

    showModal(item) {
      this.titulo = item;
      this.show = true;
    },
    atualizar(id) {
      this.$router.push({ path: `/titulos/editar/${id}` });
    },
    deletar(item) {
      const url = `${urlApi}titulos/${item.id}`;
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
      const url = `${urlApi}titulos?${filtros}`;
      this.$http
        .get(url)
        .then(res => {
          this.titulos = res.data;
          let saldoAtt = 0;
          let arrayData = [];
          res.data.forEach(r => {
            arrayData.push(r);
          });

          arrayData.reverse();

          let new_index = arrayData.length - 1;

          arrayData.map((current_val, index) => {
            if (current_val.tipo == "Credito") {
              saldoAtt = parseFloat(saldoAtt) + parseFloat(current_val.valor);
              this.titulos[new_index - index].saldo = parseFloat(
                saldoAtt
              ).toFixed(2);
            } else {
              saldoAtt = parseFloat(saldoAtt) - parseFloat(current_val.valor);
              this.titulos[new_index - index].saldo = parseFloat(
                saldoAtt
              ).toFixed(2);
            }
            return current_val;
          });
          this.titulos.reverse()
        })
        .catch(erro => (this.erro = erro));
    },
    getContasDados() {
      this.$http
        .get(`${urlApi}contas`)
        .then(res => {
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
        .get(`${urlApi}fluxos`)
        .then(res => {
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
      return this.titulos.reduce((total, elem) => {
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