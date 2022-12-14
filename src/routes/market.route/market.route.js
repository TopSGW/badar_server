import express from 'express';
import marketController from '../../controllers/market.controller/market.controller';
import requireAuth from '../../middlewares/auth';

const router = express.Router();

router.route('/category')
  .get(requireAuth, marketController.getCategory)
  .post(requireAuth, marketController.validateCategory(), marketController.category)
  .delete(requireAuth, marketController.delCategory);

router.route('/offer')
  .get(requireAuth, marketController.getOffer)
  .post(requireAuth, marketController.validateOffer(), marketController.offer)
  .delete(requireAuth, marketController.delOffer);

router.route('/coupon')
  .get(requireAuth, marketController.getCoupon)
  .post(requireAuth, marketController.validateCoupon(), marketController.coupon)
  .delete(marketController.delCoupon);

router.route('/confirmDiscount')
  .get(marketController.confirmDiscount);

export default router;
