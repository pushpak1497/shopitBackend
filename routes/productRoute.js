import { Router } from "express";
import {
  getProducts,
  newProduct,
  getSingleProductDetails,
  updateProductDetails,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  canUserReview,
  getAdminProducts,
  uploadProductImages,
  deleteProductImage,
} from "../controllers/productController.js";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";
const router = Router();

router.route("/products").get(getProducts);
router
  .route("/admin/products")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);
router.route("/products/:productId").get(getSingleProductDetails);
router
  .route("/admin/products/:productId")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProductDetails);
router
  .route("/admin/products/:id/upload_images")
  .put(isAuthenticatedUser, authorizeRoles("admin"), uploadProductImages);
router
  .route("/admin/products/:id/delete_image")
  .put(isAuthenticatedUser, authorizeRoles("admin"), deleteProductImage);
router
  .route("/admin/products/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router
  .route("/admin/products/")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
router.route("/reviews").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(isAuthenticatedUser, getProductReviews);
router
  .route("/admin/reviews")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview);
router.route("/can_review").get(isAuthenticatedUser, canUserReview);
export default router;
