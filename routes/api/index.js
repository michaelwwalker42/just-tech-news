const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
// Now all of the routes defined in comment-routes.js
// will have a /comments prefix.
// This is how you can easily scale APIs;
// just add a new endpoint!
router.use('/comments', commentRoutes);

module.exports = router;