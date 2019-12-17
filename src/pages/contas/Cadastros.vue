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
              <v-select v-model="conta.banco_id" label="Banco" :items="bancos"></v-select>
              <v-text-field v-model="conta.agencia" label="Agencia"></v-text-field>
              <v-text-field v-model="conta.descricao" label="Conta"></v-text-field>

              <v-btn :disabled="!valid" color="success" class="mr-4" @click="atualizar">Atualizar</v-btn>
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
      bancos: [],
      conta: {},
      valid: false,
      showAlert: false
    };
  },
  methods: {
    atualizar() {
      const id = this.conta.id ? this.conta.id : "";
      const method = this.conta.id ? "put" : "post";
      const url = `${urlApi}contas/${id}`;
      this.$http[method](url, this.conta).then(res => {
        // eslint-disable-next-line no-console
        console.log(res);
        this.$store.dispatch("setAlert", {
          show: true,
          mensagem: "Operação realizada com sucesso",
          type: "success"
        });
        this.$router.push({ path: `/contas/` });
      });
    },
    getDados(id) {
      this.$http
        .get(`${urlApi}contas/${id}`)
        .then(res => {
          // eslint-disable-next-line no-console
          console.log(res.data);
          this.conta = res.data;
        })
        .catch(erro => {
          this.erro = erro;
        });
    },
    getBancosDados() {
      this.$http
        .get(`${urlApi}bancos`)
        .then(res => {
          // eslint-disable-next-line no-console
          // console.log(res.data);
          this.bancos = res.data.map(item => {
            return { text: item.descricao, value: item.id };
          });
        })
        .catch(erro => {
          this.erro = erro;
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