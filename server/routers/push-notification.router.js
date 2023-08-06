import express from "express";
import pushNotificationController from "../controllers/push-notification.controller.js";
const router = express.Router();
router.post("/send-message", pushNotificationController.sendMessage);
export default router;
