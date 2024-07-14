import { Router } from "express";
import { signIn, signUp } from "./auth.controller.js";
import { signinVal, signupVal } from "./auth.validation.js";
import { validate } from "../../middleware/validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";


export const authRouter = Router();

authRouter.post('/sign-up',validate(signupVal),asyncHandler(signUp))

authRouter.post('/sign-in',validate(signinVal),asyncHandler(signIn))