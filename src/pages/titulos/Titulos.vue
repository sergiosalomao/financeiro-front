<template>
  <v-container fluid>
    <v-col>
      <h2>Titulos</h2>
    </v-col>
    <alert-component
      v-if="alertComputed.show"
      :mensagem="alertComputed.mensagem"
      :type="alertComputed.type"
    />
    <v-col>
      <v-btn color="success" class="mr-4" to="/titulos/cadastro">Novo Titulo</v-btn>
    </v-col>
    <v-col>

<template>
  <v-expansion-panels>
    <v-expansion-panel
      v-for="(item,i) in 1"
      :key="i"
    >
      <v-expansion-panel-header class="title">Filtros</v-expansion-panel-header>
      <v-expansion-panel-content>
              
          <v-row>
            <v-col col="12" md="2">
              <v-text-field v-model="filtro.datainicio" label="Data Inicio" v-mask="'##/##/####'"></v-text-field>
            </v-col>
            <v-col col="12" md="2">
              <v-text-field v-model="filtro.datafinal" label="Data Final" v-mask="'##/##/####'"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col col="12" md="4">
              <v-autocomplete
                v-model="filtro.conta_id"
                :items="contas"
                outlined
                dense
                chips
                small-chips
                label="Contas"
                multiple
              ></v-autocomplete>
            </v-col>
            <v-col col="12" md="4">
              <v-autocomplete
                v-model="filtro.fluxo_id"
                :items="fluxos"
                outlined
                dense
                chips
                small-chips
                label="Fluxos"
                multiple
              ></v-autocomplete>
            </v-col>
            <v-col col="12" md="4">
              <v-autocomplete
                v-model="filtro.status"
                :items="status"
                outlined
                dense
                chips
                small-chips
                label="Status"
                
              ></v-autocomplete>
            </v-col>
          </v-row>
        
        <v-divider></v-divider>
        
          <div class="flex-grow-1"></div>
          <v-btn color="primary" @click="getDados()">Filtrar</v-btn>
        
      


      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

      
    </v-col>

    <v-col>
      <v-card>
        <v-card-title>Titulos</v-card-title>
        <v-data-table
          :headers="headers"
          :items="titulos"
          hide-default-footer
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <div class="flex-grow-2"></div>
              <v-toolbar-title class="subtitle">Saldo {{totalComputed | dinheiro}}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <template v-slot:item.tipo="{ item }">
            <v-chip :color="getColor(item.tipo)" dark>{{ item.tipo }}</v-chip>
          </template>
          
            <template v-slot:item.vencimento="{ item }">
            {{item.vencimento | data}}
          </template>
           <template v-slot:item.valor="{ item }">
            {{item.valor | dinheiro}}
          </template>

          <template v-slot:item.saldo="{ item }">
            {{item.saldo | dinheiro}}
          </template>

           <template v-slot:item.status="{ item }">
            <v-chip :color="getColorStatus(item.status)" dark>{{ item.status }}</v-chip>
          </template>

          <template v-slot:item.action="{ item }">
            <v-icon v-if="item.status == 'Aberto'" class="mr-2" @click="atualizar(item.id)">mdi-table-edit</v-icon>
            <v-icon v-if="item.status == 'Aberto'" class="mr-2" @click="showModal(item)">mdi-delete</v-icon>
            <v-icon v-if="item.status == 'Aberto'" class="mr-2" @click="showModalBaixaTitulo(item)">mdi-checkbox-marked-circle</v-icon>
            <v-icon v-if="item.status == 'Pago'"   class="mr-2" @click="showModalCancelaBaixa(item)">mdi-update</v-icon>
          </template>


        </v-data-table>
      </v-card>
    </v-col>

    <modal-delete
      :dialog="show"
      @fechar="show = false"
      @deletar="deletar($event)"
      :item="titulo"
    />

    <modal-baixa-titulo
      :dialog="showModalBaixaTit"
      @fechar="fecharModalBaixaTitulo"
      @deletar="deletar($event)"
      :item="tituloBaixaTitulo"
    />

      <modal-cancela-baixa
      :dialog="showModalCancelaBaixaTit"
      @fechar="fecharModalCancelaBaixa"
      @deletar="deletar($event)"
      :item="tituloCancelaBaixa"
    />

  </v-container>
</template>
<script>
import ModalDelete from "@/components/modal/ModalDelete";
import ModalBaixaTitulo from "@/components/modal/ModalBaixaTitulo";
import ModalCancelaBaixa from "@/components/modal/ModalCancelaBaixa";
import urlApi from "@/config/urlApi";
import AlertComponent from "@/components/alert/AlertComponent";
import queryString from "query-string";

