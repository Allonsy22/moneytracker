const express = require('express');
const router = express.Router();

const users = require('../../db/users');

router.get('/', (req, res) => {
    users.getAll().then( result => {
        res.status(200).json( result );
    });
});

router.post('/', (req, res) => {
    if ( req.body.email ) {
        users.getUser(req.body.email).then( user => {
            if ( user ) {
                res.status(200).json( user );
            } else {
                users.createLoggedUser(req.body).then( user => {
                    res.status(200).json( user );
                }).catch( error => {
                    res.status(500).json( error );
                });
            }
        }).catch(error => {
            res.status(500).json( error );
        })
    } else {
        users.createGuest(req.body).then( user => {
            res.status(200).json( user );
        }).catch( error => {
            res.status(500).json( error );
        });
    }
});

router.delete('/', (req, res) => {
    users.deleteUser().then( result => {
        res.status(200).json( result );
    });
});

router.put('/logged', (req, res) => {
    users.getUser( req.body.email ).then( user => {
        if ( user ) {
            res.status(200).json(user);
        } else {
            users.updateUserData( req.body ).then( result => {
                res.status(200).json(result);
            });
        }
    }).catch( error => {
        res.status(500).json(error);
    });
});

router.put('/', (req, res) => {
    users.updateUserData(req.body).then( result => {
        res.status(200).json(result);
    }).catch( error => {
        res.status(500).json( error );
    });
});
module.exports = router;