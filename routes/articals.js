import express from 'express';

import { getArtical, createArtical, articalComments, getOneArtical, deleteArtical, likeArtical, updateArtical, getAllArticals } from '../controllers/artical.js';
import authenticated from '../middelware/auth.js'
const router = express.Router();

router.get('/', getArtical);
router.get('/all', getAllArticals);
router.get('/:id', getOneArtical);


router.post('/', createArtical);
router.delete('/:id', deleteArtical)
router.patch('/:id/likeArtical', likeArtical)
router.patch('/:id', updateArtical)
router.get('/:id/comments', articalComments)
export default router;