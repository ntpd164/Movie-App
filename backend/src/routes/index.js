const usersRouter = require('./users');
const watchlistRouter = require('./watchlist');

function route(app) {
  app.use('/users', usersRouter);
  app.use('/watchlist', watchlistRouter);

  // app.post("/search", (req, res) => {
  //     console.log(req.body);
  //     res.render("search");
  // });
}

module.exports = route;
