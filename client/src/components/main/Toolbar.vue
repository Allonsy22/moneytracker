<template>
    <nav>
        <v-toolbar app 
                    :color="toolbarColor"
                    extended
                    scroll-off-screen>
            <v-toolbar-side-icon @click="drawer = !drawer" 
                                 class="white--text"></v-toolbar-side-icon>
            <v-toolbar-title class="white--text">Money Tracker</v-toolbar-title>
            <v-spacer></v-spacer>
            <template v-slot:extension>
                    <Menu />
                </template>
            <v-toolbar-items>
                <v-layout align-center class="white--text title">
                        {{userCash}}
                        <v-icon color="white" size="20">$vuetify.icons.coins</v-icon>
                </v-layout>
            </v-toolbar-items>
        </v-toolbar>

        <v-navigation-drawer app
                            v-model="drawer"
                            disable-resize-watcher>
            <NavigationDrawer />
        </v-navigation-drawer>
    </nav>
</template>

<script>
import NavigationDrawer from '@/components/main/NavigationDrawer';
import Menu from '@/components/main/Menu';
import {mapGetters} from 'vuex';

export default {
    name: "Toolbar",
    components: {
        NavigationDrawer,
        Menu
    },
    data() {
        return {
            drawer: false
        }
    },
    computed: {
        ...mapGetters([
            "toolbarColor",
            "userCash"
        ])
    },
    
}
</script>
