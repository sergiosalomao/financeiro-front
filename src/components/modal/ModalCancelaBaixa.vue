<template>
  <div class="modal-cancela-baixa">
    <v-dialog :value="dialog" @input="fecharModalCancelaBaixa" max-width="500">
      <v-card>
        <v-card-title class="headline">Deseja cancelar a baixa deste titulo?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="fecharModalCancelaBaixa">Não</v-btn>
          <v-btn color="green darken-1" text @click="confirm">Sim</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

import TituloService from "@/service/Titulo/TituloService"
export default {
  name: "ModalCancelaBaixa",
  props: ["item", "dialog"],
  data() {
    return {
      TituloService : new TituloService(),
    };
  },
  methods: {
    async confirm() {
      this.item.status = "Aberto";
      await this.TituloService.createOrUpdate(this.item)
          this.fecharModalCancelaBaixa();
     
    },
    fecharModalCancelaBaixa() {
      this.$emit("fechar");
    }
  }
};
</script>