// * src/app/modules/auth/auth.route.ts

import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { AuthControllers } from './auth.controller';
import { AuthValidations } from './auth.validation';

const router = express.Router();

// * ---------------- * //
// ! Auth Validation
// * ----------------* //

router.post(
  '/login', // eikhane auth guard use kora jabena
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUser,
);

// * ------------------ * //
// ! Change Password
// * ------------------ * //

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(AuthValidations.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

// * ---------------- * //
// ! Refresh Token
// * ----------------* //

router.post(
  '/refresh-token', // eikhane auth guard use kora jabena
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

export const AuthRoutes = router;