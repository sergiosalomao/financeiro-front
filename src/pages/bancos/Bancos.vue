<template>
  <v-container fluid>
    <v-col>
    <title-component titulo="Bancos" />
    </v-col>
    <v-col>
      <v-btn color="success" class="mr-4" to="/bancos/cadastro">Adicionar</v-btn>
    </v-col>
    <v-col>
      <table-component :headers="headers" :items="bancos">
        <template v-slot:acoes="{ item }">
          <v-icon class="mr-2" @click="atualizar(item.id)">mdi-table-edit</v-icon>
          <v-icon class="mr-2" @click="showModalDelete(item)">mdi-delete</v-icon>
        </template>
      </table-component>
    </v-col>
    <modal-delete :dialog="show" @fechar="show = false" @deletar="deletar($event)" :item="banco" />
  </v-container>
</template>
<script>
import ModalDelete from "@/components/modal/ModalDelete";
import TableComponent from "@/components/table/TableComponent";
import TitleComponent from "@/components/title/TitleComponent";
import BancoService from "@/service/Banco/BancoService";

export default {
  name: "Banco",
  components: { ModalDelete, TableComponent, TitleComponent },
  data() {
    return {
      BancoService: new BancoService(),
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
      show: false,
      banco: {}
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
    async deletar(item) {
      await this.BancoService.remove(item.id);
      this.$toasted.global.defaultSuccess();
      this.getDados();
    },
    async getDados() {
      const data = await this.BancoService.list();
      this.bancos = data;
    }
  },
  created() {
    this.getDados();
  }
};
</script>