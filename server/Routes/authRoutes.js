//const express = require('express');
//const authController = require('../Controllers/authController');
import {Router} from "express"
import { login, signup } from "../Controllers/authController.js";

const router = Router();

router.post('/signup', signup);
router.post('/login', login);

//module.exports = router;
export default router;