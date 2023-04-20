const usersRouter = require('../routes/users.routes');
const express = require('express');

function apiRouter(app) {
  const router = express.Router();

  app.use('/api', router);
  router.use('/', usersRouter);
}

module.exports = apiRouter;