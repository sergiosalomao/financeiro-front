<template>
  <v-container fluid>
    <v-col>
      <title-component titulo="Contas" />
    </v-col>
    <v-col>
      <v-btn color="success" to="/contas/cadastro">Adicionar Conta</v-btn>
    </v-col>
    <v-col>
      <table-component :headers="headers" :items="contas">
        <template v-slot:acoes="{ item }">
          <v-icon class="mr-2" @click="atualizar(item.id)">mdi-table-edit</v-icon>
          <v-icon class="mr-2" @click="showModalDelete(item)">mdi-delete</v-icon>
        </template>
      </table-component>
    </v-col>
    <modal-delete :dialog="show" @fechar="show = false" @deletar="deletar($event)" :item="conta" />
  </v-container>
</template>
<script>
import ModalDelete from "@/components/modal/ModalDelete";
import TitleComponent from "@/components/title/TitleComponent";
import TableComponent from "@/components/table/TableComponent";
import ContaService from "@/service/Conta/ContaService";

export default {
  components: { ModalDelete, TitleComponent, TableComponent },
  name: "Conta",
  data() {
    return {
      ContaService: new ContaService(),
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
      show: false,
      conta: {}
    };
  },
  methods: {
    showModalDelete(item) {
      this.conta = item;
      this.show = true;
    },
    atualizar(id) {
      this.$router.push({ path: `/contas/editar/${id}` });
    },
    async deletar(item) {
      await this.ContaService.remove(item.id);
      this.$toasted.global.defaultSuccess();
      this.getDados();
    },
    async getDados() {
      const data = await this.ContaService.list();
      this.contas = data;
    }
  },
  created() {
    this.getDados();
  }
};
</script>