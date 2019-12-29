<template>
  <v-container fluid>
    <h2>{{banco.id ? 'Atualizar Banco' : 'Cadastrar Banco'}}</h2>
    <v-row>
      <v-col col="12" md="12">
        <v-card>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field outlined v-model="banco.numero" label="Numero"></v-text-field>
              <v-text-field outlined v-model="banco.descricao" label="Banco"></v-text-field>
              <v-btn :disabled="!valid" color="success" class="mr-4" @click="atualizar">Gravar</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import BancoService from '@/service/Banco/BancoService'
export default {
  data() {
    return {
      BancoService: new BancoService(),
      banco: {},
      valid: false
    };
  },
  methods: {
    async atualizar() {
      await this.BancoService.createOrUpdate(this.banco)
      this.$toasted.global.defaultSuccess();
      this.$router.push({ path: `/bancos/` });
    },
    async getDados(id) {
      const data = await this.BancoService.show(id)
      this.banco = data
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.getDados(this.$route.params.id);
    }
  }
};
</script>