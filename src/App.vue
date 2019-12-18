<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item to="/" >
          <v-list-item-icon >
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

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>SCF 1.0 - Sistema de Controle Financeiro</v-toolbar-title>
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
    cruds: [
      ["Create", "add"],
      ["Read", "insert_drive_file"],
      ["Update", "update"],
      ["Delete", "delete"]
    ],
    drawer: null
  })
};
</script>