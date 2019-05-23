// {
//     "_id": "45678",
//     "user": {
//             "name": "Alex",
//             "cash": 3200,
            // "data": {
//                 "years": {
//                     "2019": [
//                         {    
//                             "name": "April",
//                             "data": [
    //                         {
//                             "c": "adfa", //comment
//                             "cd": "7 May 2019", // created data
//                             "a": "32", // amount
//                             "i": "shopping", //icon
//                             "t": "0" // type 0-loss, 1-income
//                         }    
//                          ]                                                  
//                         }
//                     ]
//                 }
//             }
//         }
//     }
// }

class UserData {
    constructor() {
        this.monthName = ["January", "February", "March", "April",
        "May", "June", "July", "August", "September",
        "October", "November", "December"];
    }

    putNewData(newData, newCashValue) {
        return new Promise( (res, rej) => {
            let date = newData.cd;
            if ( date ) {
                this.getUserData().then( userData => {
                    userData.user.cash = newCashValue;
                    let isCurrYear = userData.user
                                            .data
                                            .years[this.getDate(date).year];
                    if ( typeof isCurrYear != "undefined" ) {
                        this.putDataInExistingYear(userData, newData);
                    } else {
                        this.putDataInNewYear(userData, newData);
                    }
                    res();
                }).catch( error => {
                    rej(error);
                });
            } else {
                rej("Date in user data doesn't exist");
            }
        });
    }

    removeData(data, cash) {
        return new Promise( (res, rej) => {
            this.getUserData().then( userData => {
                try {
                    let date = data.cd;
                    let year = this.getDate(date).year;
                    //find month index, concrete data index considering current data structure
                    let monthIndex = userData.user
                                             .data
                                             .years[year]
                                             .findIndex( x => x.month == this.getDate(date).month);
                    let dataIndex = userData.user
                                            .data
                                            .years[year]
                                            [monthIndex]
                                            .data
                                            .findIndex( x => {
                                                // icon, comment, created date and type
                                                return x.t == data.t && 
                                                       x.cd == data.cd && 
                                                       x.c == data.c &&
                                                       x.i == data.i && 
                                                       x.a == data.a;
                                            });
                    // delete data
                    userData.user
                            .data
                            .years[year]
                            [monthIndex]
                            .data
                            .splice(dataIndex, 1);
                    
                    // delete month if there are no data
                    if ( userData.user.data.years[year]
                                [monthIndex]
                                .data
                                .length == 0 ) {
    
                                userData.user
                                        .data
                                        .years[year].splice(monthIndex, 1);
                            }

                    // update user cash
                    userData.user.cash = cash;
                    this.setDataToLocalStorage(userData);
                    res("Removed successfully");
                } catch(error) {
                    console.log(error);
                    rej(error);
                }
            }).catch(error => {
                console.log(error);
            });
        });
    }

    getUserData() {
        return new Promise( (res, rej) => {
            let userData = JSON.parse(localStorage.getItem("userData"));
            if ( !userData ) {
                rej("User data doesn't exist");
            } else {
                res(userData);
            }
        });
    }

    putDataInNewYear(userData, newData) {
        let date = newData.cd;
        userData.user
                .data
                .years[this.getDate(date).year] = [{
                    "month" : this.getDate(date).month,
                    "data": [newData],
                }]
        this.setDataToLocalStorage(userData);
    }

    putDataInExistingYear( userData, newData) {
        let date = newData.cd;
        let currMonth = userData.user
                                .data
                                .years[this.getDate(date).year]
                                .some(x => x.month == this.getDate(date).month);
        if ( !currMonth ) {
            this.putDataInNewMonth(userData, newData);
        } else {
            this.putDataInExistingMonth(userData, newData);
        }
    }

    putDataInNewMonth( userData, newData ) {
        let date = newData.cd;
        userData.user
                .data
                .years[this.getDate(date).year]
                .push({
                    "month": this.getDate(date).month,
                    "data": [newData],
                });
        this.setDataToLocalStorage(userData);
    }

    putDataInExistingMonth( userData, newData ) {
        let date = newData.cd;
        userData.user
                .data
                .years[this.getDate(date).year]
                .forEach(x => {
                    if ( x.month == this.getDate(date).month ) {
                        x.data.push(newData);
                        return;
                    }
                });
        this.setDataToLocalStorage(userData);
    }

    setDataToLocalStorage(userData) {
        localStorage.setItem("userData", JSON.stringify(userData));
    }

    getDataInYear() {
        return new Promise( (res, rej) => {
            let currYear = new Date().getFullYear();
            let nextYear = currYear + 1;
            let arrOfYears = [];

            this.getUserData().then( userData => {
                let isCurrYear = userData.user.data.years[currYear];
                let isNextYear = userData.user.data.years[nextYear];
                
                if ( typeof isCurrYear != 'undefined' &&
                    typeof isNextYear != 'undefined' ) {
                        arrOfYears.push(isCurrYear);
                        arrOfYears.push(isNextYear);
                        res(arrOfYears[0].concat(arrOfYears[1]));
                } else if ( typeof isNextYear == 'undefined' &&
                            typeof isCurrYear != 'undefined' ) {
                     arrOfYears.push(isCurrYear);
                     res(arrOfYears);
                } else {
                    rej("Data doesn't exist");
                }
                
            }).catch( error => {
                rej(error);
            });
        });
    }

    getDate(value) {
        let date = new Date(value),
            year = date.getFullYear(),
            month = this.monthName[date.getMonth()],
            day = date.getDate();

        return {
            "year": year,
            "month": month,
            "day": day
        }
    }

    getUser(data) {
        return data["user"];
    }

    getUserCash(data) {
        return data["user"]["cash"];
    }
    
    getMonthName(data) {
        return data["user"]["data"]["years"]["2019"].map(x => x.month);
    }

    getLossIncomeData(data) {
        return data.user
                    .data
                    .years["2019"]
                    .map(x => {
                        return x.data.sort( (a, b) => {
                            return new Date(b.cd) - new Date(a.cd);
                        });
                    });
    }

    getTotalMonths(data) {
        return this.getMonthName(data).length;
    }
}

let DataManager = (function() {
    let instance; 

    return {
        newManager: function() {
            if ( typeof instance == 'undefined' ) {
                instance = new UserData();
            }
            return instance;
        }
    }
})();

export default DataManager;
