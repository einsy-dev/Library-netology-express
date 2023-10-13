const bookController = require('../controllers/bookController');
const multer = require('multer')
const upload = multer()

const router = require('express').Router();

router.get('/', bookController.getAll);
router.get('/:id', bookController.getById);
router.get('/:id/download', bookController.download)
router.post('/', upload.array('fileBook'), bookController.create);
router.put('/:id', bookController.update);
router.delete('/:id', bookController.delete);

module.exports = router;