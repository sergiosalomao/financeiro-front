<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item to="/lancamentos">
          <v-list-item-action>
            <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Lançamentos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-item to="/bancos">
          <v-list-item-action>
            <v-icon>mdi-bank</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title >Bancos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/contas">
          <v-list-item-action>
            <v-icon>mdi-bank</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title >Contas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/fluxos">
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Fluxos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Financeiro</v-toolbar-title>
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
    drawer: null
  })
};
</script>