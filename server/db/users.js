const Joi = require('joi');
const db = require('./connection');

const users = db.get('users');

const schema = Joi.object().keys({
    name: Joi.string().required(),
    cash: Joi.number().required(),
    email: Joi.string(),
    image: Joi.string(),
});

function getAll() {
    return users.find();
}

function getUser(email) {
    return users.findOne({"email": email});
}

function createGuest( user ) {
    if ( !user.name ) user.name = "Guest";
    if ( !user.cash ) user.cash = "3000";

    const result = Joi.validate( user, schema );

    if ( result.error == null ) {
        let userInfo = createUserPattern(user);
        return users.insert(userInfo);
    } else {
        return Promise.reject( result.error );
    }
}

function createLoggedUser( user ) {
    user.cash = "3000";

    let userInfo = createUserPattern(user);
    userInfo.email = user.email;
    return users.insert(userInfo);
}

function updateUserData(data) {
    return users.update({"_id": data["_id"]}, data);
}

function deleteUser() {
    return users.remove({});
}

function createUserPattern(user) {
    let monthName = ["January", "February", "March", "April",
    "May", "June", "July", "August", "September",
    "October", "November", "December"];
    let date = new Date();
    let year = date.getFullYear();
    let month = monthName[date.getMonth()];

    return {
        user: {
            name: user.name,
            email: user.email,
            image: user.image,
            cash: user.cash,
            data: {
                years: {
                    [year]: [
                        { 
                            "month": month,
                            "data": [],
                        }
                    ] 
                }
            }
        },
    }
}

module.exports = {
    getAll,
    getUser,
    createGuest,
    createLoggedUser,
    deleteUser,
    updateUserData
}