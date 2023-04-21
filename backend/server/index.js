/* const usersRouter = require('../routes/users.routes');


function apiRouter(app) {
  
  app.use('/products',usersRouter);
}

module.exports = apiRouter; */


const usersRouter = require('../routes/users.routes');

function apiRouter(app) {
  app.use('/users', usersRouter);
}

module.exports = apiRouter;