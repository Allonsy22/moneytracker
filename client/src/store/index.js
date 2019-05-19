import Vue from 'vue';
import Vuex from 'vuex';
import login from '@/store/modules/login';
import colors from '@/store/modules/colors';
import user from '@/store/modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        login,
        colors,
        user
    }
});