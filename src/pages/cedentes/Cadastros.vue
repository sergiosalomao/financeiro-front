<template>
  <v-container fluid>
    <h2>{{cedente.id ? 'Atualizar' : 'Cadastrar'}}</h2>
    <v-row>
      <v-col col="12" md="12">
        <v-card>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field outlined v-model="cedente.descricao" label="Cedente"></v-text-field>
              <v-btn :disabled="!valid" color="success" class="mr-4" @click="atualizar">Gravar</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CedenteService from "@/service/cedente/CedenteService"
export default {
  data() {
    return {
      CedenteService : new CedenteService(),
      cedente: {},
      valid: false,
    };
  },
  methods: {
    async atualizar() {
     await this.CedenteService.createOrUpdate(this.cedente);
      this.$toasted.global.defaultSuccess();
      this.$router.push({ path: `/cedentes/` });
    },
    async getDados(id) {
      const data = await this.CedenteService.show(id)
      this.cedente = data
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.getDados(this.$route.params.id);
    }
  }
};
</script>