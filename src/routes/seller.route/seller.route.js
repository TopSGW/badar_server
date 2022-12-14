import express from 'express';
import sellerController from '../../controllers/seller.controller/seller.controller';
import requireAuth from '../../middlewares/auth';

const router = express.Router();

router.route('/').get(requireAuth, sellerController.getSeller)
  .post(requireAuth, sellerController.validateSeller(), sellerController.seller)
  .delete(requireAuth, sellerController.delSeller);

export default router;
