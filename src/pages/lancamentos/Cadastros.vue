<template>
  <v-container fluid>
    <h2>{{lancamento.id ? 'Atualizar' : 'Cadastrar'}}</h2>
    <v-row>
      <v-col col="12" md="12">
        <v-card>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col col="12" md="12">
                  <v-text-field
                    v-model="lancamento.data_lancamento"
                    label="Data"
                    type="date"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col col="12" md="12">
                  <v-select
                    outlined
                    v-model="lancamento.tipo"
                    label="Tipo"
                    :items="tipoItem"
                    @change="getFluxoByTipo(lancamento.tipo)"
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col col="12" md="12">
                  <v-select outlined v-model="lancamento.conta_id" label="Conta" :items="contas"></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col col="12" md="12" v-if="fluxos.length > 0">
                  <v-select outlined v-model="lancamento.fluxo_id" label="Fluxo" :items="fluxos"></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col col="12" md="12">
                  <v-text-field 
                  outlined
                  v-model="lancamento.valor"
                   label="Valor"
                   ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col col="12" md="12">
                  <v-text-field
                  outlined
                   v-model="lancamento.descricao"
                    label="Descricao"
                    ></v-text-field>
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
      lancamento: {},
      contas: [],
      fluxos: [],
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
      const id = this.lancamento.id ? this.lancamento.id : "";
      const method = this.lancamento.id ? "put" : "post";
      const url = `${urlApi}lancamentos/${id}`;
      this.$http[method](url, this.lancamento).then(() => {
        this.$store.dispatch("setAlert", {
          show: true,
          mensagem: "Operação realizada com sucesso",
          type: "success"
        });
        this.$router.push({ path: `/lancamentos/` });
      });
    },
    getDados(id) {
      this.$http.get(`${urlApi}lancamentos/${id}`).then(res => {
        (this.lancamento = {
          ...res.data,
          fluxo_id: res.data.fluxo.id,
          conta_id: res.data.conta.id,
          valor: parseFloat(res.data.valor)
        }),
          // eslint-disable-next-line no-console
          console.log(this.lancamento);
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
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.getDados(this.$route.params.id);
    }
    this.getContasDados();
  }
};
</script>