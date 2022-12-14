import express from 'express';
import productsController from '../../controllers/products.controller/products.controller';
import requireAuth from '../../middlewares/auth';

const router = express.Router();

router.route('/').get(productsController.getProduct)
  .post(requireAuth, productsController.validateProduct(), productsController.product)
  .delete(requireAuth, productsController.delProduct);

router.route('/visit').post(productsController.addVisit);
router.route('/filter').post(requireAuth, productsController.filtredProducts);
router.route('/generateBarcode').post(requireAuth, productsController.generateBarcodeProducts);
router.route('/getBarcode').get(requireAuth, productsController.getBarcodeProducts);
router.route('/scanBarcode').get(requireAuth, productsController.scanBarcodeProducts);
router.route('/hide').post(requireAuth, productsController.hideProduct);

export default router;
