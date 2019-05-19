<template>
    <div class="text-xs-center">
    <DataPickerDialog />
    <v-dialog
      persistent
      v-model="isIncomeLossDialog">
      <v-container>
          <v-layout>
              <v-flex>
                  <v-card>
                    <v-flex>
                        <v-tabs centered
                                v-model="tabType"
                                :color="incomeLossDialogColor"
                                dark
                                icons-and-text
                                fixed-tabs
                            >
                            <v-tabs-slider color="#FFC300"></v-tabs-slider>

                            <v-tab href="#loss">
                                Loss
                                <v-icon>trending_down</v-icon>
                            </v-tab>

                            <v-tab href="#income">
                                Income
                                <v-icon>trending_up</v-icon>
                            </v-tab>
                            <!--loss-->
                            <v-tabs-items>
                                <v-tab-item value="loss">
                                <v-card-actions>
                                    <v-container>
                                        <v-layout wrap
                                                  class="icons_container" 
                                                  align-center>
                                            <v-layout v-for="(item, i) in tabIcons['loss']"
                                                :key="i"
                                                align-center
                                                column
                                                ma-1>
                                                <v-btn fab 
                                                       :color="categoriesBtnColor"
                                                       @click="selectCategories(item, i)">
                                                    <v-icon :color="iconsColor.loss[i]">{{ $vuetify.icons[item] }}</v-icon>
                                                </v-btn>
                                                {{tabIcons.loss[i]}}
                                            </v-layout>
                                        </v-layout>
                                    </v-container>
                                </v-card-actions>
                            </v-tab-item>
                            <!--income-->
                            <v-tab-item value="income">
                                <v-card-actions>
                                    <v-container>
                                        <v-layout wrap
                                                  class="icons_container" 
                                                  align-center>
                                            <v-layout v-for="(item, i) in tabIcons['income']"
                                                    :key="i"
                                                    align-center
                                                    column
                                                    ma-1>
                                                <v-btn fab 
                                                       :color="categoriesBtnColor"
                                                       @click="selectCategories(item, i)">
                                                    <v-icon :color="iconsColor.income[i]">{{ $vuetify.icons[item] }}</v-icon>
                                                </v-btn>
                                                {{tabIcons.income[i]}}
                                            </v-layout>
                                        </v-layout>
                                    </v-container>
                                </v-card-actions>
                            </v-tab-item>
                            </v-tabs-items>
                        </v-tabs>
                    </v-flex>
                    <!--text fields-->
                    <v-flex>
                        <v-layout align-center 
                                  justify-center 
                                  column>
                            <v-text-field :append-icon="$vuetify.icons[categoryName]"
                                          v-model="comment"
                                          label="Comment"
                                          counter
                                          maxlength="20"
                            ></v-text-field>
                    
                            <v-text-field append-icon="$vuetify.icons.coins"
                                          label="Amount"
                                          v-model="amount"
                                          :error="amountError"
                                          :error-messages="amountMessage"
                            ></v-text-field>

                            <v-text-field append-icon="date_range"
                                          :value="date || new Date().toISOString().substring(0, 10)"
                                          @click="showDataPickerDialog"
                                          readonly
                                          
                            ></v-text-field>
                        </v-layout>

                        <v-layout row >
                            <v-flex xs12>
                                <v-layout align-center justify-center>
                                    <v-btn color="success"
                                           @click="checkAmount"
                                           :loading="loading">
                                        <v-icon>done</v-icon>
                                    </v-btn>
                                    <v-btn color="error"
                                           @click="closeDialog"
                                           :disabled="loading">
                                        <v-icon>block</v-icon>
                                    </v-btn>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                  </v-card>
              </v-flex>
          </v-layout>
      </v-container>
      
    </v-dialog>
  </div>
</template>

<script>
import DataManager from '@/components/DataManager';
import DataPickerDialog from '@/components/main/DataPickerDialog.vue';
import {mapGetters} from 'vuex';
export default {
    name: "IncomeLossDialog",
    components: {
        DataPickerDialog,
    },
    data() {
        return {
            dataManager: null,
            tabType: "loss",
            categoryIndex: 0,
            categoryName: "food",
            comment: "",
            amount: "",
            amountError: false,
            amountMessage: "",
            loading: false,
            tabIcons: {
                'loss': ['food', 'medicine', 'transport',
                    'fun', 'shopping', 'other'],
                'income': ['work', 'peoples']
            },
        }
    },
    created() {
        this.dataManager = DataManager.newManager();
    },
    computed: {
        ...mapGetters([
            "isIncomeLossDialog",
            "incomeLossDialogColor",
            "categoriesBtnColor",
            "monthsName",
            "userCash",
            "iconsColor",
            "date",
        ]),
    },
    methods: {
        showDataPickerDialog() {
            this.$store.dispatch('showDataPickerDialog');
        },
        checkAmount() {
            var regex = /^(0|([1-9]\d*))(\.\d{1,2})?$/;
            var validValue = regex.test(this.amount);

            if ( !validValue ) {
                this.amountMessage = "Invalid value";
                this.amountError = true;
            } else {
                this.addLossIncomeData();
                this.amountError = false;
                this.amountMessage = "";
                this.comment = "";
                this.amount = "";
            }
        },
        addLossIncomeData() {
            this.loading = true;

            const lossIncome = {
                "c": this.comment || this.tabIcons[this.tabType][this.categoryIndex],
                "cd": this.date || new Date().toISOString().substring(0, 10),
                "a": this.amount,
                "i": this.categoryIndex,
                "t": this.tabType
            };
            this.updateMemberCash();
            this.dataManager.putNewData(lossIncome, this.userCash)
                .then(() => {
                    return this.$store.dispatch('getUserData');
                })
                .then(() => {
                    let userData = window.localStorage.getItem("userData");
                    return this.$store.dispatch("updateUserData", userData );
                }).then(() => {
                    this.closeDialog();
                    this.loading = false;
                }).catch( e => {
                    console.log(e);
                });
        },
        updateMemberCash() {
            let cash = this.userCash;

            switch(this.tabType) {
                case "loss":
                    this.$store.dispatch("updateUserCash", cash - +this.amount);
                    break;
                case "income":
                    this.$store.dispatch("updateUserCash", cash + +this.amount);
            }
        },
        closeDialog() {
            this.$store.dispatch("closeIncomeLossDialog");
            this.amountError = false;
        },
        selectCategories(name, index) {
            this.categoryName = name;
            this.categoryIndex = index;
        },
    },
}
</script>

<style scoped>
.icons_container {
    height: 140px;
}
</style>
