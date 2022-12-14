const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

const postCtrl = require('../controllers/postController');

router.get('/', auth, postCtrl.getAllPost);
router.post('/create', auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.post('/:id/like/:likes', auth, postCtrl.likes)

module.exports = router;