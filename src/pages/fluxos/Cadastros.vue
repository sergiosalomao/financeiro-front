<template>
  <v-container fluid>
    <h2>{{fluxo.id ? 'Atualizar' : 'Cadastrar'}}</h2>
    <v-row>
      <v-col col="12" md="12">
        <v-card>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field outlined v-model="fluxo.descricao" label="Fluxo"></v-text-field>
              <v-select outlined v-model="fluxo.tipo" label="tipo" :items="items"></v-select>
              <v-btn :disabled="!valid" color="success" class="mr-4" @click="atualizar">Gravar</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import FluxoService from "@/service/Fluxo/FluxoService";
export default {
  data() {
    return {
      FluxoService: new FluxoService(),
      items: [
        { value: "Debito", text: "Débito" },
        { value: "Credito", text: "Crédito" }
      ],
      fluxo: {},
      valid: false
    };
  },
  methods: {
    async atualizar() {
      await this.FluxoService.createOrUpdate(this.fluxo);
      this.$toasted.global.defaultSuccess();
      this.$router.push({ path: `/fluxos/` });
    },
    async getDados(id) {
      const data = await this.FluxoService.show(id);
      this.fluxo = data;
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.getDados(this.$route.params.id);
    }
  }
};
</script>