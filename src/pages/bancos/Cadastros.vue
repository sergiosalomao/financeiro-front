<template>
  <v-container fluid>
    <h2>{{banco.id ? 'Atualizar Banco' : 'Cadastrar Banco'}}</h2>
    <v-row>
      <v-col col="12" md="12">
        <v-card>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="banco.numero" label="Numero"></v-text-field>
              <v-text-field v-model="banco.descricao" label="Banco"></v-text-field>
              <v-btn :disabled="!valid" color="success" class="mr-4" @click="atualizar">Gravar</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import urlApi from "@/config/urlApi";
export default {
  data() {
    return {
      banco: {},
      valid: false
    };
  },
  methods: {
    atualizar() {
      const id = this.banco.id ? this.banco.id : "";
      const method = this.banco.id ? "put" : "post";
      const url = `${urlApi}bancos/${id}`;
      this.$http[method](url, this.banco).then(() => {
        this.$store.dispatch("setAlert", {
          show: true,
          mensagem: "Operação realizada com sucesso",
          type: "success"
        });
        this.$router.push({ path: `/bancos/` });
      });
    },
    getDados(id) {
      this.$http.get(`${urlApi}bancos/${id}`).then(res => {
        this.banco = res.data;
      });
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.getDados(this.$route.params.id);
    }
  }
};
</script>