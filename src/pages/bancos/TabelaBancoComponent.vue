<template>
        <v-data-table :headers="headers" :items="bancos" hide-default-footer class="elevation-1">
      <template v-slot:item.action="{ item }">
        <v-icon class="mr-2" @click="atualizar(item.id)">mdi-table-edit</v-icon>
        <v-icon class="mr-2" @click="showModalDelete(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

</template>
<script>
import urlApi from "@/config/urlApi";
export default {
  
  data() {
    return {

    };
  },

};
</script>