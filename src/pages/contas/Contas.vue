<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="12" sm="12">
        <h2>Minhas Contas</h2>
      </v-col>
    </v-row>
    <alert-component
      v-if="alertComputed.show"
      :mensagem="alertComputed.mensagem"
      :type="alertComputed.type"
    />

    <v-data-table :headers="headers" :items="contas" hide-default-footer class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <!-- <v-toolbar-title>Contas Cadastradas</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>-->
          <v-spacer></v-spacer>
          <v-btn color="success" large to="/contas/cadastro">Adicionar Conta</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon class="mr-2" @click="atualizar(item.id)">mdi-table-edit</v-icon>
        <v-icon class="mr-2" @click="showModal(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <modal-delete :dialog="show" @fechar="show = false" @deletar="deletar($event)" :item="conta" />
  </v-container>
</template>
<script>
import ModalDelete from "@/components/modal/ModalDelete";
import urlApi from "@/config/urlApi";
import AlertComponent from "@/components/alert/AlertComponent";
export default {
  components: { ModalDelete, AlertComponent },
  name: "Conta",
  data() {
    return {
      headers: [
        {
          text: "Banco",
          value: "banco.descricao"
        },
        {
          text: "Agencia",
          value: "agencia"
        },
        {
          text: "Conta",
          value: "descricao"
        },
        {
          text: "Ações",
          value: "action"
        }
      ],
      contas: [],
      valid: false,
      conta: {},
      erro: "",
      typeAlert: null,
      show: false
    };
  },
  methods: {
    showModal(item) {
      this.conta = item;
      this.show = true;
    },
    atualizar(id) {
      this.$router.push({ path: `/contas/editar/${id}` });
    },
    deletar(item) {
      const url = `${urlApi}contas/${item.id}`;
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
      this.$http
        .get(`${urlApi}contas`)
        .then(res => (this.contas = res.data))
        .catch(erro => (this.erro = erro));
    }
  },
  computed: {
    alertComputed() {
      return this.$store.state.alert;
    }
  },
  created() {
    this.getDados();
  }
};
</script>