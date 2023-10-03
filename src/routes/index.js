const router = require('express').Router();

router.use('/user', require('./userRouter'));
router.use('/books', require('./booksRouter'));

module.exports = router;