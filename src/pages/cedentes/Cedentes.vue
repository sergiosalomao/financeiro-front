<template>
  <v-container fluid>
    <h2>Cedentes</h2>
    <alert-component
      v-if="alertComputed.show"
      :mensagem="alertComputed.mensagem"
      :type="alertComputed.type"
    />
    <v-container fluid>
      <v-btn color="success" class="mr-4" to="/cedentes/cadastro">Adicionar</v-btn>
    </v-container>
    <v-data-table :headers="headers" :items="cedentes" hide-default-footer class="elevation-1">
      <template v-slot:item.action="{ item }">
        <v-icon class="mr-2" @click="atualizar(item.id)">mdi-table-edit</v-icon>
        <v-icon class="mr-2" @click="showModal(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <modal-delete :dialog="show" @fechar="show = false" @deletar="deletar($event)" :item="cedente" />
  </v-container>
</template>
<script>
import ModalDelete from "@/components/modal/ModalDelete";
import urlApi from "@/config/urlApi";
import AlertComponent from "@/components/alert/AlertComponent";

export default {
  name: "Cedente",
  components: { ModalDelete, AlertComponent },
  data() {
    return {
      headers: [
        {
          text: "Id",
          value: "id"
        },
        {
          text: "Cedente",
          value: "descricao"
        },
        
        {
          text: "Ações",
          value: "action"
        }
      ],
      cedentes: [],
      valid: false,
      erro: "",
      show: false,
      cedente: {},
      typeAlert: null
    };
  },
  methods: {
    showModal(item) {
      this.cedente = item;
      this.show = true;
    },
    atualizar(id) {
      this.$router.push({ path: `/cedentes/editar/${id}` });
    },
    deletar(item) {
      const url = `${urlApi}cedentes/${item.id}`;
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
        .get(`${urlApi}cedentes`)
        .then(res => (this.cedentes = res.data))
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