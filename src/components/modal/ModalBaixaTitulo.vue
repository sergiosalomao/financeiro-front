<template>
  <div class="modal-baixa-titulo">
    <v-dialog :value="dialog" @input="fecharModalBaixaTitulo" max-width="600">
      <v-card>
        <v-card-title class="headline">Baixar Titulo</v-card-title>
        <v-container>
          <v-row>
            <v-col col="12" md="7">
              <v-select v-model="cont" label="Conta " :items="contas"></v-select>
            </v-col>

                <v-col col="12" md="12">
                  <v-text-field outlined v-model="data_pagamento" label="Data Pagamento" type="date"></v-text-field>
                </v-col>
 
            <v-col col="12" md="2">
              <v-btn color="orange darken-1" class="mr-4" @click="fecharModalBaixaTitulo">Fechar</v-btn>
            </v-col>

            <v-col col="12" md="2">
              <v-btn color="green darken-1" class="mr-4" @click="confirm(cont,data_pagamento)">Baixar</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

import ContaService from "@/service/Conta/ContaService"
import TituloService from "@/service/Titulo/TituloService"
export default {
  name: "ModalBaixaTitulo",
  props: ["item", "dialog"],
  data() {
    return {
      ContaService :new ContaService(),
        TituloService :new TituloService(),
      filtro: "",
      contas: [],
      cont: "",
      data_pagamento:"",
    };
  },
  methods: {
    async confirm(cont,data_pagamento) {
      this.item.conta_id = cont;
      this.item.data_pagamento = data_pagamento;
      this.item.status = "Pago";
   
      await this.TituloService.createOrUpdate(this.item)
      this.fecharModalBaixaTitulo();
    
    },
    fecharModalBaixaTitulo() {
      this.cont = "";
      this.$emit("fechar");
    },
    async getContasDados() {
     const data = await this.ContaService.list()
       this.contas = data.map(item=>{
        return { text: item.descricao, value: item.id }
       })
  },
  },
  created() {
    this.getContasDados();
  }
};
</script>