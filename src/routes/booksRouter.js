const bookController = require('../controllers/bookController');

const router = require('express').Router();

router.get('/', bookController.getAll);
router.get('/:id', bookController.getById);
router.post('/', bookController.create);
router.put('/:id', bookController.update);
router.delete('/:id', bookController.delete);

module.exports = router;