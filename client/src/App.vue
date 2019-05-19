<template>
  <v-app id="app">
    <div id="mainContainer" v-if="$route.path !== '/login'">
      <Toolbar />
      <IncomeLossDialog />
      <v-btn fab
              :color="addBtnColor"
              fixed
              right
              bottom
              @click="showDialog">
              <v-icon size="40" 
                      color="white">add</v-icon>
      </v-btn>
    </div>

    <router-view></router-view>
     
  </v-app>
</template>

<script>
import Toolbar from '@/components/main/Toolbar';
import Menu from '@/components/main/Menu';
import IncomeLossDialog from '@/components/main/IncomeLossDialog';
import {mapGetters} from 'vuex';

export default {
  nama: "App",
  components: {
    Toolbar,
    IncomeLossDialog,
    Menu
  },
  computed: {
    ...mapGetters([
      "addBtnColor",
    ])
  },
  created() {
    let userData = localStorage.getItem("userData");

    if ( !userData ) {
      this.$router.push({path: '/login'});
    } else {
      this.$store.dispatch('getUserData')
          .then( () => this.$router.push({path: '/cash'}))
          .catch( e => console.log(e) );
    }
  },
  methods: {
      showDialog() {
          this.$store.dispatch("showIncomeLossDialog");
      }
  },
}
</script>
