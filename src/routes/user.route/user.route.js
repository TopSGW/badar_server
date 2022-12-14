import express from 'express';
import userController from '../../controllers/user.controller/user.controller';
import requireAuth from '../../middlewares/auth';

const router = express.Router();

router.post('/emailverify', userController.EmailVerification);
router.post('/phoneverify', userController.PhoneVerification);
router.post('/register', userController.registerUser);

router.route('/getProfile')
  .post(userController.getProfile)

router.route('/profile')
  .post(userController.saveProfile);

router.post('/saveAddress', userController.saveAddress);

router.route('/signup')
  .post( userController.validateUserCreateBody(), userController.userSignUp);

router.put( '/updateToken', userController.validateUpdateToken(), userController.updateToken);

router.post('/user/addUser', userController.validateAddUser(), userController.addUser);

router.post('/signin', userController.validateUserSignin(), userController.signIn);
router.post('/verify-signin', userController.validateVerifySign(), userController.verifySignIn);
router.route('/verify-phone').put(userController.validateVerifyPhone(), userController.verifyPhone)
router.route('/resend-code').post(userController.validateResendCode(), userController.resendCode)
router.route('/user/group')
  .get(requireAuth, userController.getUserGroup)
  .post(requireAuth, userController.validateUserGroup(), userController.userGroup)
  .delete(requireAuth, userController.delUserGroup);
router.route('/user/all').get(requireAuth, userController.getUsers);
router.post('/user/upload', requireAuth, userController.upload);
router.get('/getfile', userController.getFile);

export default router;
