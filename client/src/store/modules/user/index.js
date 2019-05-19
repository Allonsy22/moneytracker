import axios from 'axios';
import DataManager from '@/components/DataManager';
const API_URL = 'http://localhost:2222/';

const state = {
    isIncomeLossDialog: false,
    isDataPickerDialog: false,
    isDeleteDialog: false,
    user: null,
    monthsName: [],
    totalLossIncomeData: [],
    userCash: 0,
    date: null,
    deletedItem: null,
    login: false,
}

const mutations = {
    SHOW_DIALOG( state, payload ) {
        state.isIncomeLossDialog = true;
    },
    CLOSE_DIALOG( state, payload ) {
        state.isIncomeLossDialog = false;
    },
    SHOW_DATAPICKER_DIALOG( state, payload ) {
        state.isDataPickerDialog = true;
    },
    CLOSE_DATAPICKER_DIALOG( state, payload ) {
        state.isDataPickerDialog = false;
    },
    SHOW_DELETE_DIALOG( state, payload ) {
        state.isDeleteDialog = true;
    },
    CLOSE_DELETE_DIALOG( state, payload ) {
        state.isDeleteDialog = false;
    },
    SET_DATE( state, payload ) {
        state.date = payload;
    },
    GET_USER_DATA( state, payload ) {
        state.user = payload;
    },
    UPDATE_USER_CASH( state, payload ) {
        state.userCash = payload;
    },
    GET_LOSS_INCOME_DATA( state, payload ) {
        state.totalLossIncomeData = payload;
    },
    GET_MONTHS_NAME( state, payload ) {
        state.monthsName = payload;
    },
    SET_DELETED_ITEM( state, payload ) {
        state.deletedItem = payload;
    },
    SET_LOGIN(state, payload ) {
        state.login = payload;
    },
    DELETE_USER( state, payload ) {
        state.member = payload;
    }
}

const actions = {
    showIncomeLossDialog( {commit} ) {
        commit("SHOW_DIALOG");
    },
    closeIncomeLossDialog( {commit} ) {
        commit("CLOSE_DIALOG");
    },
    showDataPickerDialog( {commit} ) {
        commit("SHOW_DATAPICKER_DIALOG");
    },
    closeDataPickerDialog( {commit} ) {
        commit("CLOSE_DATAPICKER_DIALOG");
    },
    showDeleteDialog( {commit} ) {
        commit("SHOW_DELETE_DIALOG");
    },
    closeDeleteDialog( {commit} ) {
        commit("CLOSE_DELETE_DIALOG");
    },
    setDate( {commit}, date ) {
        commit("SET_DATE", date);
    },
    getUserData( {commit}, obj ) {
        let dataManager = DataManager.newManager();
        let data = JSON.parse(localStorage.getItem("userData"));
        if ( data ) {
            return new Promise( (res, rej) => {
                try {
                    commit("GET_USER_DATA", dataManager.getUser(data) );
                    commit("GET_LOSS_INCOME_DATA", dataManager.getLossIncomeData(data) );
                    commit("GET_MONTHS_NAME", dataManager.getMonthName(data) );
                    commit("UPDATE_USER_CASH", dataManager.getUserCash(data) );
                    
                    if ( data.email ) {
                        commit("SET_LOGIN", true);
                    } else {
                        commit("SET_LOGIN", false);
                    }

                    res();
                } catch(e) {
                    rej(e);
                };
            });
        } else {
            return axios.post(API_URL + 'login', JSON.parse(obj)).then(res => {
                commit("GET_USER_DATA", dataManager.getUser(res.data) );
                commit("GET_LOSS_INCOME_DATA", dataManager.getLossIncomeData(res.data) );
                commit("GET_MONTHS_NAME", dataManager.getMonthName(res.data) );
                commit("UPDATE_USER_CASH", dataManager.getUserCash(res.data) );
                localStorage.setItem("userData", JSON.stringify(res.data));

                if ( res.data.email ) {
                    commit("SET_LOGIN", true);
                } else {
                    commit("SET_LOGIN", false);
                }
            });
        }
    },
    updateUserData( {commit}, data ) {
        return axios.put(API_URL + 'login', JSON.parse(data));
    },
    updateUserCash( {commit}, cash ) {
        commit("UPDATE_USER_CASH", cash);
    },
    setDeletedItem( {commit}, item ) {
        commit("SET_DELETED_ITEM", item); 
    },
    deleteUser( {commit}, id ) {
        let obj = {
            "_id": id
        }
        return axios.delete(API_URL + 'login', obj);
    }
}

const getters = {
    isIncomeLossDialog: state => state.isIncomeLossDialog,
    isDataPickerDialog: state => state.isDataPickerDialog,
    isDeleteDialog: state => state.isDeleteDialog,
    isEditDialog: state => state.isEditDialog,
    userName: state => state.user["name"],
    userImage: state => state.user["image"],
    userCash: state => state.userCash,
    monthsName: state => state.monthsName,
    totalLossIncomeData: state => state.totalLossIncomeData,
    totalLossData: state => state.totalLossIncomeData.map( x => {
        return x.filter( y => y["t"] == "loss" );
    }),
    totalIncomeData: state => state.totalLossIncomeData.map( x => {
        return x.filter( y => y["t"] == "income" );
    }),
    date: state => state.date,
    deletedItem: state => state.deletedItem,
    isLogin: state => state.login,
}

const cashModule = {
    state,
    mutations,
    actions,
    getters
}

export default cashModule;