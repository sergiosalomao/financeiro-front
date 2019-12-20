<template>
  <v-container fluid>
    <v-col>
      <title-component titulo="Fluxos" />
    </v-col>
    <v-col>
      <v-btn color="success" class="mr-4" to="/fluxos/cadastro">Adicionar</v-btn>
    </v-col>
    <v-col>
      <table-component :headers="headers" :items="fluxos">
        <template v-slot:acoes="{ item }">
          <v-icon class="mr-2" @click="atualizar(item.id)">mdi-table-edit</v-icon>
          <v-icon class="mr-2" @click="showModalDelete(item)">mdi-delete</v-icon>
        </template>
      </table-component>
    </v-col>
    <modal-delete :dialog="show" @fechar="show = false" @deletar="deletar($event)" :item="fluxo" />
  </v-container>
</template>
<script>
import ModalDelete from "@/components/modal/ModalDelete";
import TitleComponent from "@/components/title/TitleComponent";
import TableComponent from "@/components/table/TableComponent";
import FluxoService from "@/service/Fluxo/FluxoService";

export default {
  name: "Fluxo",
  components: {
    ModalDelete,
    TitleComponent,
    TableComponent
  },
  data() {
    return {
      FluxoService: new FluxoService(),
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
      show: false,
      fluxo: {},
    };
  },
  methods: {
    showModalDelete(item) {
      this.fluxo = item;
      this.show = true;
    },
    atualizar(id) {
      this.$router.push({ path: `/fluxos/editar/${id}` });
    },
    async deletar(item) {
      await this.FluxoService.remove(item.id);
      this.$toasted.global.defaultSuccess();
      this.getDados();
    },
    async getDados() {
      const data = await this.FluxoService.list();
      this.fluxos = data;
    }
  },
  created() {
    this.getDados();
  }
};
</script>