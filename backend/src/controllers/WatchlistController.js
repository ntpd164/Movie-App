const User = require('../models/User');

class WatchlistController {
  async add(req, res, next) {
    try {
      const userId = req.user.id;
      const {
        imdbID,
        title,
        year,
        poster,
        director,
        actors,
        plot,
        imdbRating,
        imdbVotes,
        runtime,
        userRating,
      } = req.body;

      console.log('request body: ', req.body);

      if (
        !userId ||
        !imdbID ||
        !title ||
        !year ||
        !poster ||
        !director ||
        !actors ||
        !plot ||
        !imdbRating ||
        !imdbVotes ||
        !runtime ||
        !userRating
      ) {
        return res.status(400).json({
          status: 'fail',
          message: 'Missing required fields',
        });
      }

      // Thêm phim vào watchlist
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            watchlist: {
              imdbID,
              title,
              year,
              poster,
              director,
              actors,
              plot,
              imdbRating,
              imdbVotes,
              runtime,
              userRating,
            },
          },
        },
        { new: true }
      );

      res.status(200).json({
        status: 'success',
        data: updatedUser.watchlist,
      });
    } catch (err) {
      console.error('Error in /watchlist/add:', error);
      res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.user.id;
      const { imdbID } = req.body;

      console.log('request body: ', req.body);

      if (!imdbID) {
        return res.status(400).json({
          status: 'fail',
          message: 'Missing required fields',
        });
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $pull: {
            watchlist: { imdbID },
          },
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({
          status: 'fail',
          message: 'User not found',
        });
      }

      res.status(200).json({
        status: 'success',
        data: updatedUser.watchlist,
      });
    } catch (error) {
      console.error('Error in /watchlist/remove:', error);
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async get(req, res, next) {
    try {
      const userId = req.user.id;

      const user = await User.findById(userId);
      const watchlist = user.watchlist;

      res.status(200).json({
        status: 'success',
        data: {
          watchlist,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WatchlistController();
