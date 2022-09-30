// Documents config
let config = require("../../config/config.json");

//Socketio
//import io from "socket.io-client";
//let socketioInstance = io(store.state.server);
//console.log(socketioInstance)

/* EXEMPLE
    // EMIT DATA
    socketioInstance.emit('name', _data);

    //LISTEN DATA
    socketioInstance.on('name', function(_data) {
        //console.log(_data)
    })
*/

//import Web3 from 'web3';

import Vuex from "vuex";

const store = new Vuex.Store({
  state: {
    gconfig: config,
    //server: config.server
    userData: null,
  },
  getters: {},
  mutations: {},
  actions: {},
});

export default store;
