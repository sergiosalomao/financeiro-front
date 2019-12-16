<template>
  <div class="modal-delete">
    <v-dialog :value="dialog" @input="fechar" max-width="360">
      <v-card>
        <v-card-title class="headline">Deseja excluir este registro?</v-card-title>

        

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="fechar">Não</v-btn>

          <v-btn color="green darken-1" text @click="confirm">Sim</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "ModalDelete",
  props: ["item", "dialog"],
  data() {
    return {};
  },
  methods: {
    confirm(){
      this.$emit('deletar', this.item)
      this.$emit("fechar");
    },
    fechar() {
      this.$emit("fechar");
    }
  }
};
</script>