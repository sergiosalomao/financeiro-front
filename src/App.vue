<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app v-if="isAuthenticated">
      <v-list>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-title>DashBoard</v-list-item-title>
          <v-list-item-icon></v-list-item-icon>
        </v-list-item>

        <v-list-group no-action sub-group value="true">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Financeiro</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="(admin, i) in admins" :key="i" :to="admin[2]">
            <v-list-item-icon>
              <v-icon v-text="admin[1]"></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="admin[0]"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark v-if="isAuthenticated">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>SCF 1.0 - Sistema de Controle Financeiro</v-toolbar-title>
      <v-spacer></v-spacer>

      <div class="text-center">
        <v-menu>
          <template v-slot:activator="{ on: menu }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn icon v-on="{ ...tooltip, ...menu }">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <span>Menu configuracao</span>
            </v-tooltip>
          </template>
          <v-list>
            <v-list-item >
              <v-list-item-title >Configurações</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title >Sair</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    source: String
  },
  data: () => ({
    admins: [
      ["Lancamentos", "mdi-checkbox-marked-circle-outline", "/lancamentos"],
      ["Titulos", "mdi-barcode", "/titulos"],
      ["Bancos", "mdi-bank", "/bancos"],
      ["Contas", "mdi-square-inc-cash", "/contas"],
      ["Fluxos", "mdi-sitemap", "/fluxos"]
    ],
    drawer: null
  }),
  methods: {
    logout(){

      this.$store.dispatch("logout")
       this.$router.push({ path: `/login` });
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  }
};
</script>