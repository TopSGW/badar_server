import express from 'express';
import orderController from '../../controllers/order.controller/order.controller';
import requireAuth from '../../middlewares/auth';

const router = express.Router();

router.route('/refreshToken')
  .get(orderController.getAccessToken);

router.route('/initiateSession')
  .get(orderController.initiateSession);

router.route('/executePayment')
  .post(orderController.executePayment);

router.route('/invoice')
  .post(orderController.getInvoice);

// router.route('/getPaymentStatus')
//   .post(orderController.getPaymentStatus);

router.route('/createPickupLocation')
  .post(orderController.createPickupLocation);

router.route('/createOrder')
  .post(orderController.createOrder);

router.route('/getOrders')
  .post(orderController.getOrders);

router.route('/updateOrders')
  .post(orderController.updateOrders);

router.route('/delOrders')
  .delete(orderController.delOrders);

router.route('/')
  .get(orderController.getOrderList)
  .post(requireAuth, orderController.addorder)

export default router;
