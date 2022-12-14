"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../../controllers/user.controller/user.controller"));

var _auth = _interopRequireDefault(require("../../middlewares/auth"));

// import { requireAuth } from '../../services/passport';
// import { multerSaveTo } from '../../services/multer-service';
// import { parseObject } from '../../controllers/shared.controller/shared.controller';
var router = _express["default"].Router(); //router.route('/activate-phone').put(requireAuth,userController.validateResendCode(),userController.sendActivateCode)
//router.route('/confirm-activate-phone').put(requireAuth,userController.validateVerifyPhone(),userController.confirmActivateCode)
//router.route('/addTrader')
//.post(multerSaveTo('users').fields([{ name: 'image', maxCount: 1 }, { name: 'commercialRecord', maxCount: 1 }, { name: 'taxCard', maxCount: 1 }]),
//parseObject([ 'workPeriods', 'workDays' , 'location', 'username', 'socialLinks', 'phones', 'slider', 'searchKeys', 'subCategories', 'storeEmployees', 'region']),
//        requireAuth, userController.validateDriverAddTrader(), userController.addTrader)
// router.route('/addMarket')
//     .post(multerSaveTo('users').single('image'),
//         parseObject(['categories','location', 'username', 'socialLinks', 'phones', 'slider', 'searchKeys', 'subCategories', 'storeEmployees', 'region']),
//         requireAuth, userController.validateDriverAddMarket(), userController.addMarket)
// router.route('/increaseViews').post(userController.validateIncreaseViews(), userController.increaseViews)
// router.route('/traderStatistics').get(requireAuth, userController.traderGetStatistics)
// router.route('/user/openActiveChatHead').put(requireAuth, userController.openActiveChatHead)
// router.route('/user/closeActiveChatHead').put(requireAuth, userController.closeActiveChatHead)
//router.route('/visitor/signup').post(userController.validateVisitorSignUp(), userController.visitorSignUp)


router.route('/signup') //.post(multerSaveTo('users').fields(images), parseObject(['subCategories'])  , userController.validateUserCreateBody(), userController.userSignUp);
.post(_user["default"].validateUserCreateBody(), _user["default"].userSignUp);
router.put('/updateToken', _user["default"].validateUpdateToken(), _user["default"].updateToken);
router.post('/user/addUser', _user["default"].validateAddUser(), _user["default"].addUser);
router.post('/signin', _user["default"].validateUserSignin(), _user["default"].signIn);
router.post('/verify-signin', _user["default"].validateVerifySign(), _user["default"].verifySignIn);
router.route('/verify-phone').put(_user["default"].validateVerifyPhone(), _user["default"].verifyPhone);
router.route('/resend-code').post(_user["default"].validateResendCode(), _user["default"].resendCode);
router.route('/user/group').get(_auth["default"], _user["default"].getUserGroup).post(_auth["default"], _user["default"].validateUserGroup(), _user["default"].userGroup)["delete"](_auth["default"], _user["default"].delUserGroup);
router.route('/user/all').get(_auth["default"], _user["default"].getUsers);
router.post('/user/upload', _auth["default"], _user["default"].upload);
router.get('/getfile', _user["default"].getFile);
var _default = router;
exports["default"] = _default;