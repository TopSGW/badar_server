import express from 'express';
import shopController from '../../controllers/shop.controller/shop.controller';
import requireAuth from '../../middlewares/auth';

const router = express.Router();

router.route('/').get(requireAuth, shopController.getShops)
  .post(requireAuth, shopController.validateShop(), shopController.shop)
  .delete(requireAuth, shopController.delShop);

export default router;
