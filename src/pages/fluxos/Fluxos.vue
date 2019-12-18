<template>
  <v-container fluid>
    <v-col>
    <h2>Fluxos</h2>
    </v-col>
    <alert-component
      v-if="alertComputed.show"
      :mensagem="alertComputed.mensagem"
      :type="alertComputed.type"
    />
    <v-col>
      <v-btn color="success" class="mr-4" to="/fluxos/cadastro">Adicionar</v-btn>
    </v-col>
    <v-col>
    <v-data-table :headers="headers" :items="fluxos" hide-default-footer class="elevation-1">
      <template v-slot:item.tipo="{ item }">
        <v-chip :color="getColor(item.tipo)" dark>{{ item.tipo }}</v-chip>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon class="mr-2" @click="atualizar(item.id)">mdi-table-edit</v-icon>
        <v-icon class="mr-2" @click="showModal(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
    </v-col>
    <modal-delete :dialog="show" @fechar="show = false" @deletar="deletar($event)" :item="fluxo" />
  </v-container>
</template>
<script>
import ModalDelete from "@/components/modal/ModalDelete";
import urlApi from "@/config/urlApi";
import AlertComponent from "@/components/alert/AlertComponent";

export default {
  name: "Fluxo",
  components: { ModalDelete, AlertComponent },
  data() {
    return {
      headers: [
        {
          text: "Id",
          value: "id"
        },
        {
          text: "Fluxo",
          value: "descricao"
        },
        {
          text: "Tipo",
          value: "tipo"
        },
        {
          text: "Ações",
          value: "action"
        }
      ],
      fluxos: [],
      valid: false,
      erro: "",
      show: false,
      fluxo: {},
      typeAlert: null
    };
  },
  methods: {
    getColor(tipo) {
      if (tipo == "Debito") return "red";
      else return "green";
    },

    showModal(item) {
      this.fluxo = item;
      this.show = true;
    },
    atualizar(id) {
      this.$router.push({ path: `/fluxos/editar/${id}` });
    },
    deletar(item) {
      const url = `${urlApi}fluxos/${item.id}`;
      this.$http.delete(url).then(() => {
        this.getFluxos();
        this.$store.dispatch("setAlert", {
          show: true,
          mensagem: "Excluido com sucesso",
          type: "error"
        });
      });
    },
    getFluxos() {
      this.$http
        .get(`${urlApi}fluxos`)
        .then(res => (this.fluxos = res.data))
        .catch(erro => (this.erro = erro));
    }
  },
  computed: {
    alertComputed() {
      return this.$store.state.alert;
    }
  },
  created() {
    this.getFluxos();
  }
};
</script>