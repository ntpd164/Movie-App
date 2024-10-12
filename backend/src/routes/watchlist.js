const authMiddleware = require('../middleware/auth');
const express = require('express');
const router = express.Router();

const watchlistController = require('../controllers/WatchlistController');

router.post('/add', authMiddleware, watchlistController.add);
router.delete('/remove', authMiddleware, watchlistController.remove);
router.get('/get', authMiddleware, watchlistController.get);

module.exports = router;
