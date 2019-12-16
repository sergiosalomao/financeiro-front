<template>
  <v-alert dense outlined :type="type || 'success'">
    <ul>
      <ul class="alert alert-danger" style="list-style-type:none">
        <li v-for="(value, key, index) in validationErrors" :key="index">{{ value }}</li>
      </ul>
    </ul>
  </v-alert>
</template>
<script>
export default {
  name: "AlertComponent",
  props: ["mensagem", "type"],
  computed: {
    validationErrors() {
      if(typeof this.mensagem == 'object'){
        let errors = Object.values(this.mensagem);
        errors = errors.flat();
        return errors;
      } else {
        return [this.mensagem]
      }
      
    }
  }
};
</script>