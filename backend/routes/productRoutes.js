import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
  getFeaturedProducts,
  uploadProductImages,
  getSellerProducts
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, createProduct);
router.get('/my-products', protect, getSellerProducts);
router.get('/top', getTopProducts);
router.get('/featured', getFeaturedProducts);
router
  .route('/:id')
  .get(getProductById)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);
router.route('/:id/reviews').post(protect, createProductReview);
router
  .route('/:id/images')
  .post(protect, admin, upload.array('images', 5), uploadProductImages);

export default router;
