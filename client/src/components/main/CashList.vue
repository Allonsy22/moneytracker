<template>
    <v-content v-if="monthsName">
        <DeleteDialog />

        <v-flex v-if="!totalLossIncomeData.length"
                class="no-data" >No data yet</v-flex>

        <v-tabs v-model="activeTab"
                v-else
                :color="cashListMenuColor"
                dark
                slider-color="yellow"
                centered>
            <v-tab v-for="(name, i) in monthsName"
             :key="i"
             ripple
            >
                {{name}}

            </v-tab>  
            <v-tab-item v-for="(item, index) in monthsLength"
                        :key="index">
                <v-layout column
                          v-for="(month, monthIndex) in dataByDate()[index]"
                          :key="monthIndex">

                            <span class="date">{{monthIndex}}</span>

                    <v-container mb-3
                                v-for="(item, i) in month"
                                :key="i"
                                class="container"
                                :style="backgroundColor(i)">
                        <v-layout row>
                            <v-layout>
                                <div class="icon-container">
                                    <v-icon :color="iconsColor[item.t][item.i]"
                                            size="30">
                                        {{$vuetify.icons[icons(item.t, item.i)]}}
                                    </v-icon>
                                </div>
                                <div class="title white--text">{{item.c}}</div>
                                <div class="delete">
                                    <v-btn @click="deleteInfo(item)"
                                            flat>
                                        <v-icon color="#2c3e50"
                                                size="25">close</v-icon>
                                    </v-btn>
                                </div>
                                <div class="cash">
                                    {{ cashAmount(item.t, item.a)}}
                                    <v-icon class="mr-2" 
                                            color="white" 
                                            size="20">
                                        $vuetify.icons.coins
                                    </v-icon>
                                </div>
                            </v-layout>
                        </v-layout>
                    </v-container>
                </v-layout>
            </v-tab-item>
        </v-tabs>
    </v-content>
</template>

<script>
import {mapGetters} from 'vuex';
import DeleteDialog from '@/components/main/DeleteDialog.vue';

export default {
    name: "CashList",
    components: {
        DeleteDialog,
    },
    data() {
        return {
            activeTab: 0,
            tabIcons: {
                'loss': ['food', 'medicine', 'transport',
                    'fun', 'shopping', 'other'],
                'income': ['work', 'peoples']
            }
        }
    },
    created() {
        let userData = localStorage.getItem("userData");

        if ( !userData ) {
            this.$router.push({path: '/login'});
        }
    },
    mounted() {
        this.activeTab = this.monthsName.length - 1;
    },
    computed: {
        ...mapGetters([
            "cashListColors",
            "cashListMenuColor",
            "monthsName",
            "totalLossIncomeData",
            "iconsColor",
        ]),
        monthsLength() {
            return this.monthsName.length;
        }
    },
    methods: {
        dataByDate() {
            return this.totalLossIncomeData.map( month => {
                let monthData = {};
                month.forEach( item => {
                    if ( monthData[item.cd] ) {
                        monthData[item.cd].push(item);
                    } else {
                        monthData[item.cd] = [item];
                    }
                });

                return monthData;
            });
        },
        cashAmount(type, amount) {
            switch(type) {
                case "loss":
                    return `- ${amount}`;
                case "income":
                    return `+ ${amount}`;
            }
        },
        deleteInfo(item) {
            this.$store.dispatch('showDeleteDialog');
            this.$store.dispatch('setDeletedItem', item);
        },
        icons(type, index) {
            return this.tabIcons[type][index];
        },
        backgroundColor(index) {
            let colors = this.cashListColors;
            let len = colors.length;
            let color = colors[ index % len ].join(",");
            return `background: linear-gradient(45deg, ${color})`;
        },

    },

}
</script>

<style scoped>
.date {
    font-size: 18px;
    text-align: center;
    margin: 0;
}

.no-data {
    font-size: 22px;
    text-align: center;
}

.container {
    position: relative;
    width: 90%;
    border-radius: 10px;
}

.icon-container {
    background-color: #ffffff;
    text-align: center;
    padding-top: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.cash {
    position: absolute;
    right: 0;
    bottom: 0;
    color: #ffffff;
    font-size: 18px;
}

.v-btn {
  min-width: 0;
  padding: 0;
}

.delete {
    position: absolute;
    right: 0;
    top: 0;
}

</style>
