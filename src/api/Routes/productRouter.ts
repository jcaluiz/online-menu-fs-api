import { Router } from 'express';
import statusCodes from '../statusCodes';

const router = Router();

router.get('/', (_req, res) => res.status(statusCodes.ok).json({ ok: true }));

export default router;
