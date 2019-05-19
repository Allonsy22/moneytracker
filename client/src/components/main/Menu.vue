<template>
        <v-layout justify-center
                row
                wrap>
            <v-btn v-for="(item, i) in links"
                    :key="i"
                    color="white"
                    :style="activeTabStyle(item.link)"
                    @click="changeActiveTab(item.link)"
                    flat
                    round
                    :to="item.link">
                    {{item.name}}
                    <v-icon size="30">{{$vuetify.icons[item.icon]}}</v-icon>
            </v-btn>
    </v-layout>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name: "Menu",
    data() {
        return {
            links: [
                {link: "/cash", icon: "list", name: "list"},
                {link: "/statistic", icon: "pieChart", name: "charts"}
            ],
            active: '/cash',
        }
    },
    computed: {
        ...mapGetters([
            'activeTabColor',
        ]),
        activeTabStyle() {
            return (link) => {
                if ( this.active == link ) {
                    return `background-color: ${this.activeTabColor};`
                }
            }
        },
    },
    methods: {
        changeActiveTab(link) {
            this.active = link;
        }
    }, 
}
</script>

<style scoped>
.v-btn {
    min-width: 0;
    width: 90px;
}
</style>
