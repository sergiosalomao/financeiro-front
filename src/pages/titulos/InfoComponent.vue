<template>
  <v-card color="orange lighten-3">
    <v-card-title>Informações</v-card-title>
    <v-list-item v-for="(item, index) in dados" :key="index">
      <v-list-item-content>
        <v-list-item-title class="font-weight-black">{{item.text}}</v-list-item-title>
        <v-list-item-title >{{item.value |dinheiro}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>
export default {
  name: "ListaComponent",
  props: ["dados"]
};
</script>