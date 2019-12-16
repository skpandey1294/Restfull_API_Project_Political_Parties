const express = require('express');

const cmRouter = require('./cmRouter');

const ctrl = require('../controller/partyController');

const auth = require('./varifyToken');

const { authRouter } = require('./auth');

const partyRouter = express.Router();

partyRouter.use('/reg', authRouter);

partyRouter.use(express.json());

partyRouter.use('/cm', cmRouter);

partyRouter.get('/allparties', ctrl.getAllParties);

partyRouter.get('/president/:name', ctrl.getPartyByPresidentName);

partyRouter.post('/addnewparty', auth, ctrl.addParty);

partyRouter.put('/update', auth, ctrl.updatePresident);

partyRouter.delete('/del', auth, ctrl.deleteParty);

module.exports = partyRouter;
