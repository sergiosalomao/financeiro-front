<template>
  <v-container fluid>
    <title-component titulo="Cedentes" />
    <v-container fluid>
      <v-btn color="success" class="mr-4" to="/cedentes/cadastro">Adicionar</v-btn>
    </v-container>
    <table-component :headers="headers" :items="cedentes">
        <template v-slot:acoes="{ item }">
        <v-icon class="mr-2" @click="atualizar(item.id)">mdi-table-edit</v-icon>
        <v-icon class="mr-2" @click="showModalDelete(item)">mdi-delete</v-icon>
      </template>
    </table-component>
    <modal-delete :dialog="show" @fechar="show = false" @deletar="deletar($event)" :item="cedente" />
  </v-container>
</template>
<script>
import ModalDelete from "@/components/modal/ModalDelete";
import TitleComponent from '@/components/title/TitleComponent'
import TableComponent from '@/components/table/TableComponent'
import CedenteService from "@/service/cedente/CedenteService";
export default {
  name: "Cedente",
  components: { ModalDelete, TitleComponent,TableComponent },
  data() {
    return {
      CedenteService : new CedenteService(),
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
      show: false,
      cedente: {},
    };
  },
  methods: {
    showModalDelete(item) {
      this.cedente = item;
      this.show = true;
    },
    atualizar(id) {
      this.$router.push({ path: `/cedentes/editar/${id}` });
    },
    async deletar(item) {
      await this.CedenteService.remove(item.id);
      this.$toasted.global.defaultSuccess();
      this.getDados();
    },
    async getDados() {
      const data = await this.CedenteService.list()
      this.cedentes = data
    },
  },
  created() {
    this.getDados();
  }
};
</script>