import express from "express";
import profileController from '../controllers/profile-controller.js';

const router = express.Router();

router.route('/user').get(profileController.user);
router.route('/authorProfile/:email').get(profileController.authorProfile);

export default router;