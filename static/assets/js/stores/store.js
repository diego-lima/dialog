import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  texto: 'um texto',
  mensagens: [],
  indicadorCarregando: true,

  // conexão WebSocket
  _ws: undefined,

}
const getters = {
  conectado: state => state._ws ? state._ws.readyState == WebSocket.OPEN : false,
}
const actions = {
  add_mensagem({ state }, mensagem) {
    state._ws.send(JSON.stringify(mensagem));
  },
  conectarChat({ state, dispatch, commit, getters }) {
    commit('SET_INDICADOR', true);
    commit('SET_WS', new WebSocket(`ws://${env.WS_HOST}/ws/chat/`));

    state._ws.onopen = function () {
      commit('SET_INDICADOR', false);
    }

    state._ws.onerror = function (error) {
      console.error('erro no WebSocket', error);
      commit('SET_INDICADOR', true);
    }

    state._ws.onclose = function () {
      commit('SET_INDICADOR', true);
      setTimeout(() => { dispatch('conectarChat'); }, 4000);

    }

    state._ws.onmessage = function (message) {
      var data = JSON.parse(message.data);
      commit('ADD_MENSAGEM', data);
    }

  }
}
const mutations = {
  ADD_MENSAGEM(state, mensagem) {
    state.mensagens.push(mensagem);
  },
  SET_INDICADOR(state, flag) {
    state.indicadorCarregando = flag;
  },
  SET_WS(state, ws) {
    state._ws = ws;
  }
}
export const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});