<template>
  <v-container fluid>
    <h2>{{titulo.id ? 'Atualizar' : 'Cadastrar'}}</h2>
    <v-row>
      <v-col col="12" md="12">
        <v-card>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col col="12" md="12">
                  <v-text-field
                    v-model="titulo.vencimento"
                    label="Vencimento"
                    v-mask="'##/##/####'"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col col="12" md="12">
                  <v-select
                    v-model="titulo.tipo"
                    label="Tipo"
                    :items="tipoItem"
                    @change="getFluxoByTipo(titulo.tipo)"
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col col="12" md="12">
                  <v-select v-model="titulo.conta_id" label="Conta" :items="contas"></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col col="12" md="12" v-if="fluxos.length > 0">
                  <v-select v-model="titulo.fluxo_id" label="Fluxo" :items="fluxos"></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col col="12" md="12">
                  <v-text-field v-model="titulo.valor" label="Valor"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col col="12" md="12">
                  <v-select v-model="titulo.cedente_id" label="Cedente" :items="cedentes"></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col col="12" md="12">
                  <v-text-field v-model="titulo.sacado" label="Sacado"></v-text-field>
                </v-col>
              </v-row>
              <v-btn
                :disabled="!fluxos.length > 0"
                color="success"
                class="mr-4"
                @click="atualizar"
              >Gravar</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { VMoney } from "v-money";
import urlApi from "@/config/urlApi";
export default {
  directives: { money: VMoney },
  data() {
    return {
      moneyConfig: {
        decimal: ",",
        thousands: ".",
        precision: 2,
        masked: false
      },
      tipoItem: [
        { value: "Debito", text: "Débito" },
        { value: "Credito", text: "Crédito" }
      ],
      titulo: {},
      contas: [],
      fluxos: [],
      cedentes: [],
      valid: false
    };
  },
  methods: {
    getFluxoByTipo(tipo) {
      this.$http
        .get(`${urlApi}fluxos?tipo=${tipo}`)
        .then(res => {
          this.fluxos = res.data.map(item => {
            return { text: item.descricao, value: item.id };
          });
        })
        .catch(erro => {
          this.erro = erro;
        });
    },
    atualizar() {
      const id = this.titulo.id ? this.titulo.id : "";
      const method = this.titulo.id ? "put" : "post";
      const url = `${urlApi}titulos/${id}`;
      this.$http[method](url, this.titulo).then(() => {
        this.$store.dispatch("setAlert", {
          show: true,
          mensagem: "Operação realizada com sucesso",
          type: "success"
        });
        this.$router.push({ path: `/titulos/` });
      });
    },
    getDados(id) {
      this.$http.get(`${urlApi}titulos/${id}`).then(res => {
        (this.titulo = {
          ...res.data,
          fluxo_id: res.data.fluxo.id,
          conta_id: res.data.conta.id,
          cedente_id: res.data.cedente.id,
          valor: parseFloat(res.data.valor)
        }),
          // eslint-disable-next-line no-console
          console.log(this.titulo);
        this.getFluxoByTipo(res.data.tipo);
      });
    },

    getContasDados() {
      this.$http
        .get(`${urlApi}contas`)
        .then(res => {
          // eslint-disable-next-line no-console
          // console.log(res.data);
          this.contas = res.data.map(item => {
            return { text: item.descricao, value: item.id };
          });
        })
        .catch(erro => {
          this.erro = erro;
        });
    },

      getCedentesDados() {
      this.$http
        .get(`${urlApi}cedentes`)
        .then(res => {
          // eslint-disable-next-line no-console
          // console.log(res.data);
          this.cedentes = res.data.map(item => {
            return { text: item.descricao, value: item.id };
          });
        })
        .catch(erro => {
          this.erro = erro;
        });
    }

  },
  mounted() {
    if (this.$route.params.id) {
      this.getDados(this.$route.params.id);
    }
    this.getContasDados();
    this.getCedentesDados();
  }
};
</script>