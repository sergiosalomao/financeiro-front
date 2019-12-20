import Vue from "vue";

export function showError(e) {
 
  if (typeof e === "string") {
    Vue.toasted.global.defaultError({ msg: e });
  } else if (typeof e === "object") {
    if (e) {
      let erros = e;
      Object.keys(erros).forEach(item => {
        Vue.toasted.global.defaultError({ msg: erros[item] });
      });
    } else {
      Vue.toasted.global.defaultError({ msg: e.data.message });
    }
  } else {
    Vue.toasted.global.defaultError();
  }
}

export default { showError };