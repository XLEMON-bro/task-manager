import Vue from 'vue';
import Vuex from 'vuex';
import taskModule from './modules/task/index.js'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        task: taskModule,
    }
});
