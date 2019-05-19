<template>
        <div class="text-xs-center">
    <v-dialog
      v-model="isDeleteDialog"
      width="500"
      persistent>
      <v-card>
        <v-alert type="warning"
                value="true">
          Are you sure you want to delete this item?
        </v-alert>

        <v-card-actions>
          <div class="container">
            <button @click="submit">
                <v-icon size="50"
                        color="success"
                        :loading="loading">done</v-icon>
            </button>
            <button @click="cancel">
              <v-icon size="50"
                      color="warning">cancel</v-icon>
            </button>
          </div>
        </v-card-actions>
      </v-card>
 
    </v-dialog>
  </div>
</template>

<script>
import DataManager from '@/components/DataManager';
import {mapGetters} from 'vuex';

export default {
    name: "DeleteDialog",
    data() {
        return {
           dataManager: null,
           loading: false,
        }
    },
    created() {
        this.dataManager = DataManager.newManager();
    },
    computed: {
        ...mapGetters([
            'isDeleteDialog',
            'deletedItem',
            'userCash',
        ])
    },
    methods: {
        submit() {
            this.loading = true;
            this.updateMemberCash(this.deletedItem.t, this.deletedItem.a);
            this.dataManager.removeData(this.deletedItem, this.userCash)
                .then( () => {
                    return this.$store.dispatch('getUserData');
                })
                .then(() => {
                    let userData = window.localStorage.getItem("userData");
                    return this.$store.dispatch("updateUserData", userData );
                }).then(() => {
                    this.cancel();
                    this.loading = false;
                }).catch( e => {
                    console.log(e);
                });
        },
        cancel() {
            this.$store.dispatch('closeDeleteDialog');
        },
        updateMemberCash(type, amount) {
            let cash = this.userCash;
            switch(type) {
                case "loss":
                    this.$store.dispatch("updateUserCash", cash + +amount);
                    break;
                case "income":
                    this.$store.dispatch("updateUserCash", cash - +amount);
            }
        },
    },
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  text-align: center;
}
</style>
