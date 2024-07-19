const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview, uploadCSV } = require('../controllers/productController');
const authenticate = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/images');
  },
  filename(req, file, cb) {
    cb(null, \`\${file.fieldname}-\${Date.now()}-\${file.originalname}\`);
  },
});
const upload = multer({ storage });

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authenticate, admin, upload.single('photo'), createProduct);
router.put('/:id', authenticate, admin, upload.single('photo'), updateProduct);
router.delete('/:id', authenticate, admin, deleteProduct);
router.post('/:id/reviews', authenticate, createProductReview);
router.post('/upload-csv', authenticate, admin, upload.single('file'), uploadCSV);

module.exports = router;
