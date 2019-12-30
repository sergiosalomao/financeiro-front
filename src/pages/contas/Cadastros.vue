<template>
  <v-container fluid>
    <h2>{{conta.id ? 'Atualizar Conta' : 'Cadastrar Conta'}}</h2>
    <v-row>
      <v-col col="12" md="12">
        <v-toolbar flat color="transparent">
          <v-spacer></v-spacer>
          <v-btn color="success" large to="/bancos/cadastro">Adicionar Banco</v-btn>
        </v-toolbar>
        <v-card>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-select outlined v-model="conta.banco_id" label="Banco" :items="bancos"></v-select>
              <v-text-field outlined v-model="conta.agencia" label="Agencia"></v-text-field>
              <v-text-field outlined v-model="conta.descricao" label="Conta"></v-text-field>
              <v-btn color="primary" class="mr-4" @click="$router.go(-1)">Voltar</v-btn>
              <v-btn :disabled="!valid" color="success" class="mr-4" @click="atualizar">Atualizar</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ContaService from "@/service/Conta/ContaService";
import BancoService from "@/service/Banco/BancoService";

export default {
  data() {
    return {
      BancoService: new BancoService(),
      ContaService: new ContaService(),
      bancos: [],
      conta: {},
    };
  },

  methods: {
    async atualizar() {
      await this.ContaService.createOrUpdate(this.conta);
      this.$toasted.global.defaultSuccess();
      this.$router.push({ path: `/contas/` });
    },
    async getDados(id) {
      const data = await this.ContaService.show(id);
      this.conta = data;
      console.log(data);
    },
    async getBancosDados() {
      const data = await this.BancoService.list();
      this.bancos = data.map(item => {
        return { text: item.descricao, value: item.id };
      });
    }
  },

  created() {
    if (this.$route.params.id) {
      this.getDados(this.$route.params.id);
    }
    this.getBancosDados();
  }
};
</script>