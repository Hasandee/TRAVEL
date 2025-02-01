import {Router} from "express";
import { predict } from "../Controllers/mlControllers.js";

const router = Router();

router.post('/predict', predict);

//module.exports = router;
export default router;