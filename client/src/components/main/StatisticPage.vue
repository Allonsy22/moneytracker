<template>
    <v-content v-if="monthsName">
        <v-flex v-if="!totalLossIncomeData.length"
                class="no-data" >No data yet</v-flex>

        <v-tabs v-model="activeTab"
                v-else
                :color="statisticMenuColor"
                dark
                slider-color="yellow"
                centered>
            <v-tab v-for="(month, i) in monthsName"
             :key="i"
             ripple
            >
                {{month}}

            </v-tab>  
            <v-tab-item v-for="(item, index) in monthLength"
                        :key="index">
                <v-layout column align-center>
                    <v-flex v-if="totalLossData[index].length">
                        <div class="title">Loss</div>
                        <apexchart width="320" 
                                    type="donut" 
                                    :options="options(index, 'loss')"
                                    :series="series(index, 'loss')">
                        </apexchart>
                    </v-flex>
                    <v-flex v-if="totalIncomeData[index].length">
                        <div class="title">Income</div>
                        <apexchart  width="320" 
                                    type="donut"
                                    :options="options(index, 'income')"
                                    :series="series(index, 'income')">
                        </apexchart>
                    </v-flex>
                </v-layout>
            </v-tab-item>
        </v-tabs>
        
    </v-content>
</template>

<script>
import ApexCharts from 'apexcharts'; 
import {mapGetters} from 'vuex';

export default {
    name: "StatisticPage",
    components: {
        ApexCharts
    },
    data() {
        return {
            activeTab: 0,
            categoriesName: {
                'loss': ['food', 'medicine', 'transport', 
                        'fun', 'shopping', 'other'],
                'income': ['work', 'peoples'],
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
            "statisticMenuColor",
            "totalLossIncomeData",
            "monthsName",
            "incomeCategories",
            "lossCategories",
            "totalLossData",
            "totalIncomeData"
        ]),   
        monthLength() {
            return this.monthsName.length;
        }
    },
    methods: {
        options(index, type) {
            return this.chartOptions("labels", index, type);
        },
        series(index, type) {
            return this.chartOptions("series", index, type);
        },
        chartOptions(option, index, type) {
            let categoriesInfo = {};
            let labels = [];
            let series = [];
            let lossArr = this.categoriesName.loss;
            let incomeArr = this.categoriesName.income;

            if ( type == "loss" ) {
                this.totalLossData[index].forEach( x => {
                    if ( categoriesInfo[lossArr[x.i]] ) {
                        categoriesInfo[lossArr[x.i]] += +x.a;
                    } else {
                        categoriesInfo[lossArr[x.i]] = +x.a;
                    }
                });
            } else {
                this.totalIncomeData[index].forEach( x => {
                    if ( categoriesInfo[incomeArr[x.i]] ) {
                        categoriesInfo[incomeArr[x.i]] += +x.a;;
                    } else {
                        categoriesInfo[incomeArr[x.i]] = +x.a;
                    }
                });
            }
            
            if ( option == "labels" ) {
                for ( var key in categoriesInfo ) {
                    labels.push(key);
                }
                return {
                        plotOptions: {
                            pie: {
                                size: 100,
                            donut: {
                                size: '50%',                      
                            }
                        },
                    },
                    labels: labels
                };
            } else {
                for ( var key in categoriesInfo ) {
                    series.push( categoriesInfo[key] );
                }
                return series;
            }
        },
    },
    
}
</script>

<style scoped>
.no-data {
    font-size: 22px;
    text-align: center;
}

.title {
   text-align: center;
}
</style>
