<template>
  <div class="background">
    <LoginDialog />

    <v-layout column>
        
        <v-flex align-self-center>
            <GoogleLogin :params="params" 
                        :onSuccess="onSuccess" 
                        :onFailure="onFailure"
                        class="googleBtn">Login with Google</GoogleLogin>
        </v-flex>

        <v-flex align-self-center>
            <v-btn @click="showLoginDialog"
                    class="guestBtn">Guest</v-btn>
        </v-flex>
    </v-layout>
  </div>
</template>

<script>
import LoginDialog from '@/components/main/LoginDialog';
import GoogleLogin from 'vue-google-login';

export default {
    name: "LoginPage",
    components: {
        LoginDialog,
        GoogleLogin
    },
    data() {
        return {
            params: {
                client_id: '124616561955-3agf6s71s9i71iri9re05abj9db93j0u',
            }
        }
    },
    methods: {
        showLoginDialog() {
            let userData = localStorage.getItem("userData");

            if ( !userData ) {
                this.$store.dispatch("showLoginDialog");
            } else {
                this.$router.push({path: '/cash'});
            }
        },
        onSuccess(googleUser) {
            let profile = googleUser.getBasicProfile();
            let userInfo = {
                'name': profile.getName(),
                'image': profile.getImageUrl(),
                'email': profile.getEmail()
            }

            this.$store.dispatch("googleLogin", JSON.stringify(userInfo)).then( () => {
                return this.$store.dispatch("getUserData");
            }).then( () => {
                this.$router.push({path: '/cash'});
            }).catch( error => {
                console.log(error);
            });

        },
        onFailure() {
            console.log("Error");
        }
    },
}
</script>

<style scoped>
.background {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(45deg, #3675E7, #9b59b6);
    display: flex;
    align-items: center;
}

.googleBtn {
    width: 240px;
    height: 50px;
    background-color: #4285F4;
    color: #ffffff;
    font-size: 18px;
}
.guestBtn {
    width: 240px;
    height: 50px;
}
</style>
