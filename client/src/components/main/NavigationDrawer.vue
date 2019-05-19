<template>
    <v-card v-if="userName">
        <v-layout row
                  :class="drawerHeadColor">
            <v-flex >
                <v-avatar
                    :tile="false"
                    :size="50"
                    :color="avatarColor"
                    >
                      <v-img v-if="userImage"
                            :src="userImage"></v-img>
                      <v-icon v-else>$vuetify.icons.user</v-icon>
                    </v-avatar>
            </v-flex>

            <v-flex align-self-center>
                <div class="title white--text">{{userName}}</div>
            </v-flex>
        </v-layout>
        
        <v-card-actions>
          <v-layout column>

            <v-flex v-if="!isLogin">
              <v-btn flat
                      @click="login">
                <v-icon class="mr-3">$vuetify.icons.login</v-icon>
                Log in
              </v-btn>
            </v-flex>

            <v-flex v-else>
              <v-btn flat
                    @click="logOut">
                <v-icon class="mr-3">$vuetify.icons.logout</v-icon>
                Log out
              </v-btn>
            </v-flex>

          </v-layout>
        </v-card-actions>
    </v-card>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name: "NavigationDrawer",
    computed: {
        ...mapGetters([
            "avatarColor",
            "drawerHeadColor",
            "drawerHeadHeight",
            "userName",
            "userImage",
            "isLogin"
        ]),
    },
    methods: {
      login() {
        this.$router.push({path: '/login'});
      },
      logOut() {
        localStorage.removeItem("userData");
        this.$router.push({path: '/login'});
      },
    }, 
}
</script>

