const express = require('express');

const auth = require('./varifyToken');

const ctrl = require('../controller/cmController');

const cmRouter = express.Router();

cmRouter.use(express.json());

cmRouter.get('/getall', ctrl.getAllCMDetails);

cmRouter.get('/statecmby/:state', ctrl.getCMBystate);

cmRouter.post('/add', auth, ctrl.addNewStateAndCM);

cmRouter.put('/update_cm', auth, ctrl.updateCM);

cmRouter.delete('/deleteState/:state_name', auth, ctrl.deleteState);

module.exports = cmRouter;
