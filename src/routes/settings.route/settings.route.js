import express from 'express';
import settingsController from '../../controllers/settings.controller/settings.controller';
import requireAuth from '../../middlewares/auth';

const router = express.Router();

router.route('/sys_info')
  .get(requireAuth, settingsController.getSystemInfo)
  .post(requireAuth, settingsController.validateSystemInfo(), settingsController.updateSystemInfo);

router.route('/items_group')
  .get(settingsController.getItemGroup)
  .post(requireAuth, settingsController.validateItemGroup(), settingsController.itemGroup)
  .delete(requireAuth, settingsController.delItemGroup);

router.route('/items_category')
  .get(settingsController.getItemCategory)
  .post(requireAuth, settingsController.validateItemCategory(), settingsController.itemCategory)
  .delete(requireAuth, settingsController.delItemCategory);

router.route('/items_size')
  .get(settingsController.getItemSize)
  .post(requireAuth, settingsController.itemSize)
  .delete(requireAuth, settingsController.delItemSize);

router.route('/shipping')
  .get(settingsController.getShipping)
  .post(requireAuth, settingsController.setShipping)
  .delete(requireAuth, settingsController.delShipping);

router.route('/units')
  .get(requireAuth, settingsController.getUnits)
  .post(requireAuth, settingsController.validateUnits(), settingsController.units)
  .delete(requireAuth, settingsController.delUnits);

router.route('/purity')
  .get(settingsController.getPurity)
  .post(requireAuth, settingsController.validatePurity(), settingsController.purity)
  .delete(requireAuth, settingsController.delPurity);

router.route('/pm')
  .get(requireAuth, settingsController.getPM)
  .post(requireAuth, settingsController.validatePM(), settingsController.pm)
  .delete(requireAuth, settingsController.delPM);

router.route('/order_status')
  .get(requireAuth, settingsController.getOrderStatus)
  .post(requireAuth, settingsController.validateOrderStatus(), settingsController.orderStatus)
  .delete(requireAuth, settingsController.delOrderStatus);

router.route('/complaints')
  .get(settingsController.getComplaints)
  .post(requireAuth, settingsController.setComplaints)
  .delete(requireAuth, settingsController.delComplaints);

router.route('/cart')
  .get(settingsController.getCart)
  .post(settingsController.setCart);

router.route('/delCart')
  .post(settingsController.delCart);

router.route('/favorite')
  .get(settingsController.getFavorite)
  .post(settingsController.setFavorite);

router.route('/delFavorite')
  .post(settingsController.delFavorite);

router.route('/sendanswer').post(requireAuth, settingsController.sendAnswer);

router.route('/encodeCart').post(settingsController.encodeCart);
router.route('/decodeCart').post(settingsController.decodeCart);

export default router;
