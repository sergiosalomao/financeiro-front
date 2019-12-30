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
                <v-col col="10" md="10" v-if="fluxos.length > 0">
                  <v-select outlined v-model="lancamento.fluxo_id" label="Fluxo" :items="fluxos"></v-select>
                </v-col>
                <v-col col="2" md="2" v-if="fluxos.length > 0">
                  <v-btn color="success" class="mr-4" to="/fluxos/cadastro">Adicionar Fluxo</v-btn>
                </v-col>
              </v-row>

              <v-row>
                <v-col col="12" md="12">
                  <v-text-field outlined v-model="lancamento.valor" label="Valor"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col col="12" md="12">
                  <v-text-field outlined v-model="lancamento.descricao" label="Descricao"></v-text-field>
                </v-col>
              </v-row>
              <v-btn color="primary" class="mr-4" @click="$router.go(-1)">Voltar</v-btn>
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

import ContaService from "@/service/Conta/ContaService"
import FluxoService from "@/service/Fluxo/FluxoService"
import LancamentoService from "@/service/lancamento/LancamentoService"
export default {
  directives: { money: VMoney },
  data() {
    return {
      ContaService : new ContaService(),
      FluxoService : new FluxoService(),
      LancamentoService : new LancamentoService(),
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
    async getFluxoByTipo(tipo) {
         
          const data = await this.FluxoService.search({tipo:tipo})
         
          this.fluxos = data.map(item => {
            return { text: item.descricao, value: item.id };
          })

        
    },
    async atualizar() {
      await this.LancamentoService.createOrUpdate(this.lancamento)
       this.$router.push({ path: `/lancamentos/` });
   
    },
    async getDados(id) {
     
      const data = await this.LancamentoService.show(id)
          
          this.lancamento = {
          ...data,
          fluxo_id: data.fluxo.id,
          conta_id: data.conta.id,
          valor: parseFloat(data.valor)
        }
               this.getFluxoByTipo(data.tipo);
      
    },

    async getContasDados() {
      const data = await this.ContaService.list()
          this.contas = data.map(item => {
            return { text: item.descricao, value: item.id };
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