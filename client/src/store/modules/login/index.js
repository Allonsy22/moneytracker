import axios from 'axios';
const API_URL = 'http://localhost:2222/';

const state = {
    isLoginDialog: false,
}

const mutations = {
    SHOW_LOGIN_DIALOG ( state ) {
        state.isLoginDialog = true;
    },
    CLOSE_LOGIN_DIALOG ( state ) {
        state.isLoginDialog = false;
    },
}

const actions = {
    showLoginDialog( {commit} ) {
        commit("SHOW_LOGIN_DIALOG");
    },
    closeLoginDialog( {commit} ) {
        commit("CLOSE_LOGIN_DIALOG");
    },
    googleLogin( {commit}, profile ) {
        return new Promise( (res, rej) => {

            let userData = JSON.parse(localStorage.getItem("userData"));
            if ( userData && userData["_id"] ) {
                let newData = JSON.parse(profile);
                userData.email = newData.email;
                userData.user.name = newData.name;
                userData.user.image = newData.image;
                localStorage.removeItem("userData");
                return axios.put(API_URL + "login/logged", userData)
                            .then( response => {
                                // if get existing user
                                if ( response.data.email ) {
                                    localStorage.setItem("userData", JSON.stringify(response.data));
                                } else {
                                    // if get updated curr user
                                    localStorage.setItem("userData", JSON.stringify(userData));
                                }
                                res();
                            }).catch(error => {
                                rej(error);
                            });
            } else if ( !userData || !userData["_id"] ) {
                return axios.post(API_URL + "login", JSON.parse(profile))
                            .then( response => {
                                console.log(response);
                                localStorage.setItem("userData", JSON.stringify(response.data));
                                res();
                            }).catch( error => {
                                rej(error);
                            });
            } else {
                rej("Something went wrong");
            }
        });
    },
}

const getters = {
    isLoginDialog: state => state.isLoginDialog,
}

const loginModule = {
    state,
    mutations,
    actions,
    getters
}

export default loginModule;