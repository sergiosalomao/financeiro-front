<template>
  <v-container fluid>
    <h2>{{cedente.id ? 'Atualizar' : 'Cadastrar'}}</h2>
    <v-row>
      <v-col col="12" md="12">
        <v-card>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="cedente.descricao" label="Cedente"></v-text-field>
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
      cedente: {},
      valid: false,
    };
  },
  methods: {
    atualizar() {
      const id = this.cedente.id ? this.cedente.id : "";
      const method = this.cedente.id ? "put" : "post";
      const url = `${urlApi}cedentes/${id}`;
      this.$http[method](url, this.cedente).then(() => {
        this.$store.dispatch('setAlert',{show: true, mensagem:'Operação realizada com sucesso',type:'success'})
        this.$router.push({ path: `/cedentes/` });
      });
    },
    getDados(id) {
      this.$http
        .get(`${urlApi}cedentes/${id}`)
        .then(res => {
          this.cedente = res.data;
        })
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.getDados(this.$route.params.id);
    }
  }
};
</script>