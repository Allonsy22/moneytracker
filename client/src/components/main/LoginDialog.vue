<template>
    <div class="text-xs-center">
    <v-dialog
      width="500"
      persistent
      v-model="isLoginDialog"
    >
      
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Guest information
        </v-card-title>

        <v-form>
            <v-container>
                <v-layout 
                    justify-center
                    column>
                    <v-flex xs12
                            class="loginField"
                            align-self-center>
                        <v-text-field v-model="userName"
                                    label="Name"
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs12 
                            class="loginField" 
                            align-self-center>
                        <v-text-field v-model="cash"
                                    :error="cashError"
                                    :error-messages="cashMessage"
                                    label="Cash"
                        ></v-text-field>
                    </v-flex>

                    <v-flex align-self-center>
                        <v-btn color="success"
                                @click="checkCash">OK</v-btn>
                        <v-btn color="error"
                               @click="closeLoginDialog">Cancel</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name: "LoginDialog",
    data() {
        return {
            userName: "",
            cash: null,
            cashMessage: "",
            cashError: false
        }
    },
    computed: {
        ...mapGetters([
            "isLoginDialog",
        ])
    },
    methods: {
        closeLoginDialog() {
            this.$store.dispatch("closeLoginDialog");
        },
        checkCash() {
            var regex = /^(0|([1-9]\d*))(\.\d{1,2})?$/;
            var validValue = regex.test(this.cash);

            if ( !validValue ) {
                this.cashMessage = "Invalid value";
                this.cashError = true;
            } else {
                this.loginGuest();
                this.cashError = false;
                this.cashMessage = "";
                this.cash = "";
                this.userName = "";
            }
            
        },
        loginGuest() {
           const userInfo = {
                    "name": this.userName,
                    "cash": this.cash,
                }
                this.$store.dispatch("getUserData", JSON.stringify(userInfo))
                    .then( () => {
                        this.$router.push({path: 'cash'});
                        this.$store.dispatch("closeLoginDialog");
                    });
        }
    },
}
</script>
