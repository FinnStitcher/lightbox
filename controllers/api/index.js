const router = require('express').Router();

const postRoutes = require('./post-routes');
const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');

// /api
router.use('/posts', postRoutes);
router.use('/users', userRoutes);

module.exports = router;