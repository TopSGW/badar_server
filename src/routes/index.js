import express from 'express';
import settingsRoute from './settings.route/settings.route';
import userRoute from './user.route/user.route';
import marketRoute from './market.route/market.route';
import sellerRoute from './seller.route/seller.route';
import productsRoute from './products.route/products.route';
import shopRoute from './shop.route/shop.route';
import customerRoute from './customer.route/customer.route';
import orderRoute from './order.route/order.route';

const router = express.Router();

router.use('/',userRoute);
router.use('/settings',settingsRoute);
router.use('/market',marketRoute);
router.use('/seller',sellerRoute);
router.use('/product',productsRoute);
router.use('/shop',shopRoute);
router.use('/customer',customerRoute);
router.use('/order',orderRoute);


export default router;
