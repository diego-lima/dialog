<template>
  <div class="janela">
    <div class="row" v-for="(mensagem, indice) in mensagens" :key="indice">
      <mensagemchat :json="mensagem">
      </mensagemchat>
    </div>
    <div class="row">
      <div class="col-md-2 sempadding">
        <pulsocircular :flag="indicadorCarregando"></pulsocircular>
      </div>
      <div class="col-md-6">
        <label for="inputPassword2" class="sr-only">Password</label>
        <input
          type="text"
          class="form-control"
          id="inputPassword2"
          :placeholder="placeholder"
          v-model="textoDigitado"
          @keyup.enter="addMensagem"
        />
      </div>
      <div class="col-md-4">
        <button type="submit" class="btn btn-primary mb-2" @click="addMensagem">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "JanelaChat",
  props: {
    action: { type: [String, Function] } // Qual ação da store disparar (ou função para executar) quando o valor mudar.
  },
  data() {
    return {
      placeholder: "Digite um texto...",
      textoDigitado: undefined
    };
  },
  computed: mapState({
    mensagens: state => state.mensagens,
    indicadorCarregando: state => state.indicadorCarregando
  }),
  methods: {
    addMensagem() {
      if (!this.textoDigitado) return;
      var mensagem = {
        from: 'client',
        message: this.textoDigitado,
        user_id: getCookie('user_id')
      };
      this.$store.dispatch("add_mensagem", mensagem);
      this.textoDigitado = '';
    }
  }
};
</script>

<style lang="css" scoped>
.sempadding {
  padding: 0;
  max-width: 25px;
}
.janela {
  border: 9px red;
}
</style>