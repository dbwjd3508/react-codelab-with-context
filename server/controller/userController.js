const express = require('express');
const util = require('util');
const uuidv4 = require('uuid/v4');
const moment = require('moment-timezone');
const _ = require('lodash');
const router = express.Router();
const mongoose = require('mongoose');

const {getValue, setValue, delKey} = require('../modules/redisModule');
const {userModel} = require('../model');
const resultCode = require('../utils/resultCode');
const { respondJson, respondOnError } = require('../utils/respond');

const controllerName = 'User';

router.use((req, res, next) => {
    console.log(util.format('[Logger]::[Controller]::[%sController]::[Access Ip %s]::[Access Time %s]',
                              controllerName,
                              req.ip,
                              moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')
                          ));
    next();
});

router.post('/createUser', (req, res) => {
    try {
        const data = {
            name: req.query.name || req.body.name,
            phone: req.query.phone || req.body.phone,
            email: req.query.email || req.body.email,
            token: uuidv4()
        };
    
        go(data,
           v => userModel.create(v).catch(e => {throw e}),
           //insertToRedis => setValue(insertToRedis.token, insertToRedis._id),
           //insertKey => getValue(insertKey),
           insertResult => respondJson(res, resultCode.success, insertResult)
        );
    }
    catch (e) {
        respondOnError(res, resultCode.error, e.message);
    }
    
});

router.post('/logout', async (req, res) => {
    try {
        const { session } = await go(
            req.headers['auth-token'],
            getValue
        );

        if (!session) throw 0;

        go(_ => delKey(req.headers['auth-token']),
           _ => respondJson(res, resultCode.success, {code: "success"})
        );
    }
    catch(e) {
        respondOnError(res, resultCode.error, e.message);
    }
});

router.post('/listUser', (req, res) => {
    try {
        const options = {
            attributes: {_id: false, token:false}
        };

        go(options, 
            v => userModel.findAll(v).catch(e => {throw e}),
            //readResult => res.json(JSON.parse(readResult)),
            readResult => respondJson(res, resultCode.success, readResult)
        );
    }
    catch (e) {
        respondOnError(res, resultCode.error, e.message);
    }
    
});

router.post('/findUser', (req, res) => {
    try {
        const options = {
            where: {
                name: req.query.name || req.body.name,
                email: req.query.email || req.body.email
            }
        };
    
        go(options,
           v => userModel.findOne(v).catch(e => {throw e}),
           resultToken => {
                setValue(resultToken.token, resultToken._id);
                respondJson(res, resultCode.success, resultToken);
           }
        );
    }
    catch (e) {
        respondOnError(res, resultCode.error, e.message);
    }
});

router.post('/updateUser', async (req, res) => {
    try {
        const { session } = await go(
            req.headers['auth-token'],
            getValue
        );

        if (!session) throw 0;

        go(
            req.headers['auth-token'],
            getValue,
            jsonResult => jsonResult.session,
            thisId => {
                const id = mongoose.Types.ObjectId(thisId);
    
                return options = {
                    data: {
                        name: req.query.name || req.body.name,
                        phone: req.query.phone || req.body.phone,
                        email: req.query.email || req.body.email
                    },
                    where: {
                        _id: id
                    }
                };
            },
            v => userModel.update(v).catch(e => {throw e}),
            //updateResult => res.json(JSON.parse(updateResult))
            updateResult =>  respondJson(res, resultCode.success, updateResult)
        );
    }
    catch (e) {
        respondOnError(res, resultCode.error, e.message);
    }

    
});

router.post('/deleteUser', async (req, res) => {
    try {
        const { session } = await go(
            req.headers['auth-token'],
            getValue
        );

        if (!session) throw 0;

        go(
            req.headers['auth-token'],
            getValue,
            jsonResult => jsonResult.session,
            thisId => {
                const id = mongoose.Types.ObjectId(thisId);
                return options = {
                    _id: id
                };
            },
            v => userModel.delete(v).catch(e => { throw e }),
            // deleteResult => res.json(JSON.parse(deleteResult))
            deleteResult => {
                //delKey(req.headers['auth-token']);
                respondJson(res, resultCode.success, deleteResult)
            }
        );
    } catch (e) {
        respondOnError(res, resultCode.error, e.message);
    }
});

router.post('/clearUser', (req, res) => {
    try {
        go(_,
            _ => userModel.deleteAll().catch(e =>{throw e}),
            _ => res.send('done')
        );
    }
    catch (e) {
        respondOnError(res, resultCode.error, e.message);
    }
});

module.exports = router;