const express = require('express');

const logger = require('./middleware/logging');

const errorHandler = require('./middleware/errorHandler');

const app = express();

const partyRoute = require('../src/routes/political_partiesRoute');

require('./routes/clientpkg').connect();

app.use('/api', partyRoute, errorHandler);

app.use('*', (req, res) => res.status(404).send('Invalid URL'));

app.use(logger.log);

app.use(logger.error);

const port = process.env.PORT || 3003;

app.listen(port, () => console.log(`Listening on port ${port}`));
