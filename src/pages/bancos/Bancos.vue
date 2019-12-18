<template>
  <v-container fluid>
    
      <v-col >
        <h2>Bancos</h2>
      </v-col>
    
    <alert-component
      v-if="alertComputed.show"
      :mensagem="alertComputed.mensagem"
      :type="alertComputed.type"
    />
    <v-col>
      <v-btn color="success" class="mr-4" to="/bancos/cadastro">Adicionar</v-btn>
    </v-col>
     <v-col>
    <v-data-table :headers="headers" :items="bancos" hide-default-footer class="elevation-1">
      <template v-slot:item.action="{ item }">
        <v-icon class="mr-2" @click="atualizar(item.id)">mdi-table-edit</v-icon>
        <v-icon class="mr-2" @click="showModalDelete(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
     </v-col>
    <modal-delete :dialog="show" @fechar="show = false" @deletar="deletar($event)" :item="banco" />
  </v-container>
</template>
<script>
import ModalDelete from "@/components/modal/ModalDelete";
import urlApi from "@/config/urlApi";
import AlertComponent from "@/components/alert/AlertComponent";

export default {
  name: "Banco",
  components: { ModalDelete, AlertComponent },
  data() {
    return {
      headers: [
        {
          text: "Numero",
          value: "numero"
        },

        {
          text: "Banco",
          value: "descricao"
        },

        {
          text: "Ações",
          value: "action"
        }
      ],
      bancos: [],
      valid: false,
      erro: "",
      show: false,
      banco: {},
      typeAlert: null
    };
  },
  methods: {
    showModalDelete(item) {
      this.banco = item;
      this.show = true;
    },
    atualizar(id) {
      this.$router.push({ path: `/bancos/editar/${id}` });
    },
    deletar(item) {
      const url = `${urlApi}bancos/${item.id}`;
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
        .get(`${urlApi}bancos`)
        .then(res => (this.bancos = res.data))
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