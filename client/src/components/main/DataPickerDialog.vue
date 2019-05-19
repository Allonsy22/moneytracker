<template>
    <div class="text-xs-center">
    <v-dialog
      v-model="isDataPickerDialog"
      width="500"
      persistent
    >
      <v-card>
        <v-flex>
            <v-date-picker v-model="date" 
                            color="green lighten-1" 
                            header-color="primary"
                            full-width></v-date-picker>
        </v-flex>

        <v-alert :value="warning"
                  type="warning"
                  style="width: 300px;">
          This day has not come yet
        </v-alert>

        <v-card-actions>
          <div class="container">
            <button @click="setDate">
                <v-icon size="50"
                        color="success">done</v-icon>
            </button>
            <button @click="closeDialog">
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
import {mapGetters} from 'vuex';

export default {
    name: 'DataPickerDialog',
    data() {
        return {
          warning: false,
          date: new Date().toISOString().substring(0, 10),
        }
    },
    computed: {
        ...mapGetters([
            'isDataPickerDialog'
        ])
    },
    methods: {
        setDate() {
            let currentDateMillisec = new Date().getTime();
            let selectDateMillisec = new Date(this.date).getTime();
            
            if ( selectDateMillisec > currentDateMillisec ) {
                this.warning = true;
            } else {
                this.$store.dispatch('setDate', this.date);
                this.warning = false;
                this.closeDialog();
            }
        },
        closeDialog() {
          this.$store.dispatch('closeDataPickerDialog');
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