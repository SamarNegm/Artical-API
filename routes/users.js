import express from 'express';
import { signup, signin, suspend, notSuspend } from './../controllers/users.js'
const router = express.Router();

router.get('/signup', signup);
router.get('/signin', signin);
router.get('/suspend', suspend);
router.get('/notSuspend', notSuspend);


export default router;
