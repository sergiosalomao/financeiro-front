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
                  <v-text-field v-model="titulo.vencimento" label="Vencimento" type="date"></v-text-field>
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
                <v-col col="12" md="10">
                  <v-select v-model="titulo.cedente_id" label="Cedente" :items="cedentes"></v-select>
                </v-col>
                <v-col col="12" md="2">
                  <v-btn color="success" class="mr-4" to="/cedentes/cadastro">Adicionar Cedente</v-btn>
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
import urlApi from "@/config/urlApi";
//import ContaService from "@/service/Conta/ContaService";
import TituloService from "@/service/Titulo/TituloService";
import FluxoService from "@/service/Fluxo/FluxoService";

export default {
  data() {
    return {
      FluxoService: new FluxoService(),
      //ContaService :new ContaService(),
      TituloService: new TituloService(),

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
    async getFluxoByTipo(tipo) {
      const data = await this.FluxoService.search({ tipo: tipo });
      this.fluxos = data.map(item => {
        return { text: item.descricao, value: item.id };
      });
    },
    async atualizar() {
      await this.TituloService.createOrUpdate(this.titulo);
      this.$toasted.global.defaultSuccess();
      this.$router.push({ path: `/titulos/` });
    },
    async getDados(id) {
      console.log(id)
      const data = await this.TituloService.show(id);
      console.log(data)
      this.titulo = {
        ...data,
        fluxo_id: data.fluxo.id,
        conta_id: data.conta.id,
        cedente_id: data.cedente.id,
        valor: parseFloat(data.valor)
      },
        this.getFluxoByTipo(data.tipo);
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