<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md3>
        <v-card>
          <v-toolbar color="primary" :dark="true">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="mdi-person"
                type="text"
                v-model="user.email"
                label="E-mail"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                type="password"
                v-model="user.password"
                label="Senha"
              ></v-text-field>
            </v-form>
            <v-alert type="error" v-if="errorLogin">Usuário ou senha inválidos</v-alert>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      errorLogin: false,
      user: {}
    };
  },
  methods: {
    login() {
      this.$store.dispatch("auth", this.user).then(() => {
        this.$router.push({ path: `/` });
      });
    }
  }
};
</script>