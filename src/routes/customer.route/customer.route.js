import express from 'express';
import customerController from '../../controllers/customer.controller/customer.controller';
import requireAuth from '../../middlewares/auth';

const router = express.Router();

router.route('/')
  .get(requireAuth, customerController.getCustomers)
  .post(requireAuth, customerController.validate(), customerController.create)
  .delete(requireAuth, customerController.delete);

export default router;