export default {
  name: "Titulo",
  components: { ModalDelete, AlertComponent, ModalBaixaTitulo,ModalCancelaBaixa },
  data() {
    return {
      filtro: {},
      headers: [
        {
          text: "Id",
          value: "id"
        },
        {
          text: "Vencimento",
          value: "vencimento"
        },
         {
          text: "Dias Atraso",
          value: "diasatraso"
        },
        {
          text: "Tipo",
          value: "tipo"
        },
        {
          text: "Conta",
          value: "conta.descricao"
        },
        {
          text: "Fluxo",
          value: "fluxo.descricao"
        },
        {
          text: "Cedente",
          value: "cedente.descricao"
        },
        {
          text: "sacado",
          value: "sacado"
        },
        {
          text: "Valor",
          value: "valor"
        },
        {
          text: "Saldo",
          value: "saldo"
        },
        {
          text: "Status",
          value: "status"
        },
        {
          text: "Ações",
          value: "action"
        }
      ],
      contas: [],
      fluxos: [],
      titulos: [],
      status : ['Aberto','Pago'],
      valid: false,
      erro: "",
      show: false,
      titulo: {},
      tituloBaixaTitulo: {},
      showModalBaixaTit: false,
      tituloCancelaBaixa: {},
      showModalCancelaBaixaTit: false,
      typeAlert: null,
      saldoAtual: 0,
      
    };
  },
  methods: {
    fecharModalBaixaTitulo(){
      this.showModalBaixaTit = false
      this.getDados()
    },
      fecharModalCancelaBaixa(){
      this.showModalCancelaBaixaTit = false
      this.getDados()
    },
    getColor(tipo) {
      if (tipo == "Debito") return "red";
      else return "green";
    },

     getColorStatus(status) {
      if (status == "Aberto") return "green";
      else return "silver";
    },

    showModal(item) {
      this.titulo = item;
      this.show = true;
    },
     showModalBaixaTitulo(item) {
      this.tituloBaixaTitulo = item;
      this.showModalBaixaTit = true;
    },
    showModalCancelaBaixa(item) {
      this.tituloCancelaBaixa = item;
      this.showModalCancelaBaixaTit = true;
    },
    atualizar(id) {
      this.$router.push({ path: `/titulos/editar/${id}` });
    },
    deletar(item) {
      const url = `${urlApi}titulos/${item.id}`;
      this.$http.delete(url).then(() => {
        this.getDados();
        this.$store.dispatch("setAlert", {
          show: true,
          mensagem: "Excluido com sucesso",
          type: "error"
        });
      });
    },
    getDados() {
      const filtros = queryString.stringify(this.filtro);
      const url = `${urlApi}titulos?${filtros}`;
      this.$http
        .get(url)
        .then(res => {
          this.titulos = res.data;
          let saldoAtt = 0;
          let arrayData = [];
          res.data.forEach(r => {
            arrayData.push(r);
          });

          arrayData.reverse();

          let new_index = arrayData.length - 1;

          arrayData.map((current_val, index) => {
            if (current_val.tipo == "Credito") {
              saldoAtt = parseFloat(saldoAtt) + parseFloat(current_val.valor);
              this.titulos[new_index - index].saldo = parseFloat(
                saldoAtt
              ).toFixed(2);
            } else {
              saldoAtt = parseFloat(saldoAtt) - parseFloat(current_val.valor);
              this.titulos[new_index - index].saldo = parseFloat(
                saldoAtt
              ).toFixed(2);
            }
            return current_val;
          });
          this.titulos.reverse()
        })
        .catch(erro => (this.erro = erro));
    },
    getContasDados() {
      this.$http
        .get(`${urlApi}contas`)
        .then(res => {
          this.contas = res.data.map(item => {
            return { text: item.descricao, value: item.id };
          });
        })
        .catch(erro => {
          this.erro = erro;
        });
    },
    getFluxosDados() {
      this.$http
        .get(`${urlApi}fluxos`)
        .then(res => {
          this.fluxos = res.data.map(item => {
            return { text: item.descricao, value: item.id };
          });
        })
        .catch(erro => {
          this.erro = erro;
        });
    }
  },
  computed: {
    alertComputed() {
      return this.$store.state.alert;
    },
    totalComputed() {
      // if(this.item)
      return this.titulos.reduce((total, elem) => {
        if (elem.tipo == "Debito") {
          return total - parseFloat(elem.valor);
        } else {
          return total + parseFloat(elem.valor);
        }
      }, 0);
    },
  },

  created() {
    this.getDados();
    this.getContasDados();
    this.getFluxosDados();
  }
};
</script>