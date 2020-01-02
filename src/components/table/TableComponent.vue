<template>
  <v-data-table :headers="headers" :items="items"  :items-per-page="10" class="elevation-1">
    <template v-slot:top>
            <v-toolbar flat>
              <div class="flex-grow-2"></div>
              <v-toolbar-title class="subtitle">{{titulo}}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
    
    <template v-slot:item.action="{ item }">
      <slot name="acoes" :item="item"></slot>
    </template>

    <template v-slot:item.tipo="{ item }">
      <v-chip :color="getColor(item.tipo)" dark>{{ item.tipo }}</v-chip>
    </template>
    <template v-slot:item.status="{ item }">
      <v-chip :color="getColorStatus(item.status)" dark>{{ item.status }}</v-chip>
    </template>
    <template v-slot:item.vencimento="{ item }">{{item.vencimento | data}}</template>
    <template v-slot:item.valor="{ item }">{{item.valor | dinheiro}}</template>
    <template v-slot:item.saldo="{ dinheiro}">{{item.saldo | dinheiro}}</template>
    <template v-slot:item.data_pagamento="{ item }">
      <v-text v-if="item.status == 'Pago'">{{item.data_pagamento | data}}</v-text>
      </template>
  </v-data-table>
</template>
<script>
export default {
  name: "TableComponent",
  props: ["headers", "items", "titulo"],
  methods: {
    getColor(tipo) {
      if (tipo == "Debito") return "red";
      else return "green";
    },
    getColorStatus(status) {
      if (status == "Aberto") return "green";
      else return "silver";
    }
  }
};
</script>