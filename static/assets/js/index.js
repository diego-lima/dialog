import { v4 as uuidv4 } from 'uuid'; // usado para gerar ID 
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { store } from './stores/store'

import JanelaChat from './components/JanelaChat.vue'
import MensagemChat from './components/MensagemChat.vue'
import PulsoCircular from './components/PulsoCircular.vue'

Vue.component('janelachat', JanelaChat);
Vue.component('mensagemchat', MensagemChat);
Vue.component('pulsocircular', PulsoCircular);

new Vue({
  store,
  el: '#app',
  created() {
    if (!getCookie('user_id'))
      setCookie('user_id', uuidv4(), 7);
      
    this.$store.dispatch('conectarChat');

  }
})
