import { Router } from 'express';
import { getGSTData, getGSTFiling } from '../controllers/gstController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/gst-data/:gst', protect, getGSTData);
router.get('/gst-filing/:gst', protect, getGSTFiling);

export default router;
