const state = {
    toolbar: "indigo darken-4",
    avatar: "#ecf0f1",
    drawerHead: "indigo darken-3",
    addBtn: "indigo darken-4",
    categoriesBtn: "white",
    incomeLossDialog: "#3D2860",
    cashListMenu: "#3D2860",
    statisticMenu: "#3D2860",
    activeTab: "#474FA0",
    iconsColor: {
        "loss": ["#ED4C67", "#16a085", "#2ecc71",
                "#833471", "#3498db", "#1B1464",],
        "income": [
                "#f39c12", "#FDA7DF", "#d35400",
                "#e74c3c", "#c0392b", "#7f8c8d",]
    },
    cashList: [
        ["#3675E7", "#9b59b6"],
        ["#9b59b6", "#3675E7"],
    ]
}

const mutations = {

}

const actions = {

}

const getters = {
    toolbarColor: state => state.toolbar,
    avatarColor: state => state.avatar,
    drawerHeadColor: state => state.drawerHead,
    addBtnColor: state => state.addBtn,
    categoriesBtnColor: state => state.categoriesBtn,
    incomeLossDialogColor: state => state.incomeLossDialog,
    cashListColors : state => state.cashList,
    cashListMenuColor: state => state.cashListMenu,
    statisticMenuColor: state => state.statisticMenu,
    activeTabColor: state => state.activeTab,
    iconsColor: state => state.iconsColor,
}

const colorsModule = {
    state,
    mutations,
    actions,
    getters
}

export default colorsModule;