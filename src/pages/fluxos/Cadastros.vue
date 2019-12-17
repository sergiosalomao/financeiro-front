<template>
  <v-container fluid>
    <h2>{{fluxo.id ? 'Atualizar' : 'Cadastrar'}}</h2>
    <v-row>
      <v-col col="12" md="12">
        <v-card>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="fluxo.descricao" label="Fluxo"></v-text-field>
              <v-select v-model="fluxo.tipo" label="tipo" :items="items"></v-select>
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
      items: [
        { value: "Debito", text: "Débito" },
        { value: "Credito", text: "Crédito" }
      ],
      fluxo: {},
      valid: false,
    };
  },
  methods: {
    atualizar() {
      const id = this.fluxo.id ? this.fluxo.id : "";
      const method = this.fluxo.id ? "put" : "post";
      const url = `${urlApi}fluxos/${id}`;
      this.$http[method](url, this.fluxo).then(() => {
        this.$store.dispatch('setAlert',{show: true, mensagem:'Operação realizada com sucesso',type:'success'})
        this.$router.push({ path: `/fluxos/` });
      });
    },
    getDados(id) {
      this.$http
        .get(`${urlApi}fluxos/${id}`)
        .then(res => {
          this.fluxo = res.data;
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