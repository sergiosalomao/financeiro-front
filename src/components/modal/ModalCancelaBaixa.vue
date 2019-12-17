<template>
  <div class="modal-cancela-baixa">
    <v-dialog :value="dialog" @input="fechar" max-width="500">
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
import urlApi from "@/config/urlApi";
export default {
  name: "ModalCancelaBaixa",
  props: ["item", "dialog"],
  data() {
    return {};
  },
  methods: {
    confirm() {
        
        this.item.status = 'Aberto'
        const url = `${urlApi}titulos/${this.item.id}`
        this.$http.put(url, this.item)
        .then(() => {
            this.fecharModalCancelaBaixa()
        }) 
        .catch(() => {

        }) 
     
    },
      fecharModalCancelaBaixa() {
      this.$emit("fechar");
    },
    
  },
 
};
</script>